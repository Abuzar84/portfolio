'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Mail } from 'lucide-react';
import Facebook from "./Icons/Facebook_Logo_Primary.png";
import Instagram from './Icons/Instagram_Glyph_Gradient.svg';
import GitHub from './Icons/GitHub_Logo.png';
import X from './Icons/logo-black.png';
import Linkedin from "./Icons/LinkedIn.png";
import tailwindcss from './Icons/tailwindcss.svg';
import MySQL from './Icons/MySQL.svg';
import nodejs from './Icons/nodejs.svg';
import react from './Icons/react.svg';
import MyLogo from './AS.webp';
import Hoteltheme from './hotelthemes/Hoteltheme.webp';
import Hotellandpageimage from './hotelthemes/hotellandingpage1.webp';

function Home() {
    // Create References for sections
    const HomeRef = React.useRef<HTMLDivElement>(null);
    const AboutRef = React.useRef<HTMLDivElement>(null);
    const SkillsRef = React.useRef<HTMLDivElement>(null);
    const ContactRef = React.useRef<HTMLDivElement>(null);

    //function for form handle
    // States for form fields (removed title, added email/message)
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Call API route instead of direct Supabase insert
        const response = await fetch('/api/route', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
        });

        if (!response.ok) {
        console.error('Error:', await response.json());
        alert('Failed to send message!');
        } else {
        console.log('Success:', await response.json());
        alert('Message sent successfully!');
        setEmail(''); // Reset form
        setMessage('');
        }

        setLoading(false);
    };

    // Function to scroll to sections
    const scrolltoref = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // State for mobile menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-white text-gray-900 min-h-screen w-screen">
            <header className="border-b-2 border-gray-200 bg-gray-50 fixed w-full z-10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Image src={MyLogo} alt="My Logo" className="w-12" width={48} height={48} />
                        <div>
                            <h1 className="text-lg font-semibold">Abuzar</h1>
                            <p className="text-sm text-gray-500">Wahdatullah Sayyed</p>
                        </div>
                    </div>

                    {/* Desktop Navigation – Added new links */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-5 text-sm text-gray-700">
                            <li className="hover:text-black cursor-pointer" onClick={() => scrolltoref(HomeRef)}>Home</li>
                            <li className="hover:text-black cursor-pointer" onClick={() => scrolltoref(AboutRef)}>About</li>
                            <li className="hover:text-black cursor-pointer" onClick={() => scrolltoref(SkillsRef)}>Skills</li>
                            <li className="hover:text-black cursor-pointer" onClick={() => scrolltoref(ContactRef)}>Contact</li>
                        </ul>
                    </nav>

                    {/* Hamburger Icon for Mobile */}
                    <button 
                        className="md:hidden focus:outline-none" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="border-t-2 w-6 block pb-2"></span>
                        <span className="border-t-2 w-6 block pb-2"></span>
                        <span className="border-t-2 w-6 block pb-2"></span>
                    </button>
                </div>

                {/* Mobile Menu – Added new links */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
                    <ul className="flex flex-col text-sm text-gray-700">
                        <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                            onClick={() => {
                                setIsMenuOpen(false);
                                scrolltoref(HomeRef);
                            }}
                        >
                            Home
                        </li>
                        <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                            onClick={() => {
                                setIsMenuOpen(false);
                                scrolltoref(AboutRef);
                            }}
                        >
                            About
                        </li>
                        <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                            onClick={() => {
                                setIsMenuOpen(false);
                                scrolltoref(SkillsRef);
                            }}
                        >
                            Skills
                        </li>
                        <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                            onClick={() => {
                                setIsMenuOpen(false);
                                scrolltoref(ContactRef);
                            }}
                        >
                            Contact
                        </li>
                    </ul>
                </div>
            </header>
            <main className="pt-20"> {/* Increased padding to account for fixed header */}
                {/* Home Section – Kept as is, but fixed linear class */}
                <section ref={HomeRef} className="bg-linear-to-b from-white via-gray-50 to-gray-100 py-16 text-center">
                    <h2 className="text-4xl sm:text-3xl font-extrabold mb-4">
                        Welcome to My Portfolio
                    </h2>
                    <h3 className="text-3xl sm:text-2xl font-extrabold mb-8">Website Themes</h3>
                    <div className="flex justify-center items-center gap-8 flex-wrap max-w-4xl mx-auto">
                        <div className="flex flex-col items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <Link href="/hoteltheme">
                                <Image
                                    src={Hoteltheme}
                                    alt="Hotel theme thumbnail"
                                    title="My Hotel Theme"
                                    className="w-64 h-40 object-cover"
                                    width={256}
                                    height={160}
                                />
                            </Link>
                            <p className="py-2 text-gray-700">Hotel Theme</p>
                        </div>
                        <div className="flex flex-col items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <Link href="/hotellandingpage">
                                <Image
                                    src={Hotellandpageimage}
                                    alt="Hotel landing page thumbnail"
                                    title="My Hotel Landing Page"
                                    className="w-64 h-40 object-cover"
                                    width={256}
                                    height={160}
                                />
                            </Link>
                            <p className="py-2 text-gray-700">Hotel Landing Page</p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section ref={AboutRef} className="py-16 bg-white text-center">
                    <h2 className="text-4xl sm:text-3xl font-extrabold mb-4">
                        Hi, I&apos;m Abuzar Wahdatullah Sayyed
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                        I&apos;m a web developer focused on building accessible, responsive, and
                        performant websites. I enjoy turning ideas into real products — from
                        simple landing pages to full-stack applications.
                    </p>
                </section>

                {/* New: Skills Section */}
                <section ref={SkillsRef} className="py-16 bg-gray-50 text-center">
                    <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
                    <div className="flex justify-center items-center flex-wrap gap-5 max-w-4xl mx-auto">
                        {/* Example skills – replace icons with Lucide or SVGs */}
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <Image src={react} alt="React Logo" width={48} height={48} className="h-12" />
                            <span className="text-sm font-semibold">React</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <Image src={tailwindcss} alt="Tailwind css Logo" width={60} height={24} className="pb-4" />
                            <span className="text-sm font-semibold">Tailwind CSS</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <Image src={nodejs} alt="Node JS Logo" width={60} height={24} className="mb-2" />
                            <span className="text-sm font-semibold">Node.js</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <span className="text-4xl mb-2">
                                <Image src={MySQL} alt="MySQL Logo" width={40} height={40} />
                            </span> {/* Mysql */}
                            <span className="text-sm font-semibold">MySQL</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <span className="text-4xl mb-2">📱</span> {/* Responsive Design */}
                            <span className="text-sm font-semibold">Responsive Design</span>
                        </div>
                        {/* Add more as needed */}
                    </div>
                </section>
                {/* Contact Section – Expanded with Form */}
                <section ref={ContactRef} className="py-16 bg-linear-to-b from-gray-100 to-gray-200 text-center">
                    <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mb-8">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Your Email" 
                            value={email} // Bind state
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded bg-white border border-gray-300 focus:border-blue-600 outline-none"
                            required
                        />
                        <textarea 
                            name="message"
                            placeholder="Your Message" 
                            className="w-full p-3 rounded bg-white border border-gray-300 focus:border-blue-600 outline-none h-32"
                            value={message} // Bind state
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition cursor-pointer"
                            disabled={loading} // Disable while loading
                        >
                            Send Message
                        </button>
                        <div></div>
                    </form>
                    {/* Social Links (Moved from Footer) */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
                        <a href="https://github.com/Abuzar84" aria-label="GitHub" className="hover:text-black">
                            <Image src={GitHub} alt="GitHub Logo" width={60}/>
                        </a>
                        <a href="https://www.linkedin.com/in/sayyed-abuzar-6ba990279/" aria-label="LinkedIn">
                            <Image src={Linkedin} alt="LinkedIn Logo" width={32}/>
                        </a>
                        <a href="mailto:sayyedabuzar021@gmail.com" className="bg-blue-600 p-1 rounded-full">
                            <Mail className="text-white" />
                        </a>
                        <a href="https://www.facebook.com/sayyed.abuzar.941349">
                            <Image src={Facebook} alt="Facebook Logo" width={36}  />
                        </a>
                        <a href="https://www.instagram.com/sayyedabuzar844/" className="bg-white rounded-2xl border p-1">
                            <Image src={Instagram} alt="Instagram Logo" width={32} />
                        </a>
                        <a href="https://x.com/SayyedAbuz46392">
                            <Image src={X} alt="X Logo" width={32}  />
                        </a>
                    </div>
                    
                </section>
            </main> 
            <footer className="py-4 bg-gray-800 text-white text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Abuzar Wahdatullah Sayyed. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home; 