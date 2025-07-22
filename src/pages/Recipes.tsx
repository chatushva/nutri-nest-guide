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
      name: "Andhra Pesarattu",
      image: healthySalad,
      prepTime: "20 min",
      servings: 4,
      difficulty: "Easy",
      calories: 280,
      tags: ["Vegetarian", "High Protein", "Gluten Free"],
      ingredients: [
        "1 cup green gram (moong dal)",
        "1/4 cup rice",
        "2 green chilies",
        "1 inch ginger piece",
        "1/2 cup onions, chopped",
        "2 tbsp coriander leaves",
        "Salt to taste",
        "Oil for cooking"
      ],
      instructions: [
        "Soak green gram and rice for 4 hours",
        "Grind with green chilies and ginger to smooth batter",
        "Add salt and mix well",
        "Heat tawa and spread batter like dosa",
        "Sprinkle onions and coriander on top",
        "Cook until golden brown and serve with chutney"
      ]
    },
    {
      id: 2,
      name: "Ragi Mudde Bowl",
      image: smoothieBowl,
      prepTime: "15 min",
      servings: 2,
      difficulty: "Easy",
      calories: 320,
      tags: ["High Fiber", "Calcium Rich", "Gluten Free"],
      ingredients: [
        "1 cup ragi flour (finger millet)",
        "2 cups water",
        "1/2 tsp salt",
        "1 tbsp ghee",
        "Sambar for serving",
        "Gunpowder (podi)",
        "Fresh curry leaves",
        "Buttermilk"
      ],
      instructions: [
        "Boil water with salt in a heavy-bottomed pan",
        "Add ragi flour slowly while stirring continuously",
        "Cook for 10-12 minutes stirring constantly",
        "Add ghee and mix well",
        "Shape into balls using wet hands",
        "Serve hot with sambar, gunpowder and buttermilk"
      ]
    },
    {
      id: 3,
      name: "Andhra Fish Curry",
      image: salmonMeal,
      prepTime: "35 min",
      servings: 3,
      difficulty: "Medium",
      calories: 450,
      tags: ["High Protein", "Omega-3 Rich", "Spicy"],
      ingredients: [
        "500g fish (rohu or pomfret)",
        "1 cup tamarind pulp",
        "2 tbsp red chili powder",
        "1 tsp turmeric powder",
        "1 tbsp coriander powder",
        "1 cup onions, sliced",
        "2 tomatoes, chopped",
        "Curry leaves and mustard seeds"
      ],
      instructions: [
        "Marinate fish with turmeric and salt for 15 minutes",
        "Heat oil and fry fish pieces until golden",
        "In same pan, add mustard seeds and curry leaves",
        "Add onions and cook until translucent",
        "Add tomatoes, spice powders and tamarind pulp",
        "Add fried fish and simmer for 10 minutes",
        "Serve hot with steamed rice"
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