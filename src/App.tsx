import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from './pages/Auth';
import { useEffect, useState } from 'react';
import { authService } from './services/authService';
import MealPlanPage from './pages/MealPlan';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RecipePage from './pages/recipe/Recipe';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await authService.isSessionValid();
        setIsAuthenticated(response.status === 200)
      

      } catch (error) {
        setIsAuthenticated(false);


      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  if (isLoading) {
    return <div className="loading-screen">Loading application...</div>; 
  }

  const navLinks = [
    { label: "Meals", href: "/meal" },
    { label: "Recipes", href: "/recipe" }, // Dodałem "/" dla spójności
    { label: "Metrics", href: "/metrics" },
    { label: "More", href: "/more" },
  ];

  return (
    <div className="app">
      <BrowserRouter>
        <nav className="fixed bottom-0 z-50 w-full bg-white md:sticky md:top-0 md:bottom-auto">
          <div className="h-9.5 flex items-center justify-center md:justify-between px-10">
            <div className="hidden md:block font-bold text-gray-800 cursor-pointer">
              <a href="/">Logo</a>
            </div>
            <ul className="flex h-full">
              {
                navLinks.map(
                  (option, index) => (
                    <li key={index} className="h-full">
                        <a
                          href={option.href}
                          className="
                            relative flex items-center h-full px-8 font-medium text-gray-600 font-semibold
                            hover:text-blue-600 transition-colors duration-200
                            
                            /* 1. Tworzymy niewidzialną linię na dole */
                            after:content-[''] 
                            after:absolute 
                            after:bottom-0 
                            after:left-0 
                            after:h-[2px] 
                            after:w-full 
                            after:bg-blue-500 
                            
                            /* 2. Startowa skala linii to 0 (niewidoczna) */
                            after:scale-x-0 
                            /* 3. Punkt zakotwiczenia animacji po lewej stronie */
                            after:origin-left 
                            /* 4. Dodajemy transition dla transformacji */
                            after:transition-transform 
                            after:duration-200
                            
                            /* 5. Na hover skala wraca do 1 (pełna szerokość) */
                            hover:after:scale-x-100
                          "
                        >
                          {option.label}
                        </a>
                      </li>
                  )
                )
              }
            </ul>
          </div>
        </nav>
        <main>
          <Routes>           
            {/* TRASY PUBLICZNE */} 
            <Route 
                path="/auth" 
                element={!isAuthenticated ? <Auth /> : <Navigate to="/" replace />} 
            />

            {/* TRASY CHRONIONE (Tylko dla zalogowanych) */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
              <Route path="/meal" element={<MealPlanPage />} />
              <Route path='/recipe' element={<RecipePage/>}/>
            </Route>
      
            {/* OBSŁUGA BŁĘDÓW */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>Footer</footer>
      </BrowserRouter>
    </div>
  )
}

export default App;