"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const SplashScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-black">
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="Valet Chat Logo"
          className="w-60 h-60 mb-6"
        />

        {/* Title */}
        <div className="text-white text-5xl font-bold tracking-wide mb-2">
          Valet Chat
        </div>

        {/* Tagline */}
        <h6 className="text-gray-400 text-lg font-medium text-center">
          Stop searching, start asking
        </h6>
      </div>

      {/* Let's Go Button */}
      <div className="flex items-center justify-center mb-8">
        <button
          onClick={openModal}
          className="w-80 px-8 py-4 bg-black text-white border-2 border-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
        >
          Let&apos;s Go
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-96">
            {/* Close Button (Top-Right) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-gray-400"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-semibold text-white text-center mb-6">
              Sign Up
            </h2>
            <div className="flex flex-col space-y-4">
              {/* Sign Up with Google */}
              <button className="flex items-center justify-start w-full px-8 py-4 bg-black text-white border-2 border-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={24} // Specify width in pixels (based on w-6 = 24px)
                  height={24} // Specify height in pixels (based on h-6 = 24px)
                  className="mr-3" // Retain margin-right from Tailwind
                />
                Continue with Google
              </button>

              {/* Sign Up with Outlook */}
              <button className="flex items-center justify-start w-full px-8 py-4 bg-black text-white border-2 border-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
                <Image
                src="/outlook.svg"
                alt="Outlook"
                width={24} // Specify width in pixels (based on w-6 = 24px)
                height={24} // Specify height in pixels (based on h-6 = 24px)
                className="mr-3" // Retain margin-right from Tailwind
              />
                Continue with Outlook
              </button>

              {/* Sign Up with Yahoo */}
              <button className="flex items-center justify-start w-full px-8 py-4 bg-black text-white border-2 border-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
              <Image
                src="/yahoo.svg"
                alt="Yahoo"
                width={24} // Specify width in pixels (based on w-6 = 24px)
                height={24} // Specify height in pixels (based on h-6 = 24px)
                className="mr-3" // Retain margin-right from Tailwind
              />
                Continue with Yahoo
              </button>
            </div>

            {/* Not Sure Text */}
            <div className="text-center mt-6 text-sm text-gray-400">
              Not sure which account to use?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-blue-400 underline cursor-pointer"
              >
                Tap here
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
