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

  return (
    <div className="app">
      <BrowserRouter>
        <nav>Navigation</nav>
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