"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const NotFound: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="relative w-full max-w-lg bg-white p-8 rounded-lg shadow-xl z-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Sorry</h1>
        <p className="text-lg text-gray-600 mb-6">
          Below this, there seems to be some kind of error. Please go back to
          the home page and try again. We are sorry for the inconvenience.
        </p>

        {/* Error SVG */}
        <div className="mb-6">
        <Image
            src="/error.svg"
            alt="Error"
            width={500} // Specify the width in pixels (adjust as needed)
            height={300} // Specify the height in pixels (adjust as needed)
            className="mx-auto"
            style={{
                width: "100%", // Adjusts to the container width
                height: "auto", // Maintains aspect ratio
            }}
            />
        </div>

        {/* Go to Home Page Button */}
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 transition ease-in-out duration-300"
        >
          Go to the Home Page
        </button>

        {/* Link to Home (for a backup) */}
        <div className="mt-4">
          <Link href="/" className="text-indigo-600 hover:underline">
            Create your account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
