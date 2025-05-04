"use client";

import { motion } from "framer-motion";
import { Clock, Briefcase, GraduationCap } from "lucide-react";

const services = [
  {
    title: "ライトプラン",
    duration: "60分",
    price: "未定～",
    features: [
      "ハラスメントの基礎知識",
      "グループワーク",
      "質疑応答セッション"
    ],
    icon: Clock,
    color: "bg-brand-pink"
  },
  {
    title: "スタンダードプラン",
    duration: "120分",
    price: "未定～",
    features: [
      "ハラスメントの詳細な理解",
      "ケーススタディ分析",
      "グループディスカッション",
      "アクションプラン作成"
    ],
    icon: Briefcase,
    color: "bg-brand-blue"
  },
  {
    title: "キャリア講演会",
    duration: "要相談",
    price: "未定～",
    features: [
      "経験者の体験談",
      "予防と対策の実践的アドバイス",
      "質疑応答セッション",
      "フォローアップ資料",
      "内容のカスタマイズ可能"
    ],
    icon: GraduationCap,
    color: "bg-brand-cream"
  }
];

export function Services() {
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
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            提供メニュー
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            目的や規模に合わせて最適なプランをお選びいただけます
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.duration}</p>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold">¥{service.price}</span>
                </div>

                <ul className="space-y-3 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={itemVariants}
            className="text-sm text-muted-foreground text-center mt-12"
          >
            ※ 料金は税抜価格です。交通費は別途必要となります。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}