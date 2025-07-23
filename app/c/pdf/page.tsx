'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AskAi } from '@/components/AskAi';
import { useState } from 'react';

export default function PDFViewerPage() {
  const [ai, setAi] = useState(false); // false = sidebar hidden initially
  const searchParams = useSearchParams();
  const file = searchParams.get('file');
  const pdfUrl = file || null;

  const handleAskAi = () => {
    setAi(true);
  };

  if (!pdfUrl) return <p>No PDF file provided.</p>;

  return (
    <div className="relative w-full h-[1000px] grid grid-cols-10">
      {/* PDF Viewer - Takes full width unless AI is active */}
      <div className={`relative ${ai ? 'col-span-8' : 'col-span-10'} transition-all duration-300`}>
        <iframe src={pdfUrl} className="w-full h-full border border-gray-300" />
        
        {!ai && (
          // Floating "Ask AI" button
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="fixed bottom-5 right-5 z-50 mr-8"
          >
            <Button
              onClick={handleAskAi}
              className="group relative inline-flex h-12 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-300 p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black text-white px-8 py-1 text-sm font-medium backdrop-blur-3xl">
                Ask AI
              </span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Slide-in Ask AI Panel */}
      <AnimatePresence>
        {ai && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="col-span-2 h-full"
          >
            <AskAi />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
