import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCaseStudies = (e) => {
    e.preventDefault();
    document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 hero-glow overflow-hidden" data-testid="hero-section">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0F0F11]">
              <span className="w-2 h-2 rounded-full bg-[#2CB67D] animate-pulse"></span>
              <span className="text-sm text-[#94A3B8] font-medium">Now accepting new clients</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Illuminating the</span>
              <br />
              <span className="text-accent-gradient">Future of IT</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-[#94A3B8] max-w-lg leading-relaxed">
              Transform your business with cutting-edge AI agents, intelligent automation, 
              and expert DevOps solutions. Save costs, scale faster, and stay ahead of the competition.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="stat-number">10+</div>
                <div className="text-[#94A3B8] text-sm">Years Experience</div>
              </div>
              <div>
                <div className="stat-number">50+</div>
                <div className="text-[#94A3B8] text-sm">Projects Delivered</div>
              </div>
              <div>
                <div className="stat-number">98%</div>
                <div className="text-[#94A3B8] text-sm">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={scrollToContact}
                data-testid="hero-cta-primary"
                className="bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full px-8 py-6 text-lg font-medium btn-glow animate-pulse-glow"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={scrollToCaseStudies}
                data-testid="hero-cta-secondary"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-[rgba(255,255,255,0.2)] text-white hover:bg-[#0F0F11] hover:border-[#7F5AF0]"
              >
                <Play className="w-5 h-5 mr-2" />
                View Case Studies
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hero-image-container animate-fade-in-up stagger-2">
            <div className="relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdsb3dpbmclMjBkaWdpdGFsJTIwbmV0d29yayUyMGJsdWUlMjBwdXJwbGV8ZW58MHx8fHwxNzcwMTE2ODEwfDA&ixlib=rb-4.1.0&q=85"
                alt="Abstract Digital Network - Lumis IT Consulting"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-6 max-w-xs animate-fade-in-up stagger-3">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7F5AF0]/20 to-[#00F0FF]/10 flex items-center justify-center">
                  <span className="text-[#7F5AF0] text-xl font-bold">AI</span>
                </div>
                <div>
                  <div className="text-white font-semibold">AI-Powered Solutions</div>
                  <div className="text-[#94A3B8] text-sm">Custom built for your needs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7F5AF0] rounded-full filter blur-[150px] opacity-20"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00F0FF] rounded-full filter blur-[120px] opacity-10"></div>
    </section>
  );
};
