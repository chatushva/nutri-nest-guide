import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Tips from '@/pages/Tips';
import MealPlanner from '@/pages/MealPlanner';
import NutritionTracker from '@/pages/NutritionTracker';
import Recipes from '@/pages/Recipes';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/planner" element={<MealPlanner />} />
          <Route path="/tracker" element={<NutritionTracker />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;