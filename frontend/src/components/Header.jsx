import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3"
            data-testid="header-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7F5AF0] to-[#00F0FF] flex items-center justify-center">
              <span className="text-white font-bold text-xl font-['Outfit']">L</span>
            </div>
            <span className="text-2xl font-bold text-white lumis-logo">Lumis</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[#94A3B8] hover:text-white font-medium text-sm uppercase tracking-wider"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <Button 
                data-testid="header-cta-btn"
                className="bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full px-6 py-2 font-medium btn-glow"
              >
                Book Consultation
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mobile-menu" data-testid="mobile-menu">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl text-white font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              <Button 
                className="bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full px-8 py-4 font-medium w-full mt-4"
              >
                Book Consultation
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
