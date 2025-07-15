'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { pricingCards } from '@/lib/constants';


const PricingPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto text-lg"
        >
          Choose a plan that suits your agency’s scale — and grow as you go.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingCards.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              viewport={{ once: true }}
              className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 shadow hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-bold mb-1">{plan.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
              <p className="text-3xl font-extrabold mb-1">
                {plan.price}
                {plan.duration && (
                  <span className="text-base font-normal text-gray-600 dark:text-gray-400"> /{plan.duration}</span>
                )}
              </p>
              <p className="text-sm font-semibold mt-2 mb-4 text-indigo-600 dark:text-indigo-400">
                {plan.highlight}
              </p>
              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="mr-2">✔️</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-2 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                {plan.priceId ? 'Subscribe' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
