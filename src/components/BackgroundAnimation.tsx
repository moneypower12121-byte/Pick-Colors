import { motion } from 'motion/react';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-surface">
      {/* Primary Color Orb */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px]"
      />
      
      {/* Secondary Color Orb */}
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-primary-container/10 blur-[100px]"
      />
      
      {/* Tertiary Color Orb */}
      <motion.div
        animate={{
          x: [0, 50, -150, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[150px]"
      />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}
