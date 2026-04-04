import React from 'react';
import { motion } from 'framer-motion';

const Quote = ({ data }) => {
  if (!data) return null;
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-yellow-400 py-20 md:py-32 px-6 flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative Text in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20rem] font-black tracking-tighter">LEADERSHIP</span>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-black text-2xl sm:text-3xl md:text-5xl font-black italic leading-[1.1] tracking-tight"
        >
          "{data.text1}
          <span className="underline decoration-black/20 underline-offset-8 px-1">
            {data.highlight}
          </span>
          {data.text2}"
        </motion.p>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-2 bg-black/10 mx-auto mt-12 rounded-full"
        ></motion.div>
      </div>
    </motion.section>
  );
};

export default Quote;
