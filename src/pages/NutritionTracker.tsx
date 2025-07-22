import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  time: string;
}

const NutritionTracker = () => {
  const { toast } = useToast();
  const [foodName, setFoodName] = useState('');
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [dailyGoal] = useState(2000); // Mock daily calorie goal

  // Mock calorie database
  const calorieDatabase: { [key: string]: number } = {
    apple: 52,
    banana: 89,
    orange: 47,
    chicken: 165,
    salmon: 208,
    rice: 130,
    bread: 75,
    egg: 70,
    yogurt: 100,
    salad: 20,
    pasta: 220,
    cheese: 113,
    milk: 60,
    cookie: 150,
    pizza: 285,
    burger: 540,
    fries: 320,
    smoothie: 180,
    nuts: 28,
    avocado: 160
  };

  const getCaloriesForFood = (food: string): number => {
    const lowerFood = food.toLowerCase();
    // Check if exact match exists
    if (calorieDatabase[lowerFood]) {
      return calorieDatabase[lowerFood];
    }
    
    // Check for partial matches
    for (const [key, calories] of Object.entries(calorieDatabase)) {
      if (lowerFood.includes(key) || key.includes(lowerFood)) {
        return calories;
      }
    }
    
    // Return a default estimate if no match found
    return 100;
  };

  const addFoodEntry = () => {
    if (!foodName.trim()) {
      toast({
        title: "Please enter a food name",
        variant: "destructive"
      });
      return;
    }

    const calories = getCaloriesForFood(foodName);
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: foodName,
      calories,
      time: new Date().toLocaleTimeString()
    };

    setFoodEntries(prev => [...prev, newEntry]);
    setFoodName('');
    
    toast({
      title: "Food added! 🍎",
      description: `${foodName} (${calories} calories) added to your tracker.`
    });
  };

  const removeFoodEntry = (id: string) => {
    setFoodEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getTotalCalories = () => {
    return foodEntries.reduce((total, entry) => total + entry.calories, 0);
  };

  const getCalorieProgress = () => {
    return Math.min((getTotalCalories() / dailyGoal) * 100, 100);
  };

  const getRemainingCalories = () => {
    return Math.max(dailyGoal - getTotalCalories(), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
            Nutrition Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your daily food intake and monitor your calorie consumption
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Add Food Section */}
          <Card className="bg-gradient-to-br from-card to-nutrition-green-light/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-nutrition-green" />
                Add Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input
                    id="food-name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g., apple, chicken, salad..."
                    onKeyPress={(e) => e.key === 'Enter' && addFoodEntry()}
                  />
                </div>
                <Button variant="nutrition" onClick={addFoodEntry} className="w-full">
                  Add to Tracker
                </Button>
              </div>

              {/* Quick Add Suggestions */}
              <div className="mt-6">
                <Label>Quick Add:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Apple', 'Banana', 'Chicken', 'Salad', 'Yogurt'].map((food) => (
                    <Button
                      key={food}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFoodName(food);
                        setTimeout(addFoodEntry, 100);
                      }}
                      className="text-xs"
                    >
                      {food}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Progress */}
          <Card className="bg-gradient-to-br from-card to-nutrition-orange-light/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-nutrition-orange" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-nutrition-green">
                    {getTotalCalories()}
                  </p>
                  <p className="text-sm text-muted-foreground">of {dailyGoal} calories</p>
                </div>

                <Progress value={getCalorieProgress()} className="h-3" />

                <div className="flex justify-between text-sm">
                  <span>Consumed: {getTotalCalories()}</span>
                  <span>Remaining: {getRemainingCalories()}</span>
                </div>

                {getCalorieProgress() > 100 && (
                  <p className="text-sm text-destructive text-center">
                    ⚠️ You've exceeded your daily goal by {getTotalCalories() - dailyGoal} calories
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Food Log */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Food Log</CardTitle>
            </CardHeader>
            <CardContent>
              {foodEntries.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No foods logged yet. Start tracking your meals above!
                </p>
              ) : (
                <div className="space-y-2">
                  {foodEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium capitalize">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.calories} calories • {entry.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFoodEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;