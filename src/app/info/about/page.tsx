'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          About This Project
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg"
        >
          A solo-built project designed to solve real problems with simple, scalable tech.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            The Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed"
          >
            This project was created to bridge the gap between functionality and simplicity.
            Built from the ground up using modern tools like Next.js, Tailwind CSS, and Clerk for
            authentication, it&apos;s crafted with performance, scalability, and great UX in mind.
          </motion.p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {['Simplicity', 'Performance', 'User Experience'].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{value}</h3>
                <p className="text-sm">
                  Focused on delivering clean interfaces, fast load times, and meaningful
                  interactions for every user.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Tech Stack Used
          </motion.h2>
          <ul className="list-disc list-inside text-lg leading-8">
            <li>Next.js App Router</li>
            <li>Tailwind CSS with Dark Mode</li>
            <li>Framer Motion for Animations</li>
            <li>Clerk for Authentication</li>
            <li>Modular Component Architecture</li>
          </ul>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-indigo-600 text-white text-center px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Want to learn more?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6 max-w-xl mx-auto"
        >
          Explore the features or head over to the documentation to dive deeper into the technical
          side.
        </motion.p>
        <motion.a
          href="/info/features"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
        >
          View Features
        </motion.a>
      </section>
    </main>
  );
};

export default AboutPage;
