"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Origin() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            創設原点
          </motion.h2>

          {/* First Story */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <motion.div variants={slideInLeft} className="relative aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg"
                alt="高校生の部活動の様子"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">
                自分たちのハラスメント被害
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                私たちは高校時代、部活動の中で理不尽さや息苦しさを感じる経験をしてきました。生徒が自信を失い、本来の力を発揮できない状態が続き、多くの仲間が悩んだ末に退部を選ぶ姿も見てきました。
                この状況は現在は解決していますが、当時1年生だった私たちは、何が正しいのか分からず、ただその状況を受け入れるしかありませんでした。しかし、2年生になり後輩ができたことで、「このままでいいのか」という思いが芽生え、自分たちにできることを探し始めました。
              </p>
            </motion.div>
          </div>

          {/* Second Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft} className="relative aspect-[4/3] md:order-2">
              <Image
                src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg"
                alt="探究活動の様子"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6 md:order-1">
              <h3 className="text-2xl font-bold text-primary">
                探究プログラムとの出会い
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                私たちだけでは、知識も経験も十分ではありませんでした。そのため、高校で実施されていた探究プログラム「起業LAB」を活用し、目標の実現に向けて動き始めました。プログラムを通じて、起業家から起業のプロセスや考え方を学び、さらにハラスメント撲滅のための啓発活動にも取り組んできました。
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}