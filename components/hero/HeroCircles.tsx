"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroCircles() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative aspect-square w-full"
      >
        <Image
          src="https://syuddulwqqyuhrcwhqqs.supabase.co/storage/v1/object/sign/photo/Screenshot%202025-05-03%20190858.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzIwM2Y1ZTM1LTY1MGQtNGUwZi1iY2YzLWZlMTQ0NDFjZjE0ZSJ9.eyJ1cmwiOiJwaG90by9TY3JlZW5zaG90IDIwMjUtMDUtMDMgMTkwODU4LnBuZyIsImlhdCI6MTc0NjI3MDc2NSwiZXhwIjoxNzQ2ODc1NTY1fQ.ldQHB-EPXv5-1kRSz10oVEYQUqV45hgqrBupaZY2LCA"
          alt="Üniring Logo"
          fill
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}