import { Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { label: "AI Agent Building", href: "#services" },
    { label: "Automation Software", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "DevOps & Cloud", href: "#services" },
    { label: "Database Solutions", href: "#services" }
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="pt-24 pb-8 bg-[#050505] border-t border-[rgba(255,255,255,0.05)]" data-testid="footer">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7F5AF0] to-[#00F0FF] flex items-center justify-center">
                <span className="text-white font-bold text-xl font-['Outfit']">L</span>
              </div>
              <span className="text-2xl font-bold text-white lumis-logo">Lumis</span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              Illuminating the Future of IT. We help businesses leverage cutting-edge 
              technology to achieve transformative results.
            </p>
            
            <div className="space-y-3">
              <a 
                href="mailto:hello@lumis.io" 
                className="flex items-center gap-3 text-[#94A3B8] hover:text-white text-sm"
                data-testid="footer-email"
              >
                <Mail className="w-4 h-4 text-[#7F5AF0]" />
                hello@lumis.io
              </a>
              <div className="flex items-center gap-3 text-[#94A3B8] text-sm">
                <MapPin className="w-4 h-4 text-[#7F5AF0]" />
                United States
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-[#94A3B8] text-sm hover:text-[#7F5AF0]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-[#94A3B8] text-sm hover:text-[#7F5AF0]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
            <p className="text-[#94A3B8] text-sm mb-6">
              Follow us on social media for the latest updates and insights.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                data-testid="social-linkedin"
                className="w-10 h-10 rounded-xl bg-[#0F0F11] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:text-[#7F5AF0] hover:border-[#7F5AF0]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                data-testid="social-twitter"
                className="w-10 h-10 rounded-xl bg-[#0F0F11] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:text-[#7F5AF0] hover:border-[#7F5AF0]"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                data-testid="social-github"
                className="w-10 h-10 rounded-xl bg-[#0F0F11] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3B8] hover:text-[#7F5AF0] hover:border-[#7F5AF0]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#94A3B8] text-sm">
              © {currentYear} Lumis Consulting. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-[#94A3B8] text-sm hover:text-white">Privacy Policy</a>
              <a href="#" className="text-[#94A3B8] text-sm hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
