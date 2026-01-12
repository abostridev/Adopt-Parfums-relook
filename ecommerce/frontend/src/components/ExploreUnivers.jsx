import { Link } from 'react-router-dom';

const univers = [
  {
    title: 'Femme',
    description: 'Des fragrances élégantes et lumineuses, pensées pour sublimer chaque instant.',
    image:
      'https://images.unsplash.com/photo-1523293836424-f04e712e1b8b?auto=format&fit=crop&w=1200&q=80',
    link: '/category/femme',
  },
  {
    title: 'Homme',
    description: 'Des accords profonds et raffinés, entre fraîcheur et intensité.',
    image:
      'https://images.unsplash.com/photo-1615486363973-f79d875780cf?auto=format&fit=crop&w=1200&q=80',
    link: '/category/homme',
  },
  {
    title: 'Enfant',
    description: 'Une douceur légère et rassurante, adaptée aux plus jeunes.',
    image:
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=1200&q=80',
    link: '/category/enfant',
  },
];

const ExploreUnivers = () => {
  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITRE */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Trouvez votre univers
          </h2>
          <p className="text-lg text-text/70 max-w-xl mx-auto">
            Chaque parfum raconte une histoire. Découvrez celle qui vous ressemble.
          </p>
        </div>

        {/* BLOCS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {univers.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative h-105 rounded-3xl overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* OVERLAY DÉGRADÉ */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

              {/* CONTENU */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-base opacity-90 max-w-xs">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ExploreUnivers;


