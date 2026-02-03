import requests
import sys
import json
from datetime import datetime, timedelta

class LumisAPITester:
    def __init__(self, base_url="https://smart-it-services-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_response=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            # Additional response validation if provided
            if success and validate_response:
                try:
                    response_data = response.json()
                    validation_result = validate_response(response_data)
                    if not validation_result:
                        success = False
                        print(f"❌ Failed - Response validation failed")
                except Exception as e:
                    success = False
                    print(f"❌ Failed - Response validation error: {str(e)}")
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if method == 'GET':
                    try:
                        data = response.json()
                        if isinstance(data, list):
                            print(f"   Response: List with {len(data)} items")
                        else:
                            print(f"   Response: {type(data).__name__}")
                    except:
                        print(f"   Response: Non-JSON")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text[:200]}")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "url": url
            })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "url": url
            })
            return False, {}

    def validate_testimonials(self, data):
        """Validate testimonials response structure"""
        if not isinstance(data, list):
            return False
        if len(data) == 0:
            return False
        
        required_fields = ['id', 'name', 'company', 'role', 'content', 'rating']
        for testimonial in data[:2]:  # Check first 2 items
            for field in required_fields:
                if field not in testimonial:
                    print(f"   Missing field: {field}")
                    return False
        return True

    def validate_case_studies(self, data):
        """Validate case studies response structure"""
        if not isinstance(data, list):
            return False
        if len(data) == 0:
            return False
            
        required_fields = ['id', 'title', 'company', 'industry', 'challenge', 'solution', 'results']
        for case_study in data[:2]:  # Check first 2 items
            for field in required_fields:
                if field not in case_study:
                    print(f"   Missing field: {field}")
                    return False
        return True

    def validate_services(self, data):
        """Validate services response structure"""
        if not isinstance(data, list):
            return False
        if len(data) == 0:
            return False
            
        required_fields = ['id', 'name', 'description', 'icon']
        for service in data[:2]:  # Check first 2 items
            for field in required_fields:
                if field not in service:
                    print(f"   Missing field: {field}")
                    return False
        return True

    def validate_blog_posts(self, data):
        """Validate blog posts response structure"""
        if not isinstance(data, list):
            return False
        if len(data) == 0:
            return False
            
        required_fields = ['id', 'title', 'excerpt', 'category', 'author']
        for post in data[:2]:  # Check first 2 items
            for field in required_fields:
                if field not in post:
                    print(f"   Missing field: {field}")
                    return False
        return True

    def validate_available_times(self, data):
        """Validate available times response structure"""
        if not isinstance(data, dict):
            return False
        if 'times' not in data:
            return False
        if not isinstance(data['times'], list):
            return False
        return len(data['times']) > 0

    def test_get_endpoints(self):
        """Test all GET endpoints"""
        print("=" * 50)
        print("TESTING GET ENDPOINTS")
        print("=" * 50)
        
        # Test testimonials
        self.run_test(
            "Get Testimonials",
            "GET",
            "testimonials",
            200,
            validate_response=self.validate_testimonials
        )

        # Test case studies
        self.run_test(
            "Get Case Studies",
            "GET", 
            "case-studies",
            200,
            validate_response=self.validate_case_studies
        )

        # Test blog posts
        self.run_test(
            "Get Blog Posts",
            "GET",
            "blog-posts", 
            200,
            validate_response=self.validate_blog_posts
        )

        # Test services
        self.run_test(
            "Get Services",
            "GET",
            "services",
            200,
            validate_response=self.validate_services
        )

        # Test available times
        self.run_test(
            "Get Available Times",
            "GET",
            "available-times",
            200,
            validate_response=self.validate_available_times
        )

    def test_post_endpoints(self):
        """Test POST endpoints"""
        print("\n" + "=" * 50)
        print("TESTING POST ENDPOINTS")
        print("=" * 50)

        # Test contact submission
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "services": ["AI Agent Building", "Web Development"],
            "reason": "New Project Inquiry",
            "message": "This is a test message for contact form submission."
        }
        
        success, response = self.run_test(
            "Submit Contact Form",
            "POST",
            "contact",
            200,
            data=contact_data
        )

        # Test appointment booking
        tomorrow = datetime.now() + timedelta(days=1)
        appointment_data = {
            "name": "Test Appointment User",
            "email": "appointment@example.com", 
            "phone": "+1234567890",
            "date": tomorrow.strftime("%Y-%m-%d"),
            "time": "10:00 AM",
            "services": ["DevOps & Cloud", "Database Solutions"],
            "reason": "Technical Consultation",
            "message": "This is a test appointment booking."
        }
        
        self.run_test(
            "Book Appointment",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )

    def test_individual_case_study(self):
        """Test individual case study endpoint"""
        print("\n" + "=" * 50)
        print("TESTING INDIVIDUAL CASE STUDY")
        print("=" * 50)
        
        # First get all case studies to get a valid ID
        success, case_studies = self.run_test(
            "Get Case Studies for ID",
            "GET",
            "case-studies",
            200
        )
        
        if success and case_studies and len(case_studies) > 0:
            case_study_id = case_studies[0]['id']
            self.run_test(
                f"Get Case Study {case_study_id}",
                "GET",
                f"case-studies/{case_study_id}",
                200
            )
        else:
            print("❌ Cannot test individual case study - no case studies available")

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.tests_passed < self.tests_run:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['name']} ({result['method']} {result['endpoint']})")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting Lumis API Testing...")
    print(f"Testing against: https://smart-it-services-1.preview.emergentagent.com/api")
    
    tester = LumisAPITester()
    
    # Run all tests
    tester.test_get_endpoints()
    tester.test_post_endpoints() 
    tester.test_individual_case_study()
    
    # Print summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())