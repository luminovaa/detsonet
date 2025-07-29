'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "/problem/wifi.png", // Replace with your actual icon path
    title: "Kuota Sering Habis",
    description:
      "Sering mengalami kuota internet yang cepat habis? Kami punya solusinya dengan paket unlimited yang stabil.",
  },
  {
    icon: "/problem/dollar.png", // Replace with your actual icon path
    title: "Biaya Internet Mahal",
    description:
      "Sering merasa bahwa biaya internet yang Anda bayar terlalu mahal? Kami memiliki paket yang lebih sesuai untuk Anda.",
  },
  {
    icon: "/problem/radio-tower.png", // Replace with your actual icon path
    title: "Butuh Koneksi Stabil",
    description:
      "Sering mengalami koneksi internet yang tidak stabil? Kami siap membantu Anda dengan fiber optic berkualitas tinggi.",
  },
  {
    icon: "/problem/24-hours-support.png", // Replace with your actual icon path
    title: "Membutuhkan Pelayanan Terbaik",
    description:
      "Sering mengalami kesulitan dalam mendapatkan pelayanan pelanggan yang responsif? Kami siap membantu Anda 24/7.",
  },
];

export const BenefitsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Stagger the animation of benefit items
    const itemTimers = benefitList.map((_, index) => 
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
    <section id="benefits" className="container py-24 sm:py-32 overflow-hidden">
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
            className={`text-xl md:text-3xl lg:text-4xl font-bold mb-6 transform transition-all duration-700 delay-200 ${
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
            className={`text-base text-muted-foreground leading-relaxed transform transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Kebanyakan orang mengalami kendala ini dalam kehidupan digital mereka. 
            Mari kita selesaikan bersama dengan solusi yang tepat.
          </p>
        </div>

        {/* Right Column - Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefitList.map(({ icon, title, description }, index) => (
            <div
              key={title}
              className={`group relative transform transition-all duration-700 ${
                visibleItems[index] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl transform transition-all duration-300 group-hover:scale-105 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10"></div>

              {/* Border Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px] transform transition-all duration-300 group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40">
                <div className="h-full w-full rounded-3xl bg-background"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                      <Image
                        src={icon}
                        alt={title}
                        width={32}
                        height={32}
                        className="w-8 h-8 filter brightness-0 saturate-100 invert-0 dark:invert"
                      />
                    </div>
                  </div>
                  
                  {/* Floating number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold transform transition-all duration-300 group-hover:scale-110">
                    {index + 1}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow group-hover:text-foreground/80 transition-colors duration-300">
                  {description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};