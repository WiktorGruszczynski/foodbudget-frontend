import './App.css'
import Auth from './pages/Auth';
import { useEffect, useState, type JSX } from 'react';
import { authService } from './services/authService';
import MealPlanPage from './pages/MealPlan';
import Home from './pages/Home';
import RecipePage from './pages/recipe/Recipe';


function App() {
  const pages: Record<string, JSX.Element> = {
    "Auth": <Auth />,
    "Meals": <MealPlanPage />,
    "Recipes": <RecipePage />,
    "Metrics": <Home />,
    "More": <Home />
  };

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(pages.Auth);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await authService.isSessionValid();
        const isValid = response.status === 200;
        
        if (isValid){
          setPage(pages.Meals)
        }

      } catch (error) {
        console.error(error)

      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const handleOptionChange = (label: string) => {
    setPage(pages[label])
  }

  if (isLoading) {
    return <div className="loading-screen">Loading application...</div>; 
  }

  return (
    <div className="app">
        <nav className="fixed bottom-0 z-50 w-full bg-white md:sticky md:top-0 md:bottom-auto">
          <div className="h-9.5 flex items-center justify-center md:justify-between px-10">
            <div className="hidden md:block font-bold text-gray-800 cursor-pointer">
              <a href="/">Logo</a>
            </div>
            <ul className="flex h-full">
              {
                Object.keys(pages).filter(key => key!="Auth").map(
                  (entry) => (
                    <li key={entry} onClick={() => handleOptionChange(entry)} className="
                            relative flex items-center h-full px-8 text-gray-600 font-semibold
                            hover:text-blue-600 transition-all duration-200
                            cursor-pointer
                            /* 1. Tworzymy niewidzialną linię na dole */
                            after:content-[''] 
                            after:absolute 
                            after:bottom-0 
                            after:left-0 
                            after:h-0.5 
                            after:w-full 
                            after:bg-blue-500  
                            after:scale-x-0 
                            after:origin-left 
                            after:transition-transform 
                            after:duration-200
                            hover:after:scale-x-100
                          "
                      >{entry}</li>
                  )
                )
              }
            </ul>
          </div>
        </nav>
        <main>{page}</main>
    </div>
  )
}

export default App;