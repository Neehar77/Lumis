import { Brain, Bot, Globe, Server, Database } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap = {
  brain: Brain,
  bot: Bot,
  globe: Globe,
  server: Server,
  database: Database
};

export const ServicesSection = ({ services, loading }) => {
  const defaultServices = [
    {
      id: "svc1",
      name: "AI Agent Building",
      description: "Custom AI agents that automate workflows, handle customer interactions, and drive intelligent decision-making.",
      icon: "brain"
    },
    {
      id: "svc2",
      name: "Automation Software",
      description: "End-to-end automation solutions that eliminate repetitive tasks and streamline your business processes.",
      icon: "bot"
    },
    {
      id: "svc3",
      name: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      icon: "globe"
    },
    {
      id: "svc4",
      name: "DevOps & Cloud",
      description: "Infrastructure automation, CI/CD pipelines, and cloud migration for scalable, reliable systems.",
      icon: "server"
    },
    {
      id: "svc5",
      name: "Database Solutions",
      description: "Database design, optimization, migration, and maintenance for peak performance.",
      icon: "database"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 md:py-32 relative" data-testid="services-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 animate-fade-in-up">
          <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider mb-4 block">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Services That Drive <span className="text-accent-gradient">Results</span>
          </h2>
          <p className="text-[#94A3B8] text-lg">
            From AI-powered automation to rock-solid infrastructure, we provide end-to-end IT solutions 
            that help you focus on what matters most - growing your business.
          </p>
        </div>

        {/* Bento Grid */}
        {loading ? (
          <div className="bento-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="service-card">
                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bento-grid">
            {displayServices.slice(0, 4).map((service, index) => {
              const IconComponent = iconMap[service.icon] || Brain;
              return (
                <div 
                  key={service.id} 
                  className={`service-card card-glow animate-fade-in-up stagger-${index + 1}`}
                  data-testid={`service-card-${service.id}`}
                >
                  <div className="icon-container mb-6">
                    <IconComponent className="w-6 h-6 text-[#7F5AF0]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {service.name}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed">
                    {service.description}
                  </p>
                  {index === 0 && (
                    <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#7F5AF0]">70%</div>
                          <div className="text-xs text-[#94A3B8]">Cost Reduction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#00F0FF]">24/7</div>
                          <div className="text-xs text-[#94A3B8]">Availability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#2CB67D]">5min</div>
                          <div className="text-xs text-[#94A3B8]">Response Time</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Additional service if exists */}
        {displayServices.length > 4 && (
          <div className="mt-6 service-card card-glow animate-fade-in-up stagger-5" data-testid="service-card-extra">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="icon-container flex-shrink-0">
                <Database className="w-6 h-6 text-[#7F5AF0]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {displayServices[4].name}
                </h3>
                <p className="text-[#94A3B8]">
                  {displayServices[4].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section line */}
      <div className="section-line mt-24 md:mt-32"></div>
    </section>
  );
};
