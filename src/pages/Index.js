import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb, Calendar, Target, BookOpen, Bell } from 'lucide-react';
import heroImage from '@/assets/hero-nutrition.jpg';
import { useToast } from '@/hooks/use-toast';

function Index() {
  const { toast } = useToast();

  // Show welcome message after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "💧 Hydration Reminder",
        description: "Have you had enough water today? Stay hydrated for better health!",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-nutrition-green" />,
      title: "Smart Tips",
      description: "Get personalized nutrition advice and healthy eating tips",
      link: "/tips",
    },
    {
      icon: <Calendar className="h-8 w-8 text-nutrition-orange" />,
      title: "Meal Planner",
      description: "Plan your daily meals with our curated healthy options",
      link: "/planner",
    },
    {
      icon: <Target className="h-8 w-8 text-nutrition-green" />,
      title: "Nutrition Tracker",
      description: "Track your food intake and monitor your daily calories",
      link: "/tracker",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-nutrition-orange" />,
      title: "Healthy Recipes",
      description: "Discover delicious and nutritious Andhra Pradesh recipes",
      link: "/recipes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nutrition-green-light to-nutrition-orange-light">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Healthy lifestyle" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/80 text-nutrition-green">
              <Bell className="h-4 w-4 mr-2" />
              Your Health Journey Starts Here
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
              Eat Smart Live Strong
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to <span className="font-semibold text-nutrition-green">NutriNest</span> - your comprehensive guide to healthy eating, 
              meal planning, and nutrition tracking. Transform your lifestyle with smart food choices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="nutrition" size="lg" className="text-lg px-8 py-6">
                <Link to="/tips">
                  Get Smart Tips
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="nutritionOutline" size="lg" className="text-lg px-8 py-6">
                <Link to="/planner">
                  Plan Your Meals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need for Healthy Living</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to help you make informed nutrition choices and build lasting healthy habits
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-[var(--shadow-hover)] transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-card to-nutrition-green-light/5 border-0"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-nutrition-green-light to-nutrition-orange-light w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button asChild variant="nutritionOutline" className="w-full">
                    <Link to={feature.link}>
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-nutrition-green to-nutrition-orange">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of others who have already started their journey to better nutrition and healthier living.
            </p>
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white text-nutrition-green hover:bg-white/90">
              <Link to="/planner">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;