"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  image: string;
  content: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: "2025年4月27日",
    title: "学生団体Youth Inyersection主催高校生・大学生向け交流会登壇",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    content: "Youth Inyersection主催の交流会に登壇し、ハラスメント未然防止の重要性について講演を行いました。多くの高校生・大学生と意見交換を行い、有意義な時間となりました。"
  },
  {
    id: 2,
    date: "2025年4月20日",
    title: "朝日新聞社中高生新聞掲載",
    image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
    content: "朝日新聞社中高生新聞に、私たちの活動が掲載されました。高校生による未然防止教育の取り組みとして、大きな反響をいただいています。"
  },
  {
    id: 3,
    date: "2025年3月30日",
    title: "第二回ワークショップ開催・TSGプロジェクトフェア参加",
    image: "https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg",
    content: "第二回ワークショップを開催し、31名の方にご参加いただきました。また、TSGプロジェクトフェアにも参加し、多くの方に活動を知っていただく機会となりました。"
  },
  {
    id: 4,
    date: "2025年3月24日",
    title: "クラウドファンディング目標達成",
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg",
    content: "クラウドファンディングが目標金額を達成しました。24名の支援者の方々からご支援いただき、目標金額の104%を達成することができました。"
  },
  {
    id: 5,
    date: "2025年2月22日",
    title: "マイプロジェクトアワード地域summit advanced出場",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    content: "「ハラスメントのメタ認知」をテーマに、マイプロジェクトアワード地域summit advancedに出場しました。"
  },
  {
    id: 6,
    date: "2025年2月14日",
    title: "マイプロジェクトアワード特別賞受賞",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg",
    content: "「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」というテーマで発表を行い、マイプロジェクトアワードで特別賞を受賞しました。"
  }
];

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            お知らせ
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newsArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="bg-card rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-muted-foreground block mb-2">
                    {article.date}
                  </time>
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {article.title}
                  </h2>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedArticle?.title}
            </DialogTitle>
            <time className="text-sm text-muted-foreground block mt-2">
              {selectedArticle?.date}
            </time>
          </DialogHeader>
          <div className="relative h-64 my-4">
            {selectedArticle && (
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {selectedArticle?.content}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}