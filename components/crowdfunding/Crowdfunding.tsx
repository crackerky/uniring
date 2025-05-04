"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function Crowdfunding() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetAmount = 313500;

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const increment = targetAmount / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        if (currentStep < steps) {
          setCount(Math.min(Math.round(increment * (currentStep + 1)), targetAmount));
          currentStep++;
        } else {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView]);

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
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            クラウドファンディング達成
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-bold">
                  ¥{count.toLocaleString()}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "104%" } : { width: "0%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-muted-foreground">
                  目標金額の104%達成
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <span className="text-xl font-bold">24</span>
                  </div>
                  <p className="text-muted-foreground">支援者数</p>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  "高校生の皆さんの想いに共感しました。これからの活動を応援しています！"
                </blockquote>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative aspect-[4/3]"
            >
              <Image
                src="https://images.pexels.com/photos/7376/startup-photos.jpg"
                alt="クラウドファンディングの成功"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}