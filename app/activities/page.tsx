"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ActivitiesPage() {
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

  const activities = [
    {
      category: "参加イベント",
      items: [
        "起業LAB最終プレゼンテーション大会",
        "マイプロジェクトアワード2024",
        "Tokyo Startup Gateway 「PROJECTS FAIR」",
      ]
    },
    {
      category: "出演メディア",
      items: [
        "朝日新聞・中高生新聞",
        "東京新聞",
      ]
    },
    {
      category: "実績",
      items: [
        "ワークショップ開催　3回",
        "総参加人数　31名",
        "満足度　☆4.8(96.6%)",
      ]
    }
  ];

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
            活動内容
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <h2 className="text-xl font-bold mb-4">{activity.category}</h2>
                <ul className="space-y-2">
                  {activity.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}