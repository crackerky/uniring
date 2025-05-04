"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            私たちについて
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">団体概要</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold">団体名</dt>
                  <dd className="text-muted-foreground">Üniring</dd>
                </div>
                <div>
                  <dt className="font-semibold">共同代表</dt>
                  <dd className="text-muted-foreground">寺井葉南・石橋舞優</dd>
                </div>
                <div>
                  <dt className="font-semibold">本社</dt>
                  <dd className="text-muted-foreground">
                    〒110-0005<br />
                    東京都台東区上野3丁目16-2天翔上野末広町ビル702<br />
                    (株)TOKYO EDUCATION LAB内
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">メールアドレス</dt>
                  <dd className="text-muted-foreground">uniring2025@gmail.com</dd>
                </div>
                <div>
                  <dt className="font-semibold">SNS</dt>
                  <dd className="text-muted-foreground">
                    Instagram：uniring_study<br />
                    Facebook：Uniring Study
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}