"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const timelineEvents = [
  { date: "2023年5月", title: "Üniring結成" },
  { 
    date: "2024年3月", 
    title: "TOKYO EDUCATION LAB主催「起業LAB」最終プレゼンテーション大会最優秀賞受賞",
    highlight: true
  },
  { date: "2025年1月20日", title: "第一回ワークショップ開催" },
  { 
    date: "2025年2月14日", 
    title: "「ハラスメントを楽しく学ぼう〜アカハラはイグハラ〜」「ハラスメントのメタ認知」マイプロジェクトアワード特別賞受賞",
    highlight: true
  },
  { date: "2025年2月14日", title: "クラウドファンディング開始" },
  { date: "2025年2月22日", title: "「ハラスメントのメタ認知」マイプロジェクトアワード地域summit advanced出場" },
  { date: "2025年3月24日", title: "クラウドファンディング目標達成" },
  { date: "2025年3月30日", title: "第二回ワークショップ開催・TSGプロジェクトフェア参加" },
  { 
    date: "2025年4月20日", 
    title: "朝日新聞社中高生新聞掲載",
    highlight: true
  },
  { date: "2025年4月27日", title: "学生団体Youth Inyersection主催高校生・大学生向け交流会登壇" },
  { date: "2025年6月28日", title: "株式会社iGO主催EDUVISON2025登壇" },
];

const teamMembers = [
  {
    name: "寺井葉南",
    role: "共同代表",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    qualifications: [
      "教育学部在学中",
      "教育カウンセラー資格取得",
    ],
    university: "東京学芸大学"
  },
  {
    name: "石橋舞優",
    role: "共同代表",
    image: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg",
    university: "東京大学"
  },
  {
    name: "大塚まさはる",
    role: "共同代表",
    image: "https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg",
    university: "東京大学"
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            実績と代表紹介
          </h2>

          {/* Timeline Section */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div 
              ref={containerRef}
              className="overflow-x-scroll scrollbar-hide relative"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
              <div className="min-w-max pb-8 px-12">
                <div className="flex gap-8 items-stretch">
                  {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0;
                    return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: isEven ? -20 : 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className={`w-80 flex flex-col group ${isEven ? 'mt-0' : 'mt-16'} relative`}
                    >
                      <div className="relative z-10">
                        <div className="w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
                        <div 
                          className={`absolute top-0 left-0 w-4 h-4 rounded-full -translate-y-1.5 
                          ${event.highlight 
                            ? 'bg-primary shadow-lg shadow-primary/20 ring-4 ring-primary/30' 
                            : 'bg-primary/60'
                          }`} 
                        />
                      </div>
                      <div className="mt-6 bg-card p-6 rounded-lg shadow-sm border flex-1 flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                        <time className="text-sm font-semibold text-primary mb-3 block">
                          {event.date}
                        </time>
                        <p className={`flex-1 flex items-center ${event.highlight ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                          {event.title}
                        </p>
                      </div>
                    </motion.div>
                  )})}
                </div>
              </div>
            </div>

            <motion.div 
              className="h-1 bg-primary mt-4 mx-auto"
              style={{ 
                scaleX: scrollXProgress,
                transformOrigin: "left"
              }}
            />
          </div>

          {/* Team Section */}
          <div className="mt-32">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-16">
              代表紹介
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-card p-6 rounded-lg shadow-sm border text-center relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full ring-4 ring-primary/20"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <p className="text-muted-foreground">{member.university}</p>
                    </div>
                    {member.qualifications && (
                      <div className="flex flex-col items-center gap-1">
                        {member.qualifications.map((qual, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <p className="text-muted-foreground">{qual}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}