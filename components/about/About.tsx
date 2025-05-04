"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            私たちについて
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg"
                alt="高校生による活動の様子"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">
                学生による、"新しい"
                <br />
                ハラスメント未然防止教育
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                私たちは、学生の視点からハラスメント問題に取り組み、
                未然防止のための教育プログラムを提供しています。
                私たちの経験を生かし、現代のハラスメントの在り方を改革します。
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  asChild
                  className="inline-flex items-center"
                >
                  <Link href="/about">
                    <Info className="mr-2 h-4 w-4" />
                    創設原点を見る
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="inline-flex items-center"
                >
                  <Link href="/about">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    これまでの歩み
                  </Link>
                </Button>
              </div>
              <Button
                variant="outline"
                asChild
                className="inline-flex items-center"
              >
                <Link href="/about">
                  <Info className="mr-2 h-4 w-4" />
                  団体概要を見る
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}