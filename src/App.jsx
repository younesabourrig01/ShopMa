import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductsList from "./components/Pages/ProductsList";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import { ProductDetail } from "./components/Pages/ProductDetail";
import NotFound from "./components/Pages/NotFound";
import Panier from "./components/Pages/Panier";
import Contact from "./components/Pages/Contact";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<ProductsList />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
