import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { cartCount } = useCart();

  const { orderCount } = useOrders();
  const [searchOpen, setSearchOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => {
    setOpen(false); // Ferme le menu
    window.scrollTo(0, 0); // Optionnel : défile vers le haut
  };




  /* =====================
      commandes
   ====================== */
  useEffect(() => {
    if (!user) {
      setOrderCount(0);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my");
        setOrderCount(res.data.filter(order => order.status !== "delivered").length);
      } catch {
        setOrderCount(0);
      }
    };

    fetchOrders();
  }, [user]);

  /* =====================
     LOGOUT PROPRE
  ====================== */
  const handleLogout = () => {
    logout();
    setCartCount(0);
    setUserMenu(false);
    navigate("/login", { replace: true });
  };
  const activeStyle = "text-secondary font-semibold border-b-2 border-secondary pb-1";
  const normalStyle = "hover:text-secondary transition-colors pb-1";

  return (
    <header className="bg-[background] border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="tracking-wide">
          <span className="font-title text-2xl md:text-3xl">Adopt</span>
          <span className="text-secondary text-xl md:text-2xl font-body"> {" "}— Parfums </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <NavLink
            to="/category/femme"
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
            onClick={() => window.scrollTo(0, 0)}
          >
            Femme
          </NavLink>

          <NavLink
            to="/category/homme"
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
            onClick={() => window.scrollTo(0, 0)}
          >
            Homme
          </NavLink>

          <NavLink
            to="/category/enfant"
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
            onClick={() => window.scrollTo(0, 0)}
          >
            Enfant
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `relative font-title block border-b border-t py-1 px-2 font-semibold transition-colors ${isActive ? "bg-secondary text-white border-secondary" : "bg-amber-50 border-secondary text-black"
              }`
            }
            onClick={() => window.scrollTo(0, 0)}
          >
            Mes commandes
            {user && orderCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-sm font-title w-5 h-5 rounded-full flex items-center justify-center ${"bg-secondary text-white border border-white"
                }`}>
                {orderCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/conseils"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm transition-all ${isActive ? "bg-black text-white" : "bg-secondary text-white"
              }`
            }
          >
            Conseils & Astuces
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 relative">
          <button onClick={() => setSearchOpen(true)}>
            <Search className="w-5 h-5 hover:text-secondary" />
          </button>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 hover:text-secondary" />
            {user && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          <div className="relative">
            <button onClick={() => setUserMenu(!userMenu)}>
              <User className="w-5 h-5 hover:text-secondary" />
            </button>
            {user && (<span className="absolute bottom-0 -right-1 w-2 h-2 bg-secondary rounded-full"></span>)}

            {userMenu && (
              <>
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border z-50">
                  {user ? (
                    <>
                      <Link
                        to="/orders"
                        className=" px-5 py-4 border-gray-300 border-b flex flex-row hover:bg-background"
                        onClick={() => setUserMenu(false)}
                      >
                        <span>Mes commandes </span> {user && orderCount > 0 && (
                          <span className="  bg-secondary ml-2 text-white text-sm font-title w-5 h-5 rounded-full flex  items-center justify-center">
                            {orderCount}
                          </span>
                        )}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-4 text-red-500 hover:bg-background"
                      >
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-5 py-4 hover:bg-background"
                        onClick={() => setUserMenu(false)}
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/register"
                        className="block px-5 py-4 text-secondary font-medium hover:bg-background"
                        onClick={() => setUserMenu(false)}
                      >
                        Créer un compte
                      </Link>
                    </>
                  )}
                </div>

                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenu(false)}
                />
              </>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
            {user && orderCount > 0 && !open && (
              <span className=" md:hidden absolute -top-2 -right-2 bg-secondary text-white text-sm font-title w-5 h-5 rounded-full flex items-center justify-center">
                {orderCount}
              </span>
            )}

          </button>
        </div>

      </div>
      {/* MENU MOBILE */}
      {open && (
        <nav className="lg:hidden bg-[background] border-t px-6 py-4 space-y-4">
          <NavLink
            to="/category/femme"
            className={({ isActive }) => `block py-2 ${isActive ? "text-secondary font-bold" : ""}`}
            onClick={() => closeMenu()}
          >
            Femme
          </NavLink>
          <NavLink
            to="/category/homme"
            className={({ isActive }) => `block py-2 ${isActive ? "text-secondary font-bold" : ""}`}
            onClick={() => closeMenu()}
          >
            Homme
          </NavLink>
          <NavLink
            to="/category/enfant"
            className={({ isActive }) => `block py-2 ${isActive ? "text-secondary font-bold" : ""}`}
            onClick={() => closeMenu()}
          >
            Enfant
          </NavLink>
          {/* ... etc pour les autres liens mobiles */}
        </nav>
      )}
      {/* input de Recherche */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}


    </header>
  );
};

export default Navbar;
