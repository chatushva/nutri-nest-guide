import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';
import healthySalad from '@/assets/healthy-salad.jpg';
import smoothieBowl from '@/assets/smoothie-bowl.jpg';
import salmonMeal from '@/assets/salmon-meal.jpg';

const Recipes = () => {
  const recipes = [
    {
      id: 1,
      name: "Rainbow Power Salad",
      image: healthySalad,
      prepTime: "15 min",
      servings: 2,
      difficulty: "Easy",
      calories: 320,
      tags: ["Vegetarian", "High Fiber", "Low Carb"],
      ingredients: [
        "2 cups mixed greens",
        "1 cup cherry tomatoes, halved",
        "1 avocado, diced",
        "1/2 cucumber, sliced",
        "1/4 cup red onion, thinly sliced",
        "2 tbsp pumpkin seeds",
        "2 tbsp olive oil vinaigrette"
      ],
      instructions: [
        "Wash and dry all vegetables thoroughly",
        "In a large bowl, combine mixed greens, cherry tomatoes, and cucumber",
        "Add diced avocado and red onion slices",
        "Sprinkle pumpkin seeds on top",
        "Drizzle with olive oil vinaigrette",
        "Toss gently and serve immediately"
      ]
    },
    {
      id: 2,
      name: "Berry Protein Smoothie Bowl",
      image: smoothieBowl,
      prepTime: "10 min",
      servings: 1,
      difficulty: "Easy",
      calories: 380,
      tags: ["High Protein", "Antioxidant Rich", "Gluten Free"],
      ingredients: [
        "1 frozen banana",
        "1/2 cup mixed berries",
        "1 scoop vanilla protein powder",
        "1/2 cup Greek yogurt",
        "1/4 cup granola",
        "1 tbsp chia seeds",
        "Fresh berries for topping"
      ],
      instructions: [
        "Blend frozen banana, berries, protein powder, and yogurt until smooth",
        "Pour mixture into a bowl",
        "Top with granola, chia seeds, and fresh berries",
        "Add any additional toppings as desired",
        "Serve immediately while cold"
      ]
    },
    {
      id: 3,
      name: "Grilled Salmon with Quinoa",
      image: salmonMeal,
      prepTime: "25 min",
      servings: 2,
      difficulty: "Medium",
      calories: 520,
      tags: ["High Protein", "Omega-3 Rich", "Heart Healthy"],
      ingredients: [
        "2 salmon fillets (6 oz each)",
        "1 cup quinoa",
        "2 cups vegetable broth",
        "1 bunch asparagus, trimmed",
        "2 tbsp olive oil",
        "1 lemon, sliced",
        "Salt and pepper to taste",
        "Fresh herbs for garnish"
      ],
      instructions: [
        "Cook quinoa in vegetable broth according to package instructions",
        "Season salmon fillets with salt, pepper, and olive oil",
        "Preheat grill to medium-high heat",
        "Grill salmon for 4-5 minutes per side",
        "Steam asparagus until tender-crisp",
        "Serve salmon over quinoa with asparagus",
        "Garnish with lemon slices and fresh herbs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
            Healthy Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delicious, nutritious recipes to fuel your healthy lifestyle
          </p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-nutrition-green">
                      {recipe.calories} cal
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl mb-2">{recipe.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {recipe.servings} servings
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        {recipe.difficulty}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {recipe.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {/* Ingredients */}
                      <div>
                        <h4 className="font-semibold mb-2 text-nutrition-green">Ingredients:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                          {recipe.ingredients.length > 4 && (
                            <li className="text-nutrition-green">+ {recipe.ingredients.length - 4} more ingredients...</li>
                          )}
                        </ul>
                      </div>

                      {/* Instructions Preview */}
                      <div>
                        <h4 className="font-semibold mb-2 text-nutrition-green">Instructions:</h4>
                        <ol className="text-sm space-y-1 text-muted-foreground">
                          {recipe.instructions.slice(0, 3).map((step, index) => (
                            <li key={index}>{index + 1}. {step}</li>
                          ))}
                          {recipe.instructions.length > 3 && (
                            <li className="text-nutrition-green">+ {recipe.instructions.length - 3} more steps...</li>
                          )}
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;