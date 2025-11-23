import { Search, ShoppingCart, CircleUserRound } from "lucide-react";
import Image from "next/image";
import shirt1 from './shirt1.webp';
import shirt2 from './shirt2.webp';
import shirt3 from './shirt3.webp';

export default function Main() {          
  const ProductsArrival = [
    {
      img: shirt1,
      name: 'Shirt Sample',
      rating: 4.5,
      price: 799,
    },
    {
      img: shirt2,
      name: 'Shirt Sample 2',
      rating: 5,
      price: 800,
    },
    {
      img: shirt3,
      name: 'Shirt Sample 3',
      rating: 4.4,
      price: 690,
    },
  ];

  return (
    <div>
      <header>
        <div className="flex justify-center items-center px-5 py-5 gap-10">
          <div className="text-3xl font-black">
            <h1>SHOP.CO</h1>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-10">
              <li>Shop</li>
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </nav>

          <div className="flex-1 max-w-xl mx-4">
            <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <ShoppingCart size={24} />
            <CircleUserRound size={24} />
          </div>
        </div>
      </header>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <div className="px-8 py-16 md:px-20">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h2>
          <p className="text-gray-600 py-6 max-w-2xl">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button className="bg-black text-white py-4 px-12 rounded-full text-lg">
            Shop Now
          </button>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-12">
            <div>
              <h3 className="text-5xl font-bold">200+</h3>
              <p className="text-gray-500">International Brands</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">2,000+</h3>
              <p className="text-gray-500">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">30,000+</h3>
              <p className="text-gray-500">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="bg-black py-6 text-white flex flex-wrap justify-center items-center gap-10 text-xl font-medium">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span>Calvin Klein</span>
        </div>

        {/* NEW ARRIVALS SECTION WITH MAPPING */}
        <section className="py-16 px-8">
          <h3 className="text-center text-4xl font-extrabold mb-10">NEW ARRIVALS</h3>

          <div className="flex flex-wrap justify-center items-center gap-10">
            {ProductsArrival.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <div className="flex items-center gap-1 my-2 ">
                    {/* Simple star rating */}
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <p className="text-xl font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}