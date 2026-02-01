import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/features/Selectors/cartSelectors";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const getLinkStyle = ({ isActive }) =>
    `relative py-2 text-sm font-semibold transition-all duration-300 hover:text-[#1DBB8B] ${
      isActive ? "text-[#1DBB8B]" : "text-gray-600"
    }`;

  const activeIndicator =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-[#1DBB8B] after:rounded-full";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <NavLink
            to="/"
            className="text-2xl font-black tracking-tighter text-gray-900 no-underline"
          >
            SHOP <span className="text-[#1DBB8B]">. </span>MA
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-8 no-underline">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `no-underline ${getLinkStyle({ isActive })} ${
                isActive ? activeIndicator : ""
              }`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/produits"
            className={({ isActive }) =>
              `no-underline ${getLinkStyle({ isActive })} ${
                isActive ? activeIndicator : ""
              }`
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/panier"
            className={({ isActive }) =>
              `no-underline flex items-center gap-2 ${getLinkStyle({ isActive })} ${
                isActive ? activeIndicator : ""
              }`
            }
          >
            Panier
            {cartCount > 0 && (
              <span className="ml-1 bg-[#1DBB8B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `no-underline ${getLinkStyle({ isActive })} ${
                isActive ? activeIndicator : ""
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-[#1DBB8B] transition-colors"
          >
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-6 space-y-4">
          <li>
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `no-underline block text-base ${getLinkStyle({ isActive })}`
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `no-underline block text-base ${getLinkStyle({ isActive })}`
              }
            >
              Produits
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/panier"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `no-underline block text-base ${getLinkStyle({ isActive })}`
              }
            >
              Panier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `no-underline block text-base ${getLinkStyle({ isActive })}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
