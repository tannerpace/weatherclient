'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaMinus } from "react-icons/fa";

import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About Us", href: "/about" },
  { text: "Contact", href: "/contact" },
  { text: "Services", href: "/ourservices" },
  { text: "Portfolio", href: "/portfolio" },
  { text: "Scheduling", href: "/timetable " }
];

const Navbar = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(-1);
  return (
    <header>
      <nav className={"nav"}>
        <Link href={"/"}>
          <Image
            src="/images/airlogo.webp"
            alt="AirAutonomo Logo"
            width={100}
            height={100}
            aria-label="AirAutonomo Logo"
          />
        </Link>

        <div onClick={() => setExpanded(!expanded)} className={"nav__menu-bar"}>
          {!expanded ? <FaBars /> : <FaMinus />}
        </div>
        <div
          className={`${expanded ? "custom-btn active" : "custom-btn inactive"
            } nav__menu-list`}
        >
          {MENU_LIST.map((menu, i) => (
            <div
              onClick={() => {
                setSelectedLinkIndex(i)
                setExpanded(false)
              }}
              key={menu.text}
            >
              <NavItem active={selectedLinkIndex === i} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
};

export default Navbar;