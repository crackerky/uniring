"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    comment: "普段何気なく行っていることがハラスメントだと知って、自分の行動を振り返るいい機会でした。",
    rating: 5,
    author: "高校1年生・男性"
  },
  {
    comment: "ハラスメントの種類などを例を含め細かく説明があったので、身近なことだと認識しやすかったです。",
    rating: 4,
    author: "高校2年生・女性"
  },
  {
    comment: "あーなるほどな、知らなかったな、やってしまったなとアップデートすることが沢山ありました。多くの人がこの授業を受けた方がいいと感じます。",
    rating: 5,
    author: "40代講師・男性"
  }
];

export function Testimonials() {
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            参加者の声
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16"
          >
            授業満足度 ★4.8 (96.6%)
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {testimonial.comment}
                </p>
                <p className="text-sm font-medium">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}