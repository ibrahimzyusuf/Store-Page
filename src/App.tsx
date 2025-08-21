import './App.css'
import { Routes,Route } from "react-router-dom";
import Store from "./Pages/Store";
import NavBar from "./Components/NavBar";
import { ShoppingCartProvider } from './Context/ShoppingCartContext';

function App() {

  return (
    <>
    <ShoppingCartProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Store />} />
      </Routes>
    </ShoppingCartProvider>
    </>
  )
}

export default App
