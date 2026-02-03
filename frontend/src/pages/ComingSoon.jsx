import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#7F5AF0]/20 to-[#00F0FF]/10 flex items-center justify-center">
          <Clock className="w-10 h-10 text-[#7F5AF0]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Outfit']">
          Coming Soon
        </h1>
        
        <p className="text-[#94A3B8] text-lg mb-8">
          We're working on something exciting. Our blog will feature insights on AI, automation, 
          DevOps best practices, and the latest in technology.
        </p>
        
        <Link to="/">
          <Button 
            data-testid="back-home-btn"
            className="bg-[#7F5AF0] hover:bg-[#6B4AD1] text-white rounded-full px-8 py-6 text-lg font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
