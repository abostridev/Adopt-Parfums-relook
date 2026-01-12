import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F5] border-t border-[#E6E2DF] md:pt-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* MARQUE */}
        <div>
          <h2 className="font-title text-3xl mb-4">
            Adopt <span className="text-secondary">— Parfums</span>
          </h2>
          <p className="text-sm text-[#6F6F6F] leading-relaxed">
            Des fragrances élégantes conçues pour révéler votre identité.
            Une signature olfactive unique, pensée avec passion.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="font-semibold mb-4 tracking-wide">Navigation</h3>
          <ul className="space-y-3 text-sm text-[#6F6F6F]">
            <li><Link to="/" className="hover:text-secondary">Accueil</Link></li>
            <li><Link to="/category/femme" className="hover:text-secondary">Parfums Femme</Link></li>
            <li><Link to="/category/homme" className="hover:text-secondary">Parfums Homme</Link></li>
            <li><Link to="/conseils" className="hover:text-secondary">Conseils & Astuces</Link></li>
          </ul>
        </div>

        {/* COMPTE */}
        <div>
          <h3 className="font-semibold mb-4 tracking-wide">Mon compte</h3>
          <ul className="space-y-3 text-sm text-[#6F6F6F]">
            <li><Link to="/login" className="hover:text-secondary">Connexion</Link></li>
            <li><Link to="/register" className="hover:text-secondary">Créer un compte</Link></li>
            <li><Link to="/orders" className="hover:text-secondary">Mes commandes</Link></li>
            <li><Link to="/cart" className="hover:text-secondary">Mon panier</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 tracking-wide">Contact</h3>
          <ul className="space-y-3 text-sm text-[#6F6F6F]">
            <li>Email : contact@adopt-parfums.com</li>
            <li>Service client 7j/7</li>
            <li>Livraison rapide & sécurisée</li>
          </ul>
        </div>
      </div>

      {/* BAS DE FOOTER */}
      <div className="border-t border-[#E6E2DF] py-6 text-center text-sm text-[#8A8A8A]">
        © {new Date().getFullYear()} Adopt Parfums — Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
