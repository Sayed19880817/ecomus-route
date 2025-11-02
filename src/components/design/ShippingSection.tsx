import React, { ReactNode } from "react";

interface ShippingFeature {
  title: string;
  description: string;
  icon: ReactNode;
}

const ShippingSection: React.FC = () => {
  const features: ShippingFeature[] = [
    {
      title: "Free Shipping",
      description: "Free shipping on orders over 180 EGP",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="z-10 text-gray-700 dark:text-gray-200 relative"
        >
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
          <path d="M12 22V12"></path>
          <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
          <path d="m7.5 4.27 9 5.15"></path>
        </svg>
      ),
    },
    {
      title: "Flexible Payment",
      description: "Multiple secure payment options",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 text-gray-700 dark:text-gray-200"
        >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      description: "We're here for you all week long",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 text-gray-700 dark:text-gray-200"
        >
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-6 px-4 md:px-0 container">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-background rounded-lg p-6 shadow-[-2px_-2px_3px_#09ca] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[2px_2px_3px_#09ca]"
            >
              <div className="text-4xl mb-4 relative">
                <span className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-300"></span>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingSection;
