import './App.css'
import Store from "./Pages/Store";
import NavBar from "./Components/NavBar";
import { ShoppingCartProvider } from './Context/ShoppingCartContext';

function App() {

  return (
    <>
    <ShoppingCartProvider>
      <NavBar/>
      <Store />
    </ShoppingCartProvider>
    </>
  )
}

export default App
