import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Salad, Clock, Heart, Sun, Zap } from 'lucide-react';

const Tips = () => {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const tips = [
    {
      id: 1,
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      title: "Stay Hydrated",
      short: "Drink at least 8 glasses of water daily",
      detailed: "Proper hydration boosts metabolism, aids digestion, and helps maintain energy levels. Start your day with a glass of water and keep a water bottle handy throughout the day.",
    },
    {
      id: 2,
      icon: <Salad className="h-6 w-6 text-nutrition-green" />,
      title: "Eat the Rainbow",
      short: "Include colorful fruits and vegetables in every meal",
      detailed: "Different colored fruits and vegetables provide various vitamins, minerals, and antioxidants. Aim for at least 5 servings per day to boost your immune system and overall health.",
    },
    {
      id: 3,
      icon: <Clock className="h-6 w-6 text-nutrition-orange" />,
      title: "Time Your Meals",
      short: "Eat smaller, frequent meals throughout the day",
      detailed: "Eating every 3-4 hours helps maintain stable blood sugar levels and prevents overeating. Include protein and fiber in each meal to stay satisfied longer.",
    },
    {
      id: 4,
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Choose Healthy Fats",
      short: "Incorporate omega-3 rich foods like fish, nuts, and seeds",
      detailed: "Healthy fats support brain function and heart health. Include sources like salmon, walnuts, chia seeds, and avocados in your weekly meal plan.",
    },
    {
      id: 5,
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      title: "Mindful Eating",
      short: "Eat slowly and pay attention to your hunger cues",
      detailed: "Taking time to chew thoroughly and eat without distractions helps with digestion and prevents overeating. Listen to your body's hunger and fullness signals.",
    },
    {
      id: 6,
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Limit Processed Foods",
      short: "Choose whole, unprocessed foods whenever possible",
      detailed: "Whole foods provide more nutrients and fewer additives than processed alternatives. Focus on fresh fruits, vegetables, lean proteins, and whole grains for optimal nutrition.",
    },
  ];

  const toggleExpanded = (tipId: number) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
            Smart Eating Tips
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, science-backed nutrition tips to help you eat smarter and live stronger
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {tips.map((tip) => (
            <Card 
              key={tip.id} 
              className="hover:shadow-[var(--shadow-hover)] transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-card to-nutrition-green-light/10"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {tip.icon}
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {tip.short}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {expandedTip === tip.id && (
                  <div className="mb-4 p-4 bg-muted/50 rounded-md text-sm">
                    {tip.detailed}
                  </div>
                )}
                
                <Button
                  variant="nutritionOutline"
                  size="sm"
                  onClick={() => toggleExpanded(tip.id)}
                  className="w-full"
                >
                  {expandedTip === tip.id ? 'Show Less' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;