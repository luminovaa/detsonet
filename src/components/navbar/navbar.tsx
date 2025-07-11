"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with hover effect */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl transition-all duration-300 group-hover:scale-105">
                Company
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (Right-aligned) */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium transition-all duration-300 hover:scale-105 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Underline effect */}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Link href="/quote">Get Quote</Link>
              </Button>
              <Button 
                size="sm" 
                asChild 
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button with hover effect */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden transition-all duration-300 hover:scale-110 hover:bg-accent"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                  <SheetDescription className="text-left">
                    Browse through our pages and services
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {/* Mobile underline effect */}
                      <span className="absolute left-3 bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full transition-all duration-300 hover:scale-105 hover:shadow-md" 
                      asChild
                    >
                      <Link href="/quote" onClick={() => setIsOpen(false)}>
                        Get Quote
                      </Link>
                    </Button>
                    <Button 
                      className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                      asChild
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}