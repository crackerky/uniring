"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const newsItems = [
  {
    date: "2025年4月27日",
    title: "学生団体Youth Inyersection主催高校生・大学生向け交流会登壇",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    link: "/news"
  },
  {
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
    link: "/news"
  },
  {
    date: "2025年3月30日",
    title: "第二回ワークショップ開催・TSGプロジェクトフェア参加",
    image: "https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg",
    link: "/news"
  }
];

export function News() {
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
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">お知らせ</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.link}
                className="block bg-card hover:bg-muted/50 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-muted-foreground block mb-2">
                    {item.date}
                  </time>
                  <p className="text-foreground line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <Link 
              href="/news"
              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
            >
              すべてのお知らせを見る
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}