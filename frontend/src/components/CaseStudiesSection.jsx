import { Download, ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CaseStudiesSection = ({ caseStudies }) => {
  const defaultCaseStudies = [
    {
      id: "cs1",
      title: "AI-Powered Customer Service Automation",
      company: "FinanceHub Global",
      industry: "Financial Services",
      challenge: "Manual customer support handling 10,000+ daily inquiries with 48-hour response times.",
      solution: "Deployed intelligent AI agents with natural language processing, integrated with existing CRM systems.",
      results: [
        "Response time reduced to under 5 minutes",
        "70% of inquiries resolved without human intervention",
        "Customer satisfaction improved by 45%",
        "$2M annual savings in support costs"
      ],
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      pdf_filename: "case_study_financehub.pdf"
    },
    {
      id: "cs2",
      title: "Cloud Infrastructure Modernization",
      company: "MedTech Innovations",
      industry: "Healthcare Technology",
      challenge: "Legacy on-premise infrastructure causing reliability issues and compliance concerns.",
      solution: "Full cloud migration to AWS with HIPAA-compliant architecture and automated scaling.",
      results: [
        "99.99% uptime achieved",
        "40% reduction in infrastructure costs",
        "Full HIPAA compliance maintained",
        "Deployment time reduced from weeks to hours"
      ],
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      pdf_filename: "case_study_medtech.pdf"
    },
    {
      id: "cs3",
      title: "E-Commerce Platform Optimization",
      company: "StyleNow Retail",
      industry: "E-Commerce",
      challenge: "Slow website performance and poor mobile experience affecting sales conversion.",
      solution: "Complete frontend rebuild with React, database optimization, and CDN implementation.",
      results: [
        "Page load time reduced by 65%",
        "Mobile conversion rate increased 120%",
        "Black Friday traffic handled seamlessly",
        "SEO rankings improved significantly"
      ],
      image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      pdf_filename: "case_study_stylenow.pdf"
    }
  ];

  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

  const handleDownload = (caseStudy) => {
    toast.success(`Downloading ${caseStudy.title} case study...`, {
      description: "Your download will begin shortly."
    });
    // In production, this would trigger actual PDF download
    // For now, we simulate a download
    setTimeout(() => {
      toast.info("Sample case study downloaded!", {
        description: "This is a demo. Full case studies available upon request."
      });
    }, 1500);
  };

  return (
    <section id="case-studies" className="py-24 md:py-32 relative" data-testid="case-studies-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 animate-fade-in-up">
          <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider mb-4 block">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Impact, <span className="text-accent-gradient">Real Stories</span>
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Explore how we've helped businesses like yours achieve transformative results 
            through technology and innovation.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCaseStudies.map((caseStudy, index) => (
            <div 
              key={caseStudy.id}
              className={`case-study-card card-glow animate-fade-in-up stagger-${index + 1}`}
              data-testid={`case-study-card-${caseStudy.id}`}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={caseStudy.image_url}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#7F5AF0] text-white text-xs font-medium">
                    {caseStudy.industry}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#94A3B8] text-sm mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{caseStudy.company}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {caseStudy.title}
                </h3>
                
                <p className="text-[#94A3B8] text-sm mb-4 line-clamp-2">
                  {caseStudy.challenge}
                </p>
                
                {/* Key Results */}
                <div className="flex items-center gap-4 mb-6 py-4 border-t border-b border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-1 text-[#2CB67D]">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">{caseStudy.results[0].split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                </div>
                
                {/* Download Button */}
                <Button
                  onClick={() => handleDownload(caseStudy)}
                  data-testid={`download-case-study-${caseStudy.id}`}
                  variant="outline"
                  className="w-full rounded-xl border-[rgba(255,255,255,0.2)] text-white hover:bg-[#0F0F11] hover:border-[#7F5AF0]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-in-up">
          <p className="text-[#94A3B8] mb-4">
            Want to see how we can help your business?
          </p>
          <a href="#contact">
            <Button 
              data-testid="case-studies-cta"
              className="bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full px-8 py-6 text-lg font-medium"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>

      {/* Section line */}
      <div className="section-line mt-24 md:mt-32"></div>
    </section>
  );
};
