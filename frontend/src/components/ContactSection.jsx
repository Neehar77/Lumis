import { useState } from "react";
import axios from "axios";
import { Calendar as CalendarIcon, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { format } from "date-fns";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ContactSection = ({ services, availableTimes }) => {
  const [formType, setFormType] = useState("appointment"); // "appointment" or "contact"
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const defaultServices = [
    { id: "svc1", name: "AI Agent Building" },
    { id: "svc2", name: "Automation Software" },
    { id: "svc3", name: "Web Development" },
    { id: "svc4", name: "DevOps & Cloud" },
    { id: "svc5", name: "Database Solutions" }
  ];

  const defaultTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const displayTimes = availableTimes.length > 0 ? availableTimes : defaultTimes;

  const reasonOptions = [
    "New Project Inquiry",
    "Technical Consultation",
    "Partnership Opportunity",
    "General Question",
    "Other"
  ];

  const handleServiceToggle = (serviceName) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate(null);
    setTime("");
    setSelectedServices([]);
    setReason("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill in required fields", {
        description: "Name, email, and message are required."
      });
      return;
    }

    if (formType === "appointment" && (!date || !time)) {
      toast.error("Please select date and time", {
        description: "Date and time are required for appointments."
      });
      return;
    }

    setLoading(true);

    try {
      const endpoint = formType === "appointment" ? "/appointments" : "/contact";
      const payload = formType === "appointment" 
        ? {
            name,
            email,
            phone: phone || null,
            date: format(date, "yyyy-MM-dd"),
            time,
            services: selectedServices,
            reason: reason || null,
            message: message || null
          }
        : {
            name,
            email,
            phone: phone || null,
            services: selectedServices,
            reason: reason || null,
            message
          };

      await axios.post(`${API}${endpoint}`, payload);
      
      setSubmitted(true);
      toast.success(
        formType === "appointment" 
          ? "Appointment requested successfully!" 
          : "Message sent successfully!",
        {
          description: "We'll get back to you within 24 hours."
        }
      );
      
      resetForm();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative" data-testid="contact-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <span className="text-[#7F5AF0] font-medium text-sm uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Build <span className="text-accent-gradient">Together</span>
            </h2>
            <p className="text-[#94A3B8] text-lg mb-8">
              Ready to transform your business with cutting-edge technology? 
              Book a free consultation or send us a message. We typically respond 
              within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="icon-container flex-shrink-0">
                  <CalendarIcon className="w-5 h-5 text-[#7F5AF0]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Book an Appointment</h4>
                  <p className="text-[#94A3B8] text-sm">
                    Schedule a free 30-minute consultation to discuss your project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="icon-container flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#7F5AF0]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Quick Response</h4>
                  <p className="text-[#94A3B8] text-sm">
                    We respond to all inquiries within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Type Toggle */}
            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setFormType("appointment")}
                data-testid="toggle-appointment-form"
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  formType === "appointment"
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-[#0F0F11] text-[#94A3B8] border border-[rgba(255,255,255,0.1)] hover:border-[#7F5AF0]"
                }`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => setFormType("contact")}
                data-testid="toggle-contact-form"
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  formType === "contact"
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-[#0F0F11] text-[#94A3B8] border border-[rgba(255,255,255,0.1)] hover:border-[#7F5AF0]"
                }`}
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="animate-fade-in-up stagger-2">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2CB67D]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#2CB67D]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-[#94A3B8]">
                    {formType === "appointment" 
                      ? "Your appointment request has been received. We'll confirm shortly."
                      : "Your message has been sent. We'll get back to you soon."
                    }
                  </p>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="contact-form bg-[#0F0F11] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8"
                data-testid="contact-form"
              >
                <div className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Name <span className="text-[#EF4565]">*</span>
                      </Label>
                      <Input
                        id="name"
                        data-testid="contact-name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#94A3B8] rounded-xl focus:border-[#7F5AF0]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email <span className="text-[#EF4565]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        data-testid="contact-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#94A3B8] rounded-xl focus:border-[#7F5AF0]"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      data-testid="contact-phone-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#94A3B8] rounded-xl focus:border-[#7F5AF0]"
                    />
                  </div>

                  {/* Date & Time - Only for appointment */}
                  {formType === "appointment" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white mb-2 block">
                          Preferred Date <span className="text-[#EF4565]">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-testid="contact-date-picker"
                              className="w-full justify-start text-left font-normal bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white hover:bg-[#1A1A1D] hover:border-[#7F5AF0] rounded-xl"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-[#94A3B8]" />
                              {date ? format(date, "PPP") : <span className="text-[#94A3B8]">Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#0F0F11] border-[rgba(255,255,255,0.1)]" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                              initialFocus
                              className="bg-[#0F0F11]"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">
                          Preferred Time <span className="text-[#EF4565]">*</span>
                        </Label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger 
                            data-testid="contact-time-select"
                            className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white rounded-xl focus:border-[#7F5AF0]"
                          >
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)]">
                            {displayTimes.map((t) => (
                              <SelectItem 
                                key={t} 
                                value={t}
                                className="text-white hover:bg-[#1A1A1D] focus:bg-[#1A1A1D]"
                              >
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Services Interested In */}
                  <div>
                    <Label className="text-white mb-3 block">
                      Services Interested In
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {displayServices.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={service.id}
                            data-testid={`service-checkbox-${service.id}`}
                            checked={selectedServices.includes(service.name)}
                            onCheckedChange={() => handleServiceToggle(service.name)}
                            className="border-[rgba(255,255,255,0.3)] data-[state=checked]:bg-[#7F5AF0] data-[state=checked]:border-[#7F5AF0]"
                          />
                          <label
                            htmlFor={service.id}
                            className="text-sm text-[#94A3B8] cursor-pointer hover:text-white"
                          >
                            {service.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Reason for Connecting (Optional)
                    </Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger 
                        data-testid="contact-reason-select"
                        className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white rounded-xl focus:border-[#7F5AF0]"
                      >
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)]">
                        {reasonOptions.map((r) => (
                          <SelectItem 
                            key={r} 
                            value={r}
                            className="text-white hover:bg-[#1A1A1D] focus:bg-[#1A1A1D]"
                          >
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Message <span className="text-[#EF4565]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      data-testid="contact-message-input"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project or question..."
                      rows={4}
                      className="bg-[#0F0F11] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#94A3B8] rounded-xl focus:border-[#7F5AF0] resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={loading}
                    className="w-full bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full py-6 text-lg font-medium btn-glow disabled:opacity-50"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        {formType === "appointment" ? "Request Appointment" : "Send Message"}
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
