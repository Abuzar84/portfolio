import React, { useState } from 'react';
import Image from 'next/image';
import MyLogo from '../app/AS.webp';

interface HeaderProps {
    onNavigate: (section: 'Home' | 'About' | 'Skills' | 'Contact') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (section: 'Home' | 'About' | 'Skills' | 'Contact') => {
        setIsMenuOpen(false);
        onNavigate(section);
    };

    return (
        <header className="border-b-2 border-gray-200 bg-gray-50 fixed w-full z-10">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <Image src={MyLogo} alt="My Logo" className="w-12" width={48} height={48} />
                    <div>
                        <h1 className="text-lg font-semibold">Abuzar</h1>
                        <p className="text-sm text-gray-500">Wahdatullah Sayyed</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex gap-5 text-sm text-gray-700">
                        {['Home', 'About', 'Skills', 'Contact'].map((item) => (
                            <li
                                key={item}
                                className="hover:text-black cursor-pointer"
                                onClick={() => handleNavClick(item as any)}
                            >
                                {item}
                            </li>
                        ))}
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

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
                <ul className="flex flex-col text-sm text-gray-700">
                    {['Home', 'About', 'Skills', 'Contact'].map((item) => (
                        <li
                            key={item}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavClick(item as any)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;
