import React, { useRef, useEffect, useState } from 'react';

export default function DownloadCardPage() {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  const handleDownload = () => alert('Download initiated!');
  const handleShare = () => alert('Share functionality coming soon!');
  const handleMoreInfo = () => alert('More info about the card.');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div
        ref={cardRef}
        className={`max-w-3xl w-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg transition-all duration-700 ease-out transform
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Main Card Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/3 p-6 bg-gradient-to-b from-blue-500 to-blue-400 dark:from-blue-900 dark:to-blue-700 text-white text-center flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">Your Subscription</h3>
            <p className="text-sm">Valid until <strong>December 2025</strong></p>
          </div>

          {/* Right Section */}
          <div className="md:w-2/3 p-4 bg-white dark:bg-gray-800">
            <img
              src="https://placehold.co/600x240?text=Download+Image"
              alt="Card"
              className="w-full h-40 object-cover rounded-md mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x200/cccccc/000000?text=Image+Not+Found';
              }}
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Download Membership Card</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This card confirms your premium membership. Save or share this for your records.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 px-4 py-4 bg-gray-50 dark:bg-gray-700">
          <small className="text-xs text-gray-500 dark:text-gray-400">* Terms apply. Card is non-transferable.</small>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Download
            </button>
            <button
              onClick={handleShare}
              className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md transition"
            >
              Share
            </button>
            <button
              onClick={handleMoreInfo}
              className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md transition"
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
