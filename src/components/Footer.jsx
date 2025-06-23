"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">DiscountMithra</h3>
          <p className="text-sm">
            Your friendly discount companion helping you save on Hospitals, Restaurants, Groceries, Travel & More!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/membership" className="hover:text-blue-400 transition duration-200">
                Membership
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:text-blue-400 transition duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-400 transition duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-blue-400 transition duration-200">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
          <address className="not-italic space-y-2 text-sm">
            <p>7-108, Shanthi Nagar, Sircilla, 505301, Telangana</p>
            <p>Email: admin@discountmithra.com</p>
            <p>Phone: 779966 3223</p>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
        &copy; {currentYear} DiscountMithra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;