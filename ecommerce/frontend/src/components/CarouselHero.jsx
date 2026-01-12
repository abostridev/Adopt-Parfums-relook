import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'L’élégance florale au quotidien',
    description:
      'Des fragrances délicates et lumineuses, pensées pour sublimer chaque instant avec douceur et caractère.',
    price: 'À partir de 29 €',
    cta: 'Découvrir Femme',
    link: '/category/femme',
    image:
      'http://localhost:5000/uploads/products/product4-F.jpg',
  },
  {
    title: 'Des notes intenses et affirmées',
    description:
      'Des parfums aux accords boisés et épicés, conçus pour révéler une personnalité forte et authentique.',
    price: 'À partir de 29 €',
    cta: 'Découvrir Homme',
    link: '/category/homme',
    image:
      'http://localhost:5000/uploads/products/product9-H.jpg',
  },
  {
    title: 'La douceur en toute légèreté',
    description:
      'Des senteurs fraîches et légères, adaptées aux plus jeunes, pour accompagner leurs premiers instants parfumés.',
    price: 'À partir de 19 €',
    cta: 'Découvrir Enfant',
    link: '/category/enfant',
    image:
      'http://localhost:5000/uploads/products/product15-E.jpg',
  },
];

const CarouselHero = () => {
  return (
    <section className="bg-background">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">

              {/* OVERLAY DOUX */}
              <div className="absolute inset-0 bg-brand/60 z-0" />

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* TEXTE */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-semibold text-text mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-text/80 text-lg mb-6">
                    {slide.description}
                  </p>

                  <p className="text-xl font-medium text-secondary mb-8">
                    {slide.price}
                  </p>

                  <a
                    href={slide.link}
                    className="inline-block bg-secondary text-white px-8 py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition"
                  >
                    {slide.cta}
                  </a>
                </div>

                {/* IMAGE */}
                <div className="relative w-full h-80 md:h-112.5 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

  );
};

export default CarouselHero;
