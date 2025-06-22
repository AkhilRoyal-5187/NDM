"use client";
import { useRouter } from 'next/navigation';

const LocationsPage = () => {
  const router = useRouter();

  const handleSiricillaClick = () => {
    router.push('/services');
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Our Services Available in the Following Locations</h1>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSiricillaClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-64"
        >
          Siricilla
        </button>

        <div className="bg-gray-700 text-gray-400 px-6 py-3 rounded-xl w-64 cursor-not-allowed">
          Karimnagar - Coming Soon
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;