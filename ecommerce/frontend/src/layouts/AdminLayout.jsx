import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  Package,
  LayoutDashboard,
  ShoppingBag,
  Video,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition
     ${
       isActive
         ? "bg-secondary text-white"
         : "text-white/80 hover:bg-white/10"
     }`;

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex">

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-black text-white p-6 flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif tracking-wide">
            Admin Panel
          </h2>

          {/* CLOSE (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="space-y-2 flex-1 text-sm">
          <NavLink to="/admin" end className={linkClass} onClick={() => setOpen(false)}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={linkClass} onClick={() => setOpen(false)}>
            <Package size={18} />
            Produits
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass} onClick={() => setOpen(false)}>
            <ShoppingBag size={18} />
            Commandes
          </NavLink>

          <NavLink to="/admin/conseils" className={linkClass} onClick={() => setOpen(false)}>
            <Video size={18} />
            Conseils
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/10 transition text-sm"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* CONTENU */}
      <div className="flex-1 w-full">
        {/* TOPBAR (mobile) */}
        <div className="md:hidden bg-white px-6 py-4 shadow-sm flex items-center">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <h1 className="ml-4 font-serif text-lg">Admin</h1>
        </div>

        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
