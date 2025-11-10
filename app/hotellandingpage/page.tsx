'use client';

import React from "react";
import Image from "next/image";
import {
  Wifi, Phone, Waves, Utensils, Dumbbell, Coffee, Car,
  Star, Calendar, Users, Maximize, IndianRupee, MapPin, Mail
} from "lucide-react";

import Facebook from "../Icons/Facebook_Logo_Primary.png";
import Instagram from '../Icons/Instagram_Glyph_Gradient.svg';
import X from '../Icons/logo-white.png';
import Hotellandbg1 from "../hotelthemes/Hotellandingbg1.webp";
import HotellandingRoom1 from "../hotelthemes/hotellandingrooms1.webp";
import HotellandingRoom2 from "../hotelthemes/hotellandingrooms2.webp";
import HotellandingRoom3 from "../hotelthemes/hotellandingrooms3.webp";

/* -------------------------------------------------
   MAIN PAGE COMPONENT
   ------------------------------------------------- */
export default function HotelLandingPage() {
  const Homeref      = React.useRef<HTMLDivElement>(null);
  const Roomref      = React.useRef<HTMLDivElement>(null);
  const Amenitiesref = React.useRef<HTMLDivElement>(null);
  const Bookingref   = React.useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const year = new Date().getFullYear();

  const scrolltoref = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-200/95 backdrop-blur-sm shadow-md">
        <div className="flex flex-wrap items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold text-blue-600">Grand Hotel</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrolltoref(Homeref)}      className="hover:text-blue-600 transition">Home</button>
            <button onClick={() => scrolltoref(Amenitiesref)} className="hover:text-blue-600 transition">Amenities</button>
            <button onClick={() => scrolltoref(Roomref)}      className="hover:text-blue-600 transition">Rooms</button>
            <button onClick={() => scrolltoref(Bookingref)}   className="hover:text-blue-600 transition">Booking</button>
          </nav>

          <div className="flex items-center gap-4">
            <p className="hidden md:flex items-center gap-1 text-sm">
              <Phone className="w-4 h-4" /> +91 12345 67890
            </p>
            <button
              onClick={() => scrolltoref(Bookingref)}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t`}>
          <nav className="px-4 py-3 space-y-2">
            <button onClick={() => { scrolltoref(Homeref);      setIsMenuOpen(false); }} className="block w-full text-left py-2">Home</button>
            <button onClick={() => { scrolltoref(Amenitiesref); setIsMenuOpen(false); }} className="block w-full text-left py-2">Amenities</button>
            <button onClick={() => { scrolltoref(Roomref);      setIsMenuOpen(false); }} className="block w-full text-left py-2">Rooms</button>
            <button onClick={() => { scrolltoref(Bookingref);   setIsMenuOpen(false); }} className="block w-full text-left py-2">Booking</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <section ref={Homeref}>
          <HotellandbgHome scrolltoref={scrolltoref} Bookingref={Bookingref} Roomref={Roomref} />
        </section>

        <section ref={Amenitiesref}>
          <Hotellandingamenities />
        </section>

        <section ref={Roomref}>
          <HotelAndingRooms scrolltoref={scrolltoref} Bookingref={Bookingref} />
        </section>

        <section ref={Bookingref}>
          <HotelAndingBooking />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Grand Hotel</h3>
            <p className="text-gray-300 text-sm">
              Experience luxury and comfort in the heart of Paradise Bay. Your perfect getaway awaits.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <nav className="space-y-1">
              <button onClick={() => scrolltoref(Homeref)}      className="block text-gray-300 hover:text-white">Home</button>
              <button onClick={() => scrolltoref(Amenitiesref)} className="block text-gray-300 hover:text-white">Amenities</button>
              <button onClick={() => scrolltoref(Roomref)}      className="block text-gray-300 hover:text-white">Rooms</button>
              <button onClick={() => scrolltoref(Bookingref)}   className="block text-gray-300 hover:text-white">Booking</button>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Contact Info</h3>
            <p className="flex items-start gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4 mt-0.5" />123 Grand Hotel, Bandra<br />Mumbai - 123457
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-300">
              <Phone className="w-4 h-4" />+91 12345 67890
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-300">
              <Mail className="w-4 h-4" />info@grandhotel.com
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <Image src={Facebook}   alt="Facebook"   width={28} height={28} className="cursor-pointer hover:opacity-80" />
              <Image src={Instagram}  alt="Instagram"  width={28} height={28} className="cursor-pointer hover:opacity-80" />
              <Image src={X}          alt="X"          width={24} height={24} className="cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400 mt-8">
          &copy; {year} Grand Hotel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------
   HERO SECTION
   ------------------------------------------------- */
function HotellandbgHome({
  scrolltoref,
  Bookingref,
  Roomref,
}: {
  scrolltoref: (ref: React.RefObject<HTMLDivElement | null>) => void;
  Bookingref: React.RefObject<HTMLDivElement | null>;
  Roomref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image src={Hotellandbg1} alt="Grand Hotel Paradise Bay" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <p className="text-lg mb-2">Paradise Bay, California</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Grand Hotel</h1>
        <p className="text-xl mb-8">
          Experience luxury and comfort in the heart of paradise. Your unforgettable stay begins here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrolltoref(Bookingref)}
            className="bg-white text-black px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <Calendar className="w-5 h-5" /> Book Now
          </button>
          <button
            onClick={() => scrolltoref(Roomref)}
            className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Explore Rooms
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   AMENITIES SECTION
   ------------------------------------------------- */
function Hotellandingamenities() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">World-Class Amenities</h2>
        <p className="text-gray-600 mb-12">Everything you need for a perfect stay, all under one roof</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { Icon: Wifi,       title: "Free WiFi",        desc: "High-speed internet throughout the hotel" },
            { Icon: Waves,      title: "Swimming Pool",   desc: "Outdoor pool with ocean views" },
            { Icon: Utensils,   title: "Fine Dining",     desc: "Award-winning restaurant and bar" },
            { Icon: Dumbbell,   title: "Fitness Center",  desc: "24/7 state-of-the-art gym" },
            { Icon: Coffee,     title: "Room Service",    desc: "24-hour in-room dining" },
            { Icon: Car,        title: "Valet Parking",   desc: "Complimentary parking service" },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center p-3">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   ROOMS SECTION
   ------------------------------------------------- */
function HotelAndingRooms({
  scrolltoref,
  Bookingref,
}: {
  scrolltoref: (ref: React.RefObject<HTMLDivElement | null>) => void;
  Bookingref: React.RefObject<HTMLDivElement | null>;
}) {
  const rooms = [
    { img: HotellandingRoom1, name: "Deluxe Suite",       guests: 2, size: 45, price: 10000, rating: 4.9 },
    { img: HotellandingRoom2, name: "Ocean View Suite",   guests: 3, size: 60, price: 15000, rating: 5   },
    { img: HotellandingRoom3, name: "Presidential Suite", guests: 4, size: 95, price: 30000, rating: 5   },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Rooms & Suites</h2>
        <p className="text-gray-600 mb-12">Luxurious accommodations designed for your comfort and relaxation</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image src={room.img} alt={room.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{room.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-left mb-3">{room.name}</h3>
                <p className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {room.guests} guests</span>
                  <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {room.size} m²</span>
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-xl font-bold text-blue-600 flex items-center">
                      <IndianRupee className="w-5 h-5" />{room.price.toLocaleString()}
                      <span className="text-sm text-gray-500 ml-1">/night</span>
                    </p>
                  </div>
                  <button
                    onClick={() => scrolltoref(Bookingref)}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   BOOKING SECTION
   ------------------------------------------------- */
function HotelAndingBooking() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Book Your Stay?</h2>
        <p className="text-white mb-12">Choose your dates and let us make your visit unforgettable</p>

        <form className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="checkin" className="block text-left mb-2 font-medium">Check-in Date</label>
              <div className="relative">
                <input type="date" id="checkin" className="w-full p-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="checkout" className="block text-left mb-2 font-medium">Check-out Date</label>
              <div className="relative">
                <input type="date" id="checkout" className="w-full p-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="guests" className="block text-left mb-2 font-medium">Number of Guests</label>
            <select id="guests" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5+ Guests</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}