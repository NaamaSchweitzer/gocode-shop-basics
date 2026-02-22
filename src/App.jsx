import "./App.css";
import { CartDrawer } from "./components/CartDrawer";
import { NavSection } from "./components/NavSection";
import { ProductsSection } from "./components/ProductsSection";

function App() {
  return (
    <>
      <NavSection />
      <ProductsSection />
      <CartDrawer />
    </>
  );
}

export default App;
