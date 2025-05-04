"use client";

import { motion } from "framer-motion";

const harassmentExamples = [
  {
    title: "パワーハラスメント",
    description: "優位性を利用し、暴力や暴言など相手に肉体的または精神的苦痛を与える行為",
  },
  {
    title: "スクールハラスメント",
    description: "学校においていて相手の尊厳を傷つけたり、不快感を与えたりする言動や行為",
  },
  {
    title: "ハラスメントハラスメント",
    description: "正当な指導や注意に対して「ハラスメントだ」と過剰に主張する行為",
  },
];

export function Awareness() {
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
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            ハラスメントは "70種類以上" もある
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16"
          >
            私たちの日常に潜む、さまざまな形のハラスメント
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {harassmentExamples.map((example, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg shadow-sm border h-full flex flex-col"
              >
                <h3 className="font-bold text-lg mb-3 text-primary">
                  {example.title}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {example.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            variants={itemVariants}
            className="mt-12 text-center text-muted-foreground"
          >
            これらは、70種類以上あるハラスメントのほんの一例です。
            <br />
            誰もが加害者にも被害者にもなり得る可能性があります。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}