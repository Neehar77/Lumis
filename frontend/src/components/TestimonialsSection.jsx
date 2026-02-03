import { Star, Quote } from "lucide-react";

export const TestimonialsSection = ({ testimonials }) => {
  const defaultTestimonials = [
    {
      id: "1",
      name: "Sarah Chen",
      company: "TechFlow Inc.",
      role: "CTO",
      content: "Lumis transformed our operations with their AI automation solutions. We reduced manual tasks by 70% and saw ROI within 3 months.",
      rating: 5
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      company: "ScaleUp Ventures",
      role: "CEO",
      content: "Their DevOps expertise helped us achieve 99.9% uptime. The team is incredibly responsive and technically brilliant.",
      rating: 5
    },
    {
      id: "3",
      name: "Emily Watson",
      company: "DataDrive Analytics",
      role: "VP Engineering",
      content: "The AI agents Lumis built for us handle customer inquiries 24/7. Support costs down 50%, customer satisfaction up 40%.",
      rating: 5
    },
    {
      id: "4",
      name: "James Park",
      company: "CloudFirst Solutions",
      role: "Director of IT",
      content: "Database optimization and cloud migration was seamless. Lumis delivered on time and under budget. Highly recommend!",
      rating: 5
    },
    {
      id: "5",
      name: "Lisa Thompson",
      company: "RetailPro",
      role: "COO",
      content: "From website redesign to backend automation, Lumis handled everything professionally. Our e-commerce conversion rate doubled.",
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  // Double the array for seamless infinite scroll
  const duplicatedTestimonials = [...displayTestimonials, ...displayTestimonials];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden" data-testid="testimonials-section">
      <div className="container-custom mb-12">
        {/* Section Header */}
        <div className="max-w-2xl animate-fade-in-up">
          <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider mb-4 block">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-accent-gradient">Industry Leaders</span>
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Don't just take our word for it. Here's what our clients have to say about 
            working with Lumis.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
        
        {/* Scrolling testimonials */}
        <div className="flex animate-marquee">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`}
              className="testimonial-card mx-3 flex-shrink-0 w-[350px]"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#7F5AF0] opacity-50 mb-4" />
              
              {/* Content */}
              <p className="text-white text-base leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#7F5AF0] text-[#7F5AF0]" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7F5AF0]/30 to-[#00F0FF]/20 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-[#94A3B8] text-xs">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section line */}
      <div className="section-line mt-24 md:mt-32"></div>
    </section>
  );
};
