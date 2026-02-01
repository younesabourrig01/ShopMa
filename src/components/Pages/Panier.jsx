import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/features/Selectors/cartSelectors";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/features/Cart/cartSlice";

const Panier = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] mx-auto px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-50 p-6 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Votre panier est vide
        </h2>
        <Link
          to="/produits"
          className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
        >
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-black text-gray-900 mb-10">Mon panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Prix unitaire : {item.price} DH
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                  >
                    −
                  </button>

                  <span className="font-bold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-bold text-gray-900">
                  {item.totalPrice.toFixed(2)} DH
                </p>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-sm text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} DH</span>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-colors mb-3"
          >
            Vider le panier
          </button>

          <Link
            to="/checkout"
            className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Panier;
