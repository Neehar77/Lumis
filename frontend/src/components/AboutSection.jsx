import { Award, Users, Target, Lightbulb } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We leverage the latest technologies to deliver cutting-edge solutions."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Every project is measured by the tangible impact on your business."
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description: "We work alongside your team as an extension of your organization."
    },
    {
      icon: Award,
      title: "Excellence Always",
      description: "Quality is non-negotiable. We deliver work we're proud of."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative" data-testid="about-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider">
              About Lumis
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              10+ Years of <span className="text-accent-gradient">Excellence</span>
            </h2>
            <div className="space-y-6 text-[#94A3B8] text-lg leading-relaxed">
              <p>
                Founded by seasoned technologists with over a decade of experience in enterprise 
                software development, AI, and cloud infrastructure, Lumis was born from a simple 
                observation: businesses shouldn't need massive in-house engineering teams to 
                leverage cutting-edge technology.
              </p>
              <p>
                Based in the USA, we partner with companies of all sizes to deliver 
                transformative IT solutions. From startups looking to build their first AI-powered 
                product to enterprises modernizing legacy systems, we bring the expertise and 
                dedication needed to succeed.
              </p>
            </div>

            {/* Founder Highlight */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7F5AF0] to-[#5E3DB3] border-2 border-[#050505] flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#0090A0] border-2 border-[#050505] flex items-center justify-center">
                  <span className="text-white font-bold">SK</span>
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">Founded by Industry Veterans</div>
                <div className="text-[#94A3B8] text-sm">Combined 20+ years in tech leadership</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`p-6 rounded-2xl bg-[#0F0F11] border border-[rgba(255,255,255,0.1)] card-glow animate-fade-in-up stagger-${index + 1}`}
                data-testid={`value-card-${index}`}
              >
                <div className="icon-container mb-4">
                  <value.icon className="w-5 h-5 text-[#7F5AF0]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Image */}
        <div className="mt-20 relative rounded-3xl overflow-hidden animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
            alt="Lumis Team Collaboration"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="glass rounded-xl p-6 inline-block">
              <div className="text-white font-semibold text-lg mb-1">
                "We don't just build solutions, we build partnerships."
              </div>
              <div className="text-[#94A3B8] text-sm">— The Lumis Philosophy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section line */}
      <div className="section-line mt-24 md:mt-32"></div>
    </section>
  );
};
