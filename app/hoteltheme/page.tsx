'use client';
import React from 'react';
import Image from 'next/image';
import bgimage from '../hotelthemes/backgroundHotel.webp';
import Contactform from './contactform';
import Bookingform from './bookingform'

const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
};

// Layout component with navigation
function Hoteltheme() {
  const homeRef = React.useRef<HTMLDivElement>(null);
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);
  const bookingRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => scrollToSection(homeRef)} className="text-2xl font-bold text-left">
            Luxury Stay
          </button>
          <div className="flex gap-6">
            <button onClick={() => scrollToSection(homeRef)} className="hover:text-gray-300 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-gray-300 transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection(bookingRef)} className="hover:text-gray-300 transition-colors cursor-pointer">
              Book Now
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-gray-300 transition-colors cursor-pointer">
              Contact
            </button>
          </div>
        </nav>
      </header>

      <main className="grow">
        <HotelHome homeRef={homeRef} featuresRef={featuresRef} bookingRef={bookingRef} />
        <HotelBooking bookingRef={bookingRef} />
        <HotelAbout aboutRef={aboutRef} />
        
        <HotelContact contactRef={contactRef} />

      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Luxury Stay</h3>
              <p className="text-gray-300">Experience luxury and comfort</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection(homeRef)} className="text-gray-300 hover:text-white cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(aboutRef)} className="text-gray-300 hover:text-white cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(bookingRef)} className="text-gray-300 hover:text-white cursor-pointer">
                    Booking
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(contactRef)} className="text-gray-300 hover:text-white cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="text-gray-300 space-y-2">
                <li>123 Hotel Street</li>
                <li>City, State 12345</li>
                <li>Phone: +91 12345 67890</li>
                <li>Email: info@luxurystay.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
interface HotelHomeProps {
  homeRef: React.RefObject<HTMLDivElement | null>;
  featuresRef: React.RefObject<HTMLDivElement | null>;
  bookingRef: React.RefObject<HTMLDivElement | null>;
}

function HotelHome({ homeRef, featuresRef, bookingRef }: HotelHomeProps) {
  return (
    <div>
      {/* Hero Section */}
      <div
        ref={homeRef}
        className="relative flex justify-center items-center bg-cover bg-center bg-no-repeat h-[80vh]"
      >
        <Image src={bgimage} alt="Hotel theme" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Luxury Stay</h2>
          <p className="text-xl md:text-2xl mb-8">Experience luxury and comfort</p>
          <button
            onClick={() => scrollToSection(bookingRef)}
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Rooms</h3>
              <p className="text-gray-600">Experience comfort in our carefully designed rooms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock support for your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-600">Situated in the heart of the city</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// About Page Component
function HotelAbout({ aboutRef }: { aboutRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={aboutRef} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Luxury Stay</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 mb-8 leading-relaxed">
            Welcome to Luxury Stay, where elegance meets comfort. Since our establishment in 2010, we have been
            dedicated to providing our guests with an unforgettable luxury experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional hospitality services that exceed our guests&apos; expectations while
                maintaining the highest standards of luxury and comfort.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading luxury hotel, recognized for our outstanding service, innovative amenities, and
                commitment to guest satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Page Component
function HotelContact({ contactRef }: { contactRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={contactRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
              <Contactform />
          </div>
        </div>
      </div>
    </div>
  );
}

// Booking Section
function HotelBooking({ bookingRef }: { bookingRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={bookingRef}
      className="bg-cover bg-center bg-no-repeat h-[80vh] flex justify-center items-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Book Your Stay</h2>
        <Bookingform />
      </div>
    </div>
  );
}

export default Hoteltheme;