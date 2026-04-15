import './styles/index.css'
import { useEffect, useState, type JSX } from 'react';
import { authService } from './services/authService';
import Cookies from "js-cookie"
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LoadingPage from './pages/LoadingPage';

async function checkAuthentication(): Promise<boolean> {
  try {
    const cookie = Cookies.get('AUTHENTICATED');
    if (!cookie) return false;

    const response = await authService.isSessionValid();
    return response.status === 200;

  } catch (error) {

    console.error("Auth check failed:", error);
    return false;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const init = async () => {
      setIsAuthenticated(await checkAuthentication());
      setIsLoading(false);
  }

  useEffect( () => {
      init()
  }, [])

  return <DashboardPage/>

  if (isLoading) {
    return <LoadingPage/>
  }

  if (isAuthenticated){
    return <DashboardPage/>
  }
  else {
    return <AuthPage/>
  }
}

export default App;