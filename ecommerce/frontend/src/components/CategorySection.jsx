const categories = [
  {
    name: 'Femme',
    slug: 'femme',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    description:
      'Des fragrances délicates et audacieuses pour révéler chaque personnalité.',
  },
  {
    name: 'Homme',
    slug: 'homme',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    description:
      'Des parfums intenses et élégants, pensés pour affirmer le caractère.',
  },
  {
    name: 'Enfant',
    slug: 'enfant',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    description:
      'Des senteurs douces et légères, adaptées aux plus jeunes.',
  },
];

const CategorySection = () => {
  return (
    <section className="bg-background py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12 text-text">
        Explorer nos univers
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="group relative overflow-hidden rounded-2xl shadow-sm bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-2xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-sm mb-4 opacity-90">
                {cat.description}
              </p>
              <button className="text-sm underline underline-offset-4">
                Découvrir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
