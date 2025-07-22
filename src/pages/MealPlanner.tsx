import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MealPlanner = () => {
  const { toast } = useToast();
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snack: ''
  });

  const mealOptions = {
    breakfast: [
      'Greek Yogurt with Berries and Granola',
      'Avocado Toast with Eggs',
      'Smoothie Bowl with Mixed Fruits',
      'Oatmeal with Nuts and Banana',
      'Whole Grain Cereal with Milk'
    ],
    lunch: [
      'Grilled Chicken Salad',
      'Quinoa Buddha Bowl',
      'Turkey and Hummus Wrap',
      'Lentil Soup with Whole Grain Bread',
      'Grilled Salmon with Vegetables'
    ],
    dinner: [
      'Baked Fish with Roasted Vegetables',
      'Stir-fry Tofu with Brown Rice',
      'Grilled Chicken with Sweet Potato',
      'Vegetable Curry with Quinoa',
      'Lean Beef with Steamed Broccoli'
    ],
    snack: [
      'Mixed Nuts and Dried Fruits',
      'Apple with Peanut Butter',
      'Carrot Sticks with Hummus',
      'Greek Yogurt with Honey',
      'Whole Grain Crackers with Cheese'
    ]
  };

  const handleMealSelect = (mealType: string, value: string) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: value
    }));
  };

  const saveMealPlan = () => {
    const completedMeals = Object.values(selectedMeals).filter(meal => meal !== '').length;
    if (completedMeals === 0) {
      toast({
        title: "No meals selected",
        description: "Please select at least one meal to save your plan.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Meal Plan Saved! 🍽️",
      description: `Successfully planned ${completedMeals} meals for today.`,
    });
  };

  const getTotalCalories = () => {
    const calorieEstimates = { breakfast: 350, lunch: 450, dinner: 500, snack: 150 };
    return Object.entries(selectedMeals)
      .filter(([_, meal]) => meal !== '')
      .reduce((total, [type, _]) => total + calorieEstimates[type as keyof typeof calorieEstimates], 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
            Daily Meal Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your perfect day of healthy eating with our curated meal options
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {Object.entries(mealOptions).map(([mealType, options]) => (
              <Card key={mealType} className="bg-gradient-to-br from-card to-nutrition-green-light/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Calendar className="h-5 w-5 text-nutrition-green" />
                    {mealType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => handleMealSelect(mealType, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Choose your ${mealType}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedMeals[mealType as keyof typeof selectedMeals] && (
                    <div className="mt-2 p-2 bg-nutrition-green-light rounded-md flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-nutrition-green" />
                      <span className="text-sm text-nutrition-green font-medium">Selected!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="bg-gradient-to-r from-nutrition-green-light to-nutrition-orange-light border-0 shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-center text-xl">Today's Meal Plan Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <p className="text-2xl font-bold text-nutrition-green">
                  {getTotalCalories()} calories
                </p>
                <p className="text-sm text-muted-foreground">Estimated total for selected meals</p>
              </div>
              
              <div className="mb-6 text-left bg-white/50 rounded-lg p-4">
                {Object.entries(selectedMeals).map(([type, meal]) => (
                  meal && (
                    <div key={type} className="mb-2">
                      <span className="font-semibold capitalize text-nutrition-green">{type}: </span>
                      <span className="text-sm">{meal}</span>
                    </div>
                  )
                ))}
              </div>

              <Button variant="nutrition" onClick={saveMealPlan} className="w-full md:w-auto">
                Save Meal Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;