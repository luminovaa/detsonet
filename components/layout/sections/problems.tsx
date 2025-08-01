'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProblemsProps {
  icon: string;
  title: string;
}

const problemList: ProblemsProps[] = [
  {
    icon: "/problem/wifi.png",
    title: "Kuota Sering Habis",
  },
  {
    icon: "/problem/dollar.png",
    title: "Biaya Internet Mahal",
  },
  {
    icon: "/problem/radio-tower.png",
    title: "Butuh Koneksi Stabil",
  },
  {
    icon: "/problem/24-hours-support.png",
    title: "Membutuhkan Pelayanan Terbaik",
  },
];

export const ProblemsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Stagger the animation of problem items
    const itemTimers = problemList.map((_, index) => 
      setTimeout(() => {
        setVisibleItems(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, 300 + index * 150)
    );

    return () => {
      clearTimeout(timer);
      itemTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section 
      id="problems" 
      className="w-full h-[50vh] flex items-center justify-center bg-black dark:bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Title Section */}
        <div className="text-left">
          <div 
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-lg font-semibold mb-2 tracking-wider">
              Permasalahan Umum
            </span>
          </div>
          
          <h2 
            className={`text-xl md:text-3xl lg:text-4xl font-bold mb-6 text-white dark:text-black transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Pernahkah Anda Mengalami{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
              Masalah
            </span>{" "}
            Seperti Ini?
          </h2>
          
          <p 
            className={`text-base text-gray-300 dark:text-gray-700 leading-relaxed transform transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Kebanyakan orang mengalami kendala ini dalam kehidupan digital mereka. 
          
          </p>
        </div>

        {/* Right Column - Grid 2x2 Items */}
        <div className="grid grid-cols-2 gap-6">
          {problemList.map(({ icon, title }, index) => (
            <div
              key={title}
              className={`group flex items-center transform transition-all duration-700 ${
                visibleItems[index] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 mr-4 transform transition-all duration-300 group-hover:scale-110">
                <div className="w-full h-full rounded-xl bg-white dark:bg-black flex items-center justify-center">
                  <Image
                    src={icon}
                    alt={title}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-white dark:text-black">
                {title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};