'use client';

import React from 'react';

const FEATURES = [
  {
    title: 'Authentication',
    description:
      'Secure and scalable user authentication powered by Clerk, supporting sign-in, sign-up, and user sessions.',
  },
  {
    title: 'App Router (Next.js 13+)',
    description:
      'Built using the latest App Router architecture with nested layouts, server components, and route groups.',
  },
  {
    title: 'Tailwind CSS',
    description:
      'Utility-first styling with built-in dark mode support, fully responsive design, and consistent spacing system.',
  },
  {
    title: 'Reusable Components',
    description:
      'Modular component structure to promote reusability and clean code — including buttons, modals, cards, etc.',
  },
  {
    title: 'Framer Motion Animations',
    description:
      'Smooth transitions and microinteractions powered by Framer Motion for a delightful user experience.',
  },
  {
    title: 'Bun for Speed',
    description:
      'Bun is used as the runtime and package manager, offering faster builds, dependency installs, and dev server performance.',
  },
];

const FeaturesPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Features</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore the powerful features that make this project fast, scalable, and user-friendly.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
