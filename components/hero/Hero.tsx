"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
            variants={fadeIn}
          >
            加害者も被害者も
          </motion.h1>
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 tracking-tight"
            variants={fadeIn}
          >
            つくらない社会を目指して
          </motion.h1>
          
          <motion.div
            variants={fadeIn}
            className="inline-block"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-lg hover:bg-black/90 transition-colors"
            >
              TeaRoomについて
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}