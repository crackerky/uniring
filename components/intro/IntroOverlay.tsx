"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface IntroOverlayProps {
  onComplete?: () => void;
  autoSkipDelay?: number; // in milliseconds
}

export function IntroOverlay({ 
  onComplete, 
  autoSkipDelay = 15000 // Default to 15 seconds
}: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState<boolean | undefined>(undefined);
  const [activePhrase, setActivePhrase] = useState(0);
  const [phrasesCompleted, setPhrasesCompleted] = useState<boolean[]>([false, false, false]);
  const [canDismiss, setCanDismiss] = useState(false);
  const scrollRef = useRef(0);
  const touchStartRef = useRef(0);
  const pathname = usePathname();
  const scrollThreshold = 150; // Increased threshold - amount of scroll needed to trigger next phrase
  const phraseDisplayTime = 2000; // Minimum time to display each phrase in milliseconds
  
  const phrases = [
    "押し潰された声",
    "流した涙",
    ["もう誰にも", "同じ痛みを感じさせない"] // Updated text
  ];

  // この関数では localStorage のエラーハンドリングを適切に行います
  const safeLocalStorage = {
    getItem: (key: string): string | null => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error("localStorage.getItem failed:", e);
        return null;
      }
    },
    setItem: (key: string, value: string): boolean => {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.error("localStorage.setItem failed:", e);
        return false;
      }
    }
  };

  // イントロの完了処理をメモ化
  const handleComplete = useCallback(() => {
    if (isVisible !== true) return;
    
    // イントロを見たことを保存
    safeLocalStorage.setItem("hasSeenIntro", "true");
    console.log("Intro completed and marked as seen");
    
    // スクロールを再度有効化
    document.body.style.overflow = '';
    
    // コンポーネントの表示を終了
    setIsVisible(false);
    
    // コールバックがあれば実行
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 1000); // アニメーション完了を待つ
    }
    
    // スクロール位置をリセット
    window.scrollTo(0, 0);
  }, [isVisible, onComplete]);

  // フレーズが完了した後の最小表示時間を確保
  useEffect(() => {
    if (isVisible !== true) return;
    
    const timer = setTimeout(() => {
      const newCompletedPhrases = [...phrasesCompleted];
      newCompletedPhrases[activePhrase] = true;
      setPhrasesCompleted(newCompletedPhrases);
      
      // すべてのフレーズが表示され、最小表示時間が経過したかチェック
      if (activePhrase === phrases.length - 1 && !canDismiss) {
        setCanDismiss(true);
      }
    }, phraseDisplayTime);
    
    return () => clearTimeout(timer);
  }, [activePhrase, phrasesCompleted, canDismiss, phrases.length, isVisible]);

  // 初期化処理
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log("Initializing intro overlay");
    
    const hasSeenIntro = safeLocalStorage.getItem("hasSeenIntro");
    console.log("localStorage hasSeenIntro:", hasSeenIntro);
    
    console.log("Before conditional - pathname:", pathname, "hasSeenIntro:", hasSeenIntro);
    if (pathname === "/" && hasSeenIntro !== "true") {
      console.log("Setting intro visible to TRUE");
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      console.log("Setting intro visible to FALSE");
      setIsVisible(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [pathname]);

  // 自動スキップ機能
  useEffect(() => {
    console.log("Auto-skip effect running, isVisible:", isVisible);
    if (isVisible !== true) return;
    
    console.log(`Setting auto-skip timer for ${autoSkipDelay}ms`);
    const timer = setTimeout(() => {
      console.log("Auto-skip timer triggered");
      handleComplete();
    }, autoSkipDelay);
    
    return () => clearTimeout(timer);
  }, [autoSkipDelay, isVisible, handleComplete]);

  // スクロールでフレーズを進める（デバウンス付き）
  useEffect(() => {
    console.log("Scroll effect setup, isVisible:", isVisible);
    if (isVisible !== true) return;
    
    let isProcessingScroll = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isProcessingScroll) return;
      
      const currentScroll = window.scrollY;
      console.log("Scroll detected:", currentScroll, "previous:", scrollRef.current);
      
      // 意味のあるスクロールのみ処理
      if (currentScroll - scrollRef.current > scrollThreshold) {
        isProcessingScroll = true;
        console.log("Significant scroll detected");
        
        // 現在のフレーズが最小時間表示された場合のみ次のフレーズへ
        if (activePhrase < phrases.length - 1 && phrasesCompleted[activePhrase]) {
          console.log(`Moving to next phrase: ${activePhrase} -> ${activePhrase + 1}`);
          setActivePhrase(prev => prev + 1);
          scrollRef.current = currentScroll;
        } 
        // すべてのフレーズが表示された場合のみ完了可能
        else if (activePhrase === phrases.length - 1 && canDismiss) {
          console.log("All phrases completed, dismissing intro");
          handleComplete();
        }
        
        // スクロール処理のデバウンス
        scrollTimeout = setTimeout(() => {
          isProcessingScroll = false;
        }, 700); // 偶発的なトリガーを防ぐためにデバウンス時間を増加
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // モバイル用のタッチイベント処理
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isProcessingScroll) return;
      
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartRef.current - touchY;
      
      if (touchDiff > scrollThreshold) {
        isProcessingScroll = true;
        
        if (activePhrase < phrases.length - 1 && phrasesCompleted[activePhrase]) {
          setActivePhrase(prev => prev + 1);
          touchStartRef.current = touchY;
        } 
        else if (activePhrase === phrases.length - 1 && canDismiss) {
          handleComplete();
        }
        
        scrollTimeout = setTimeout(() => {
          isProcessingScroll = false;
        }, 700);
      }
    };
    
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    
    // キーボードナビゲーションの処理
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Space') {
        e.preventDefault();
        
        if (activePhrase < phrases.length - 1 && phrasesCompleted[activePhrase]) {
          setActivePhrase(prev => prev + 1);
        } 
        else if (activePhrase === phrases.length - 1 && canDismiss) {
          handleComplete();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [activePhrase, phrasesCompleted, canDismiss, phrases.length, isVisible, handleComplete]);

  // テキストアニメーション
  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.5,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const containerVariants = {
    visible: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // デバッグ用 - イントロ状態をリセットするボタン
  const resetIntroState = () => {
    safeLocalStorage.setItem("hasSeenIntro", "false");
    console.log("Intro state reset - refresh the page to see the intro again");
    // オプション: ページをリロードしてイントロをすぐに表示
    window.location.reload();
  };

  console.log("Render - isVisible:", isVisible, "activePhrase:", activePhrase, "canDismiss:", canDismiss);

  return (
    <AnimatePresence>
      {isVisible === true && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <div 
            className="absolute inset-0" 
            style={{ 
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              overflow: 'hidden',
              touchAction: 'none'
            }}
          />
          
          <div className="w-full h-full flex flex-col items-center justify-center relative px-4">
            {phrases.map((phrase, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activePhrase === index ? 1 : (activePhrase > index ? 0.3 : 0) 
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  height: "100vh", // Ensure full viewport height
                  padding: index === 2 ? "30vh 0" : "20vh 0" // More padding for the third phrase to ensure it stays visible
                }}
              >
                <motion.div
                  className="w-full max-w-7xl mx-auto"
                  variants={sentenceVariants}
                  initial="hidden"
                  animate={activePhrase === index ? "visible" : "hidden"}
                >
                  <div className="flex justify-center">
                    {index === 2 ? (
                      // Special layout for the final phrase
                      <div className="w-full text-center px-4 h-full flex flex-col items-center justify-center">
                        <div className="relative h-[60vh] w-full flex flex-col items-center justify-center">
                          {/* First line - positioned higher up */}
                          <motion.div
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute"
                            style={{ 
                              textShadow: "0 0 30px rgba(255,255,255,0.5)",
                              top: "20%", // Moved higher up from 35% to 20%
                              width: "100%",
                              textAlign: "center",
                              letterSpacing: "-0.03em",
                            }}
                          >
                            {Array.isArray(phrase) && (
                              phrase[0].split("").map((char, charIndex) => (
                                <motion.span
                                  key={`first-${charIndex}`}
                                  variants={letterVariants}
                                  className="inline-block"
                                >
                                  {char === " " ? <span>&nbsp;</span> : char}
                                </motion.span>
                              ))
                            )}
                          </motion.div>
                          
                          {/* Second line - positioned exactly at center */}
                          <motion.div
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute"
                            style={{ 
                              textShadow: "0 0 30px rgba(255,255,255,0.5)",
                              top: "50%", // Positioned at exact center
                              width: "100%",
                              textAlign: "center",
                              letterSpacing: "-0.03em",
                              transform: "translateY(-50%)" // Adjust for vertical centering
                            }}
                          >
                            {Array.isArray(phrase) && (
                              phrase[1].split("").map((char, charIndex) => (
                                <motion.span
                                  key={`second-${charIndex}`}
                                  variants={letterVariants}
                                  className="inline-block"
                                >
                                  {char === " " ? <span>&nbsp;</span> : char}
                                </motion.span>
                              ))
                            )}
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      // Style for other shorter phrases
                      phrase.split("").map((char, charIndex) => (
                        <motion.span
                          key={`${index}-${charIndex}`}
                          variants={letterVariants}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white inline-block"
                          style={{ 
                            textShadow: "0 0 30px rgba(255,255,255,0.5)"
                          }}
                        >
                          {char === " " ? <span>&nbsp;</span> : char}
                        </motion.span>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            <motion.p 
              className="absolute bottom-16 w-full text-center text-gray-400 text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activePhrase < phrases.length - 1 ? 0.7 : 
                  (canDismiss ? 0.9 : 0.3)
              }}
              transition={{ duration: 0.5 }}
            >
              {activePhrase < phrases.length - 1 ? 
                "下にスクロールして続ける" : 
                (canDismiss ? 
                  "下にスクロールしてメインページへ" : 
                  "しばらくお待ちください...")
              }
            </motion.p>
            
            {/* デバッグボタン */}
            <button
              onClick={resetIntroState}
              className="fixed top-4 right-4 bg-white text-black px-3 py-1 rounded text-sm z-50 opacity-20 hover:opacity-100 transition-opacity mr-4"
              style={{ display: process.env.NODE_ENV === 'production' ? 'none' : 'block' }}
            >
              Reset Intro
            </button>
            <button
              onClick={() => alert(`hasSeenIntro: ${safeLocalStorage.getItem("hasSeenIntro")}`)}
              className="fixed top-4 right-24 bg-white text-black px-3 py-1 rounded text-sm z-50 opacity-20 hover:opacity-100 transition-opacity"
              style={{ display: process.env.NODE_ENV === 'production' ? 'none' : 'block' }}
            >
              Check Storage
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
