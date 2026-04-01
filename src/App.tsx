import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import Product from './pages/Product';
import { Recipe } from './pages/Recipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;