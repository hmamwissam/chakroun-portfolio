import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, id, className = '', title, subtitle }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24 text-center md:text-left"
          >
            {subtitle && (
              <p className="text-yellow-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-yellow-400' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
            )}
            <div className="w-20 h-1 bg-zinc-800 mt-6 mx-auto md:mx-0"></div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
