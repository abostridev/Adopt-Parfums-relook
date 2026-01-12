const categories = [
  {
    id: 'femme',
    title: 'Parfums pour elle',
    description:
      'Des fragrances délicates et audacieuses, pensées pour révéler votre élégance.',
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'homme',
    title: 'Parfums pour lui',
    description:
      'Des notes intenses et raffinées pour affirmer votre caractère.',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'enfant',
    title: 'Pour les plus jeunes',
    description:
      'Des senteurs douces et légères, adaptées aux plus petits.',
    image:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&q=80',
  },
];

const ExploreCategories = () => {
  return (
<section className="bg-[#F1E7DF] py-20 px-4 border-t border-b border-[#E3D3C8]">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-light text-center text-text mb-14">
          Explorez nos univers
        </h2>

        {/* Grille */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="h-110 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500" />

              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-5">
                  <h3 className="text-2xl font-semibold mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="inline-block w-fit border border-white/80 px-6 py-2 text-sm tracking-wide transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    Découvrir
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ExploreCategories;
