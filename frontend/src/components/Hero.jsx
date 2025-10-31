import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full border border-border">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm text-foreground">
                New: Advanced Analytics Dashboard
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                Manage Your Account with Confidence
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Secure, intuitive account management platform designed for
                modern teams. Control access, monitor activity, and protect your
                data with enterprise-grade security.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent bg-transparent"
              >
                Watch Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 sm:h-full min-h-96 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 to-primary/5">
            {/* Image */}
            <img
              src="https://wallpapercave.com/wp/wp12975891.jpg"
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
