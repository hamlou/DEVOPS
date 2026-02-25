import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NavItem = ({ label }) => {
    // Split label into unique characters for staggered animation
    // Each span gets a CSS variable --index for the delay calculation
    const letters = label.split('').map((char, index) => (
        <span key={index} style={{ '--index': index }}>
            {char === ' ' ? ' ' : char}
        </span>
    ));

    // Map labels to section IDs
    const sectionMap = {
        'Home': 'home',
        'Top Fighters': 'top-fighters',
        'Events': 'events',
        'About': 'about',
        'Contact': 'contact'
    };

    const sectionId = sectionMap[label] || label.toLowerCase().replace(/\s+/g, '-');

    const handleClick = (e) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a href={`#${sectionId}`} className="nav-item" onClick={handleClick}>
            <span className="nav-text-glitch" data-text={label}>
                {letters}
            </span>
        </a>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = ['Home', 'Top Fighters', 'Events', 'About', 'Contact'];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* DESKTOP MENU */}
                <div className="nav-menu desktop">
                    {menuItems.map((item) => (
                        <NavItem key={item} label={item} />
                    ))}
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* MOBILE MENU */}
                <div className={`nav-menu mobile ${mobileMenuOpen ? 'open' : ''}`}>
                    {menuItems.map((item) => (
                        <div key={item} onClick={() => setMobileMenuOpen(false)}>
                            <NavItem label={item} />
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
