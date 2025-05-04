"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.95)"]
  );
  
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ["rgb(26, 26, 26)", "rgb(26, 26, 26)"]
  );

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", updateScrolled);
    updateScrolled();
    
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.header
      style={{ backgroundColor }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-bold text-xl md:text-2xl"
          >
            <motion.span style={{ color: textColor }}>
              {siteConfig.name}
            </motion.span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {siteConfig.mainNav.map((item) => (
              <motion.div key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <motion.span style={{ color: textColor }}>
                    {item.title}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            <motion.div>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-brand-pink text-white hover:bg-brand-pink/90"
                asChild
              >
                <Link href="/contact">お問い合わせ</Link>
              </Button>
            </motion.div>
          </nav>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Menu"
                >
                  <motion.div style={{ color: textColor }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {siteConfig.mainNav.map((item) => (
                    <Button 
                      key={item.href} 
                      variant="ghost" 
                      asChild 
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                  <Button 
                    variant="default"
                    className="bg-brand-pink text-white hover:bg-brand-pink/90"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href="/contact">お問い合わせ</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}