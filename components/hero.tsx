import FileUpload from "./file-upload";
import { Readme } from "./readmebtn";
import { GithubBtn } from "./shad-components/buttonS";
import { GetStartedbtn } from "./shad-components/getStartedbtn";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-15 min-h-[80vh]"
    >
      <motion.div variants={itemVariants}>
        <Readme />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-6xl font-bold text-gray-900 mb-4 tracking-tight"
      >
        Ask Anything
      </motion.h1>

      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 text-transparent bg-clip-text"
      >
        From Your PDF
      </motion.h2>

      <motion.h3
        variants={itemVariants}
        className="text-xl font-semibold text-indigo-600 mt-4 mb-4"
      >
        Upload a PDF and get instant answers using AI
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 max-w-xl mb-8 leading-relaxed"
      >
        Our intelligent PDF bot reads, understands, and answers questions from your documents.
        Whether it's research papers, manuals, or reports — just upload and chat. Powered by Gemini AI.
      </motion.p>

      <motion.main
        variants={itemVariants}
        className="flex flex-col items-center justify-between w-full max-w-xl mx-auto"
      >
        <div className="w-full sm:w-96">
          <FileUpload />
        </div>
      </motion.main>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex gap-6 flex-wrap justify-center"
      >
        <GithubBtn />
        <GetStartedbtn />
      </motion.div>
    </motion.div>
  );
};
