import Hoteltheme from '../hotelthemes/Hoteltheme.webp';
import Hotellandpageimage from '../hotelthemes/hotellandingpage1.webp';
import EcommercePreview from '../ecommerce/ecommerce-preview.webp';

import Facebook from "../Icons/Facebook_Logo_Primary.png";
import Instagram from '../Icons/Instagram_Glyph_Gradient.svg';
import GitHub from '../Icons/GitHub_Logo.png';
import X from '../Icons/logo-black.png';
import Linkedin from "../Icons/LinkedIn.png";

import tailwindcss from '../Icons/tailwindcss.svg';
import MySQL from '../Icons/MySQL.svg';
import nodejs from '../Icons/nodejs.svg';
import react from '../Icons/react.svg';
import NextJS from '../Icons/next.svg';

export const projects = [
  {
    id: 1,
    title: "Hotel Theme",
    image: Hoteltheme,
    link: "/hoteltheme",
  },
  {
    id: 2,
    title: "Hotel Landing Page",
    image: Hotellandpageimage,
    link: "/hotellandingpage",
  },
  {
    id: 3,
    title: "E-Commerce Store",
    image: EcommercePreview,
    link: "/ecommerce",
  },
];

export const skills = [
  {
    id: 1,
    name: "React",
    image: react,
    width: 48,
    height: 48,
    className: "h-12",
  },
  {
    id: 2,
    name: "Tailwind CSS",
    image: tailwindcss,
    width: 60,
    height: 24,
    className: "pb-4",
  },
  {
    id: 3,
    name: "Node.js",
    image: nodejs,
    width: 60,
    height: 24,
    className: "mb-2",
  },
  {
    id: 4,
    name: "MySQL",
    image: MySQL,
    width: 40,
    height: 40,
    className: "",
  },
  {
    id: 5,
    name: "Next Js",
    image: NextJS,
    width: 80,
    height: 80, // Approximate, was just width 80 in original
    className: "",
  },
  {
    id: 6,
    name: "Responsive Design",
    icon: "📱",
    className: "text-4xl mb-2",
  },
];

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    link: "https://github.com/Abuzar84",
    image: GitHub,
    width: 60,
  },
  {
    id: 2,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sayyed-abuzar-6ba990279/",
    image: Linkedin,
    width: 32,
  },
  {
    id: 3,
    name: "Email",
    link: "mailto:sayyedabuzar021@gmail.com",
    icon: "Mail", // Special case for Lucide icon
    className: "bg-blue-600 p-1 rounded-full text-white",
  },
  {
    id: 4,
    name: "Facebook",
    link: "https://www.facebook.com/sayyed.abuzar.941349",
    image: Facebook,
    width: 36,
  },
  {
    id: 5,
    name: "Instagram",
    link: "https://www.instagram.com/sayyedabuzar844/",
    image: Instagram,
    width: 32,
    className: "bg-white rounded-2xl border p-1",
  },
  {
    id: 6,
    name: "X",
    link: "https://x.com/SayyedAbuz46392",
    image: X,
    width: 32,
  },
];
