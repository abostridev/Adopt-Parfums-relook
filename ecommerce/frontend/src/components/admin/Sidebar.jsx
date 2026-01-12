import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r px-6 py-8">
      <h2 className="font-serif text-2xl mb-10">Admin</h2>

      <nav className="space-y-4 text-sm">
        <Link to="/admin" className="block hover:text-secondary">
          Dashboard
        </Link>
        <Link to="/admin/products" className="block hover:text-secondary">
          Produits
        </Link>
        <Link to="/admin/orders" className="block hover:text-secondary">
          Commandes
        </Link>
        <Link to="/admin/advices" className="block hover:text-secondary">
          Conseils
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
