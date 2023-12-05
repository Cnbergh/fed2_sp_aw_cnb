"use client"

import { useState } from "react";

const listings = [
  { id: 1, name: 'Philips Hue' },
  { id: 2, name: 'Samsung tlf' },
]; // ... andre listings, kun for oppsett må endre når api er fikset

const navItems = ['Home', 'Profile', 'Contact'];

export default function App() {
const [activeNav, setActiveNav] = useState(navItems[0]);
  return (
    <main className="container mx-auto flex border">
      <section className="flex-grow border">
        {listings.map((listing, index) => (
          <div key={index} className={`${activeNav === 'Home' ? 'block' : 'hidden'}`}>
            {/* Dette er hvor du ville lagt inn logikk for å vise din listing detaljert */}
            <p>{listing.name}</p>
          </div>
        ))}
        {/* Her kan du legge til innhold for Profile og Contact som skal vises basert på activeNav */}
        <div className={`${activeNav === 'Profile' ? 'block' : 'hidden'}`}>
          {/* Innhold for About */}
        </div>
        <div className={`${activeNav === 'Contact' ? 'block' : 'hidden'}`}>
          {/* Innhold for Contact */}
        </div>
      </section>
      <div className="w-48 border">
        <nav>
          {navItems.map((item, index) => (
            <p
              key={index}
              className={`cursor-pointer ${activeNav === item ? 'text-orange-500' : 'text-black'}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </p>
          ))}
        </nav>
      </div>
    </main>
  );
};