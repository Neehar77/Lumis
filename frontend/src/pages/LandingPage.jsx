import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LandingPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsRes, caseStudiesRes, blogRes, servicesRes, timesRes] = await Promise.all([
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/case-studies`),
          axios.get(`${API}/blog-posts`),
          axios.get(`${API}/services`),
          axios.get(`${API}/available-times`)
        ]);
        
        setTestimonials(testimonialsRes.data);
        setCaseStudies(caseStudiesRes.data);
        setBlogPosts(blogRes.data);
        setServices(servicesRes.data);
        setAvailableTimes(timesRes.data.times);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] noise-overlay relative">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection services={services} loading={loading} />
        <AboutSection />
        <TestimonialsSection testimonials={testimonials} />
        <CaseStudiesSection caseStudies={caseStudies} />
        <BlogSection blogPosts={blogPosts} />
        <ContactSection services={services} availableTimes={availableTimes} />
      </main>
      <Footer />
    </div>
  );
}
