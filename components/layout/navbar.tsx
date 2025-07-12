"use client";
import { ChevronsDown, Github, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <nav className="bg-opacity-15 w-[90%] md:w-full h-16 mx-auto sticky border-b-2 border-secondary z-40 flex justify-between items-center p-2 bg-card md:px-80 ">
      {/* Logo - Positioned on the left but with better spacing */}
      <Link href="/" className="font-bold text-lg flex items-center ml-4 hover:opacity-80 transition-opacity duration-200">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Shadcn
      </Link>

      {/* Desktop Menu - Moved to the right */}
      <div className="hidden md:flex items-center right-0 gap-4 mr-4">
        <nav className="flex items-center gap-6">
          {routeList.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
            >
              {label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 ml-4">
          <ToggleTheme />
        </div>
      </div>
      {/* Mobile Menu - Positioned on the right */}
      <div className="flex items-center lg:hidden mr-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden hover:text-primary transition-colors duration-200"
            />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col justify-between rounded-tl-2xl rounded-bl-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    Shadcn
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base hover:bg-muted hover:text-primary transition-all duration-200"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};