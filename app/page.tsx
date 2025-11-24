'use client'
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
    // Create References for sections
    const HomeRef = React.useRef<HTMLDivElement>(null);
    const AboutRef = React.useRef<HTMLDivElement>(null);
    const SkillsRef = React.useRef<HTMLDivElement>(null);
    const ContactRef = React.useRef<HTMLDivElement>(null);

    // Function to scroll to sections
    const scrollToSection = (section: 'Home' | 'About' | 'Skills' | 'Contact') => {
        const refs = {
            Home: HomeRef,
            About: AboutRef,
            Skills: SkillsRef,
            Contact: ContactRef,
        };
        refs[section].current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white text-gray-900 min-h-screen w-full">
            <Header onNavigate={scrollToSection} />
            <main className="pt-20">
                <Hero ref={HomeRef} />
                <About ref={AboutRef} />
                <Skills ref={SkillsRef} />
                <Contact ref={ContactRef} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
