"use client";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/images/logo_white.svg";
import footerCurve from "@/assets/images/footer-curve.png";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [currency, setCurrency] = useState<string>("USD");
  // const [ setDirectionOptions] = useState<string[]>([]);

  const pathname = usePathname();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  // const toggleDirectionOption = (option: string) => {
  //   setDirectionOptions((prev) =>
  //     prev.includes(option)
  //       ? prev.filter((item) => item !== option)
  //       : [...prev, option]
  //   );
  // };

  // Social media links data
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com",
    },
  ];

  // Helps links data
  const helpsLinks = [
    { label: "Privacy Policy", href: "javascript:void" },
    { label: "Returns + Exchanges", href: "javascript:void" },
    { label: "Shipping", href: "javascript:void" },
    { label: "Terms & Conditions", href: "javascript:void" },
    { label: "FAQs", href: "javascript:void" },
    { label: "Compare", href: "javascript:void" },
    { label: "My Wishlist", href: "javascript:void" },
  ];

  // About us links
  const aboutUsLinks = [
    { label: "Our Story", href: "javascript:void" },
    { label: "Visit Our Store", href: "javascript:void" },
    { label: "Contact Us", href: "javascript:void" },
    { label: "About Us", href: "javascript:void" },
    { label: "Account", href: "javascript:void" },
  ];

  return (
    <>
      {!pathname.includes("auth") && (
        <footer className="relative container overflow-hidden my-5 bg-gray-800 text-gray-300 border-t border-gray-200 font-albert-sans w-[95%] md:w-full mx-auto rounded-4xl">
          <Image
            className="absolute"
            loading="eager"
            src={footerCurve}
            alt="footer curve"
          />
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-6 py-12">
            {/* Top section with company info and navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-2 mb-12">
              {/* Company info */}
              <div className="col-span-2">
                <Image
                  className="mb-5"
                  src={logo}
                  alt="logo"
                  width={136}
                  height={21}
                />
                <p className="mb-2">Address: Tanta, Egypt</p>
                <Link
                  href={"mailto:ibrahimqutb112@gmail.com"}
                  className="mb-2 block"
                >
                  Email: ibrahimqutb112@gmail.com
                </Link>
                <Link href={"tel:00201098813635"} className="mb-4 block">
                  Phone: +2 (010) 98813635
                </Link>

                {/* Social media links */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        className="rounded-full bg-gray-800 group hover:bg-white w-10 h-10 flex justify-center items-center"
                        asChild
                      >
                        <Link
                          href={social.url}
                          target="_blank"
                          className="transition-colors"
                          aria-label={social.name}
                        >
                          <social.icon className="h-5 w-5 text-white group-hover:text-black" />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Help links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white col-span-1">
                  Help
                </h4>
                <ul className="space-y-2 text-sm">
                  {helpsLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:underline transition-colors flex items-center"
                      >
                        <ChevronRight className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About us links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  About us
                </h4>
                <ul className="space-y-2 text-sm">
                  {aboutUsLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:underline transition-colors flex items-center"
                      >
                        <ChevronRight className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter section */}
              <div className="col-span-2">
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Sign Up for Email
                </h4>
                <p className="mb-4 text-sm">
                  Sign up to get first dibs on new arrivals, sales, exclusive
                  content, events and more!
                </p>
                <form onSubmit={handleSubscribe} className="max-w-md relative">
                  <input
                    type="email"
                    placeholder="Enter email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow w-full pe-24 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                  <Button
                    type="submit"
                    variant={"default"}
                    className="absolute right-0.5 top-0.5 bottom-0.5 px-2 py-2 rounded transition-colors"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>

            {/* Bottom section with language/currency options and copyright */}
            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    aria-label="Select currency"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    aria-label="Select language"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-sm">
                <p>© 2025 Ecomus. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
