import React from 'react';

export const ScreenshotGallery = () => {
  return (
    <div className="p-8 space-y-12 bg-slate-900 min-h-screen text-white">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">Responsive Audit Gallery</h1>
        <p className="text-slate-400">Visual verification of layout across Desktop, Tablet, and Mobile viewports.</p>
      </header>

      <div className="space-y-16">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4">Desktop View (1280px)</h2>
          <div className="border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-black/20">
            <img src="/desktop.png" alt="Desktop View" className="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4">Tablet View (768px)</h2>
          <div className="max-w-3xl mx-auto border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-black/20">
            <img src="/tablet.png" alt="Tablet View" className="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-l-4 border-rose-500 pl-4">Mobile View (375px)</h2>
          <div className="max-w-sm mx-auto border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-black/20">
            <img src="/mobile.png" alt="Mobile View" className="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
        </section>
      </div>
    </div>
  );
};
