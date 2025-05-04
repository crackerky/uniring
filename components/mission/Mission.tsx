"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "自他尊重",
    description: "すべての人が安心して生活できる環境を目指します",
    color: "bg-brand-pink",
    iconColor: "#FFBFC7"
  },
  {
    icon: Shield,
    title: "未然防止",
    description: "問題が表面化する前に解決する意識を育成します",
    color: "bg-brand-blue",
    iconColor: "#B5DCFF"
  },
  {
    icon: Users,
    title: "探究心",
    description: "身近な気づきをきっかけに、自分らしいキャリアの一歩を支えます",
    color: "bg-brand-cream",
    iconColor: "#FFF7D6"
  },
];

export function Mission() {
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
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
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
            Mission&Value
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            私たちは、被害者にも加害者にもならないための教育を目指します
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`${value.color} w-24 h-24 rounded-full flex items-center justify-center mb-6`}
                >
                  <value.icon 
                    size={40} 
                    color={value.iconColor}
                    strokeWidth={2.5}
                  />
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground flex-grow">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-xl font-semibold text-primary">
              誰もが感情を大切にしながらハラスメントと向き合い
              <br />
              自分も相手も大切にできる社会へ
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}