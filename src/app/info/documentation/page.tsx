'use client';

import React from 'react';

const DocumentationPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Documentation</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Everything you need to know about using and extending this application.
        </p>
      </section>

      {/* Content Sections */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Getting Started */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Getting Started</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Clone the repository using <code className="bg-gray-500 text-sm px-1 py-0.5 rounded">git clone</code>.</li>
            <li>Install dependencies with <code className="bg-gray-500 text-sm px-1 py-0.5 rounded">bun install</code>.</li>
            <li>Run the development server: <code className="bg-gray-500 text-sm px-1 py-0.5 rounded">bun dev</code>.</li>
            <li>Configure environment variables in <code>.env.local</code>.</li>
          </ul>
        </div>

        {/* Folder Structure */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Project Structure</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 rounded overflow-x-auto">
{`
src/
├── app/                // App Router pages
│   ├── info/           // Marketing pages (About, Docs, Pricing, Features)
│   ├── api/            // API routes
│   └── (main)/         // Authenticated app
├── components/         // Reusable components
├── prisma/             // Prisma schema
├── public/             // Static assets
└── styles/             // Global styles
`}
          </pre>
        </div>

        {/* Authentication */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Authentication</h2>
          <p className="text-base mb-2">
            Authentication is powered by <strong>Clerk</strong>. To configure it:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Sign up at <a href="https://clerk.dev" className="text-blue-600 underline">clerk.dev</a></li>
            <li>Create a project and get your <code className="bg-gray-500 text-sm px-1 py-0.5 rounded">CLERK_PUBLISHABLE_KEY</code> and <code className="bg-gray-500 text-sm px-1 py-0.5 rounded">CLERK_SECRET_KEY</code>.</li>
            <li>Add them to your <code>.env.local</code> file.</li>
          </ul>
        </div>

        {/* Theming */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Theming</h2>
          <p className="text-base mb-2">
            This project uses <strong>Tailwind CSS</strong> with full dark mode support.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Dark mode is toggled using a custom <code>ModeToggle</code> component.</li>
            <li>Tailwind classes are used for seamless switching between light/dark.</li>
          </ul>
        </div>

        {/* Deployment */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Deployment</h2>
          <p className="text-base">
            You can deploy this project to any Bun-compatible hosting service, or use Vercel (with a Bun adapter).
          </p>
        </div>
      </section>
    </main>
  );
};

export default DocumentationPage;
