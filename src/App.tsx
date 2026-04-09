import './App.css'
import Auth from './pages/Auth';
import { useEffect, useState, type JSX } from 'react';
import { authService } from './services/authService';
import MealPlanPage from './pages/MealPlan';
import Home from './pages/Home';
import RecipePage from './pages/recipe/Recipe';
import More from './pages/More';


function App() {
  const pages: Record<string, JSX.Element> = {
    "Auth": <Auth />,
    "Meals": <MealPlanPage />,
    "Recipes": <RecipePage />,
    "Metrics": <Home />,
    "More": <More/>
  };

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<null | JSX.Element>(null);
  const [activeTab, setActiveTab] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isSessionValid = async () => {
      try {
        const response = await authService.isSessionValid();
        return response.status === 200;

      } catch (error) {
        return false;
      }
    };

    const main = async () => {
      if (authService.isAuthCookiePresent() && await isSessionValid()){
        setPage(pages.Meals)
        setIsAuthenticated(true)
      }
      else{
        setPage(pages.Auth)
      }

      setIsLoading(false)
    }

    main()
    
  }, []);



  const handleOptionChange = (label: string) => {
    setPage(pages[label])
    setActiveTab(label)
  }

  const getNavElementsArray = () => {
    if (!isAuthenticated){
      return []
    }

    return Object.keys(pages)
    .filter(
      key => key !== "Auth"
    )
  }

  if (isLoading) {
    return <div className="loading-screen">Loading application...</div>; 
  }

  return (
    <div className="app">
        <nav className="fixed bottom-0 z-50 w-full bg-white md:sticky md:top-0 md:bottom-auto">
          <div className="h-9.5 flex items-center justify-center md:justify-between px-0 md:px-10">
            <div className="hidden md:block font-bold text-gray-800 cursor-pointer">
              <a href="/">Logo</a>
            </div>
            <ul className="flex h-full w-full md:w-auto">
              {
                getNavElementsArray().map(
                  (entry) => {
                    // Sprawdzamy, czy ten element jest obecnie aktywny
                    const isActive = activeTab === entry;

                    return (
                      <li 
                        key={entry} 
                        onClick={() => handleOptionChange(entry)} 
                        className={`
                          relative flex items-center h-full font-semibold cursor-pointer
                          transition-all duration-200
                          flex-1 md:flex-none justify-center sm:px-2 md:px-8

                          /* 1. Kolor tekstu: niebieski jeśli aktywny, w przeciwnym razie szary z niebieskim hoverem */
                          ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}

                          /* 2. Baza linii pod spodem */
                          after:content-[''] 
                          after:absolute 
                          after:bottom-0 
                          after:left-0 
                          after:h-0.5 
                          after:w-full 
                          after:bg-blue-500  
                          after:origin-left 
                          after:transition-transform 
                          after:duration-200
                          
                          /* 3. Logika wyświetlania linii: pełna skala (100) dla aktywnego, skala (0 + hover) dla reszty */
                          ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                        `}
                      >
                        {entry}
                      </li>
                    );
                  }
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