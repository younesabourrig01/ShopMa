import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "../../Hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/Cart/cartSlice";

export const ProductDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`,
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <Spinner animation="border" variant="success" />
      </div>
    );

  if (error || !data)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || "Produit non trouvé"}
        </h2>
        <button
          onClick={() => navigate("/produits")}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Retour aux produits
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 flex items-center justify-center shadow-sm">
          <img
            src={data.image}
            alt={data.title}
            className="max-h-[450px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">
            {data.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
            {data.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <span className="text-yellow-600 font-bold mr-1">
                {data.rating?.rate}
              </span>
              <span className="text-yellow-500 text-sm">★</span>
            </div>
            <span className="text-gray-400 text-sm">
              {data.rating?.count} avis clients
            </span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {data.description}
          </p>

          <div className="border-t border-gray-100 pt-8 mt-auto">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm text-gray-400 font-medium">Prix Total</p>
                <p className="text-4xl font-black text-gray-900">
                  {data.price}{" "}
                  <span className="text-lg text-emerald-600 font-bold ml-1">
                    DH
                  </span>
                </p>
              </div>

              <button
                onClick={() => dispatch(addToCart(data))}
                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-100"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
