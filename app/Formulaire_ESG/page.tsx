"use client";

import React, { useState } from "react";
import grille_evaluation from "@/lib/grille_evaluation.json";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

// Define the shape of a question from your JSON.
interface Question {
  question: string;
  score: number;
  niveaux: string;
}

// Define the shape for the result data.
interface ResultData {
  scores: Record<string, number>;
  globalScore: number;
  categoryLevels: Record<string, string>;
}

// Type for storing answers.
// For each category (key), store an object mapping a global question index to the chosen score.
type Answers = Record<string, Record<number, number>>;

const QUESTIONS_PER_PAGE = 5;
const CATEGORIES: string[] = Object.keys(grille_evaluation);
const totalPages = Math.ceil(
  (grille_evaluation[CATEGORIES[0]] as Question[]).length / QUESTIONS_PER_PAGE
);

const Questionnaire: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [openResult, setOpenResult] = useState<boolean>(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  // Save the user's answer by storing the question's score (if "Yes") or 0 (if "No")
  const handleAnswer = (
    category: string,
    globalIndex: number,
    score: number
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [globalIndex]: score,
      },
    }));
  };

  // Sum the answers, determine the user's level in each category, and display the result in a modal.
  const handleSubmit = () => {
    const scores: Record<string, number> = {};
    let globalScore = 0;

    // Track user's level for each category
    const categoryLevels: Record<string, string> = {};

    CATEGORIES.forEach((category) => {
      const categoryQuestions = grille_evaluation[category] as Question[];
      const categoryAnswers = answers[category] || {};

      // Prepare a record for each level indicating whether all questions for that level were answered "Yes"
      const levelsCompletion: Record<string, boolean> = {};

      // Initialize each level found in the questions.
      categoryQuestions.forEach((q) => {
        if (!(q.niveaux in levelsCompletion)) {
          levelsCompletion[q.niveaux] = true;
        }
      });

      // Evaluate each question's answer.
      categoryQuestions.forEach((q, index) => {
        // Default to 0 if unanswered.
        const userAnswer = categoryAnswers[index] ?? 0;
        // If the answer is 0 (No), mark this level as incomplete.
        if (userAnswer === 0) {
          levelsCompletion[q.niveaux] = false;
        }
      });

      // Determine the highest consecutive level starting from the lowest level.
      // We assume that level names sort in order (e.g., N1, N2, N3, etc.)
      let userLevel = "N/A";
      const sortedLevels = Object.keys(levelsCompletion).sort();
      for (const level of sortedLevels) {
        // If a level is not complete, break out; don't allow a higher level.
        if (!levelsCompletion[level]) {
          break;
        }
        // Otherwise, update userLevel to this level.
        userLevel = level;
      }
      categoryLevels[category] = userLevel;

      // Calculate the category's score by summing all answers.
      const categoryScore = Object.values(categoryAnswers).reduce(
        (sum, score) => sum + score,
        0
      );
      scores[category] = categoryScore;
      globalScore += categoryScore;
    });

    setResultData({ scores, globalScore, categoryLevels });
    setOpenResult(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-5">
      <Breadcrumbs  />
      <motion.div
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-red-600 mb-4">Questionnaire</h1>
        {CATEGORIES.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold text-red-500 mb-3">
              {category}
            </h2>
            {(grille_evaluation[category] as Question[])
              .slice(page * QUESTIONS_PER_PAGE, (page + 1) * QUESTIONS_PER_PAGE)
              .map((q: Question, localIndex: number) => {
                const globalIndex = page * QUESTIONS_PER_PAGE + localIndex;
                return (
                  <div key={globalIndex} className="mb-3">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {q.question}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Level: {q.niveaux}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name={`${category}-${globalIndex}`}
                          value={q.score}
                          checked={answers[category]?.[globalIndex] === q.score}
                          onChange={() =>
                            handleAnswer(category, globalIndex, q.score)
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name={`${category}-${globalIndex}`}
                          value="0"
                          checked={answers[category]?.[globalIndex] === 0}
                          onChange={() =>
                            handleAnswer(category, globalIndex, 0)
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          {page < totalPages - 1 ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>

        {/* Pagination Control */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <span>Pages:</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-2 py-1 border rounded ${
                page === i ? "bg-red-500 text-white" : "bg-white text-red-500"
              }`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Modal using Radix UI */}
      <Dialog.Root open={openResult} onOpenChange={setOpenResult}>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-white rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
          <Dialog.Title className="text-xl font-bold text-red-600 mb-4">
            Your Results
          </Dialog.Title>
          {resultData && (
            <div className="space-y-2">
              {Object.entries(resultData.scores).map(([category, score]) => (
                <p key={category} className="text-gray-700">
                  <span className="font-semibold">{category} Score:</span> {score}
                </p>
              ))}
              <p className="text-gray-800 font-bold">
                Global Score: {resultData.globalScore}
              </p>
              <div className="mt-4">
                {Object.entries(resultData.categoryLevels).map(
                  ([category, level]) => (
                    <p key={category} className="text-gray-700">
                      <span className="font-semibold">{category} Level:</span> {level}
                    </p>
                  )
                )}
              </div>
            </div>
          )}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-1 hover:bg-gray-200"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Questionnaire;
