import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';
import healthySaladImg from '@/assets/healthy-salad.jpg';
import smoothieBowlImg from '@/assets/smoothie-bowl.jpg';
import salmonMealImg from '@/assets/salmon-meal.jpg';

function Recipes() {
  const recipes = [
    {
      id: 1,
      name: "Pesarattu (Green Gram Dosa)",
      image: healthySaladImg,
      cookTime: "30 mins",
      servings: "4 people",
      difficulty: "Easy",
      calories: "180 cal",
      description: "Traditional Andhra Pradesh breakfast made with green gram",
      ingredients: [
        "1 cup green gram (moong dal)",
        "1/4 cup rice",
        "1 inch ginger",
        "2-3 green chilies",
        "1 tsp cumin seeds",
        "Salt to taste",
        "Oil for cooking"
      ],
      instructions: [
        "Soak green gram and rice for 4-5 hours",
        "Grind with ginger, green chilies, and cumin to a smooth batter",
        "Add salt and mix well",
        "Heat a non-stick pan and spread the batter like a dosa",
        "Cook until golden brown on both sides",
        "Serve hot with coconut chutney"
      ]
    },
    {
      id: 2,
      name: "Ragi Mudde (Finger Millet Balls)",
      image: smoothieBowlImg,
      cookTime: "20 mins",
      servings: "3 people",
      difficulty: "Medium",
      calories: "220 cal",
      description: "Nutritious finger millet balls, a staple food in rural Andhra",
      ingredients: [
        "1 cup ragi flour (finger millet)",
        "2 cups water",
        "Salt to taste",
        "1 tsp ghee"
      ],
      instructions: [
        "Boil water in a heavy-bottomed pan",
        "Add salt and reduce heat to low",
        "Gradually add ragi flour while stirring continuously",
        "Cook for 5-7 minutes until it forms a thick mass",
        "Add ghee and mix well",
        "Shape into round balls when slightly cool",
        "Serve with sambar or curry"
      ]
    },
    {
      id: 3,
      name: "Andhra Fish Curry",
      image: salmonMealImg,
      cookTime: "45 mins",
      servings: "5 people",
      difficulty: "Medium",
      calories: "280 cal",
      description: "Spicy and tangy fish curry from Andhra Pradesh",
      ingredients: [
        "500g fish (rohu or pomfret)",
        "2 onions, sliced",
        "3 tomatoes, chopped",
        "2 tbsp tamarind paste",
        "1 tbsp red chili powder",
        "1 tsp turmeric powder",
        "1 tbsp coriander powder",
        "2 tbsp coconut oil",
        "Curry leaves",
        "Salt to taste"
      ],
      instructions: [
        "Clean and cut fish into medium pieces",
        "Marinate with turmeric and salt for 15 minutes",
        "Heat coconut oil, add curry leaves and onions",
        "Cook onions until golden, add tomatoes",
        "Add all spice powders and cook for 2 minutes",
        "Add tamarind paste and 1 cup water",
        "Add fish pieces and simmer for 15 minutes",
        "Serve hot with steamed rice"
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nutrition-green to-nutrition-orange bg-clip-text text-transparent">
            Healthy Andhra Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover traditional and nutritious recipes from Andhra Pradesh
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 transform hover:scale-[1.02]">
              <div className="relative h-48">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-nutrition-green">
                    {recipe.calories}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl mb-2">{recipe.name}</CardTitle>
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{recipe.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.cookTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {recipe.difficulty}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-nutrition-green mb-2">Ingredients:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                    {recipe.ingredients.length > 4 && (
                      <li className="text-nutrition-orange">+ {recipe.ingredients.length - 4} more...</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-nutrition-green mb-2">Instructions:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    {recipe.instructions.slice(0, 3).map((step, index) => (
                      <li key={index}>{index + 1}. {step}</li>
                    ))}
                    {recipe.instructions.length > 3 && (
                      <li className="text-nutrition-orange">+ {recipe.instructions.length - 3} more steps...</li>
                    )}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;