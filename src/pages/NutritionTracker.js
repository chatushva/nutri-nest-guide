import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function NutritionTracker() {
  const { toast } = useToast();
  const [foodInput, setFoodInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [trackedFoods, setTrackedFoods] = useState([]);

  // Simple food database with calories per 100g
  const foodDatabase = {
    'rice': { calories: 130, unit: '100g' },
    'dal': { calories: 116, unit: '100g' },
    'chicken': { calories: 239, unit: '100g' },
    'fish': { calories: 206, unit: '100g' },
    'roti': { calories: 297, unit: '100g' },
    'idli': { calories: 58, unit: 'piece' },
    'dosa': { calories: 168, unit: 'piece' },
    'sambar': { calories: 85, unit: '100g' },
    'coconut chutney': { calories: 181, unit: '100g' },
    'banana': { calories: 89, unit: 'piece' },
    'apple': { calories: 52, unit: 'piece' },
    'milk': { calories: 42, unit: '100ml' },
    'yogurt': { calories: 59, unit: '100g' },
    'groundnuts': { calories: 567, unit: '100g' }
  };

  const addFood = () => {
    if (!foodInput.trim() || !quantityInput.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both food name and quantity.",
        variant: "destructive"
      });
      return;
    }

    const foodName = foodInput.toLowerCase().trim();
    const quantity = parseFloat(quantityInput);

    if (!quantity || quantity <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity.",
        variant: "destructive"
      });
      return;
    }

    // Check if food exists in database
    const foodData = foodDatabase[foodName];
    if (!foodData) {
      toast({
        title: "Food Not Found",
        description: `Sorry, "${foodInput}" is not in our database. Try: rice, dal, chicken, fish, etc.`,
        variant: "destructive"
      });
      return;
    }

    // Calculate calories based on quantity
    let calories;
    if (foodData.unit === 'piece') {
      calories = foodData.calories * quantity;
    } else {
      calories = (foodData.calories * quantity) / 100;
    }

    const newFood = {
      id: Date.now(),
      name: foodInput,
      quantity: quantity,
      unit: foodData.unit,
      calories: Math.round(calories)
    };

    setTrackedFoods([...trackedFoods, newFood]);
    setFoodInput('');
    setQuantityInput('');
    
    toast({
      title: "Food Added! 🍽️",
      description: `${newFood.name} (${calories.toFixed(0)} calories) added to your tracker.`,
    });
  };

  const removeFood = (id) => {
    setTrackedFoods(trackedFoods.filter(food => food.id !== id));
  };

  const getTotalCalories = () => {
    return trackedFoods.reduce((total, food) => total + food.calories, 0);
  };

  const getCalorieStatus = () => {
    const total = getTotalCalories();
    const target = 2000; // Daily calorie target
    
    if (total < target * 0.8) return { status: 'low', color: 'text-blue-500' };
    if (total > target * 1.2) return { status: 'high', color: 'text-red-500' };
    return { status: 'good', color: 'text-nutrition-green' };
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

        <div className="max-w-4xl mx-auto">
          {/* Add Food Form */}
          <Card className="mb-8 bg-gradient-to-br from-card to-nutrition-green-light/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-nutrition-green" />
                Add Food Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="food">Food Name</Label>
                  <Input
                    id="food"
                    type="text"
                    placeholder="e.g., rice, dal, chicken"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 100 (grams/pieces)"
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button variant="nutrition" onClick={addFood} className="w-full">
                    Add Food
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong>Available foods:</strong> rice, dal, chicken, fish, roti, idli, dosa, sambar, coconut chutney, banana, apple, milk, yogurt, groundnuts
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Daily Summary */}
            <Card className="bg-gradient-to-r from-nutrition-green-light to-nutrition-orange-light border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center">
                  <Target className="h-5 w-5 text-nutrition-green" />
                  Daily Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <p className={`text-3xl font-bold ${getCalorieStatus().color}`}>
                    {getTotalCalories()} 
                  </p>
                  <p className="text-sm text-muted-foreground">calories consumed</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <Badge variant="outline" className="w-full">Target: 2000</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="w-full">Remaining: {Math.max(0, 2000 - getTotalCalories())}</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="w-full">Foods: {trackedFoods.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Food List */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Food Log</CardTitle>
              </CardHeader>
              <CardContent>
                {trackedFoods.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No foods tracked yet. Add some foods to get started!
                  </p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {trackedFoods.map((food) => (
                      <div key={food.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <p className="font-medium capitalize">{food.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {food.quantity} {food.unit} • {food.calories} cal
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFood(food.id)}
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
    </div>
  );
}

export default NutritionTracker;