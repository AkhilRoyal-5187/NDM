"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import elephantImage from "../assests/elephant.png";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 mt-8 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl backdrop-blur-lg transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side */}
            <div className="text-center lg:text-left lg:w-1/2 space-y-6">
              <div className="hover:scale-105 transition-transform duration-300">
                <Image 
                  src={elephantImage} 
                  alt="Elephant" 
                  width={160}
                  height={160}
                  className="w-32 sm:w-40 h-auto mx-auto lg:mx-0 object-contain drop-shadow-xl" 
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 font-inter">
                Welcome to Discount Mithra
              </h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Your Friendly <br /> <span className="text-white">Discount Companion</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-medium">
                Save on Hospitals, Restaurants, Groceries, Travel & More!
              </p>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 lg:w-1/2 p-6 bg-gray-800/50 rounded-xl shadow-inner backdrop-blur-md border border-gray-700">
              {[
                { bgColor: "bg-red-100", iconColor: "text-red-500", label: "Hospital" },
                { bgColor: "bg-orange-100", iconColor: "text-orange-500", label: "Restaurant" },
                { bgColor: "bg-green-100", iconColor: "text-green-500", label: "Groceries" },
                { bgColor: "bg-purple-100", iconColor: "text-purple-500", label: "Gifts" },
                { bgColor: "bg-pink-100", iconColor: "text-pink-500", label: "Salon" },
                { bgColor: "bg-yellow-100", iconColor: "text-yellow-600", label: "Education" },
                { bgColor: "bg-blue-100", iconColor: "text-blue-500", label: "Travel" },
                { bgColor: "bg-indigo-100", iconColor: "text-indigo-500", label: "Entertainment" },
                { bgColor: "bg-teal-100", iconColor: "text-teal-500", label: "Fitness" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} rounded-lg p-4 flex flex-col items-center cursor-pointer shadow-md transition-all duration-300 hover:scale-110`}
                >
                  <div className={`w-10 h-10 ${item.iconColor} flex items-center justify-center`}>
                    <span className="text-2xl">🏥</span>
                  </div>
                  <span className="mt-2 text-sm text-gray-300 font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            About Discount Mithra
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Discount Mithra is your trusted companion for unlocking incredible savings across hospitals, restaurants, travel, and more. Our mission is to make every experience affordable and delightful.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Our Mission', description: 'Empowering users with unbeatable discounts.', icon: '🎯' },
            { title: 'Our Vision', description: 'Making savings accessible to everyone.', icon: '👁️' },
            { title: 'Our Team', description: 'A passionate group dedicated to your savings.', icon: '👥' },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800/50 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/signup"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
