import ProductCard from "../ProductCard/ProductCard";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFilteredProducts } from "../../redux/features/Selectors/ProductsSelectors";
import { fetchProducts } from "../../redux/features/products/productsSlice";

function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-red-500 text-center py-10">Erreur: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative group">
          <input
            type="text"
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 shadow-sm
              focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
          />
        </div>

        <p className="text-sm text-gray-500 mt-3 ml-2">
          <strong className="text-emerald-600">
            {searchedProducts.length}
          </strong>{" "}
          produits trouvés
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchedProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            description={p.description}
            category={p.category}
            image={p.image}
            rating={p.rating.rate}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
