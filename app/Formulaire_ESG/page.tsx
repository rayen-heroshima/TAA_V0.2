"use client";

import React, { useState } from "react";
import grille_evaluation from "@/lib/grille_evaluation.json";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

// --- Types ---
interface Question {
  question: string;
  score: number;
  niveaux: string;
}

interface SubcategoryData {
  score: number;
  content: Question[];
}

interface CategoryData {
  score: number;
  [subcategory: string]: SubcategoryData | number;
}

type EvaluationData = Record<string, CategoryData>;

interface FlatQuestion {
  id: number;
  category: string;
  subcategory: string;
  question: string;
  score: number;
  niveaux: string;
}

type Answers = Record<number, number>;

interface ResultData {
  globalScore: number;
  categoryScores: Record<string, number>;
  subcategoryScores: Record<string, Record<string, number>>;
  categoryLevels: Record<string, string>;
}

// --- Data Flattening ---
const data = grille_evaluation as unknown as EvaluationData;

const flattenQuestions = (): FlatQuestion[] => {
  const flat: FlatQuestion[] = [];
  let idCounter = 0;
  Object.keys(data).forEach((category) => {
    const categoryData = data[category];
    Object.keys(categoryData).forEach((subcat) => {
      if (subcat === "score") return;
      const subData = categoryData[subcat] as SubcategoryData;
      subData.content.forEach((q) => {
        flat.push({
          id: idCounter,
          category,
          subcategory: subcat,
          question: q.question,
          score: q.score,
          niveaux: q.niveaux,
        });
        idCounter++;
      });
    });
  });
  return flat;
};

const flatQuestions = flattenQuestions();
const QUESTIONS_PER_PAGE = 13;
const totalPages = Math.ceil(flatQuestions.length / QUESTIONS_PER_PAGE);

// --- Component ---
const Page: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [openResult, setOpenResult] = useState<boolean>(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  // Save the user's answer for a given question (Yes = question's score, No = 0)
  const handleAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // Helper: Compute category level based on its questions and user answers.
  const computeCategoryLevel = (questions: FlatQuestion[], answers: Answers): string => {
    const levelsCompletion: Record<string, boolean> = {};
    questions.forEach((q) => {
      if (!(q.niveaux in levelsCompletion)) {
        levelsCompletion[q.niveaux] = true;
      }
    });
    questions.forEach((q) => {
      const ans = answers[q.id] ?? 0;
      if (ans === 0) {
        levelsCompletion[q.niveaux] = false;
      }
    });
    let userLevel = "N/A";
    const sortedLevels = Object.keys(levelsCompletion).sort();
    for (const level of sortedLevels) {
      if (!levelsCompletion[level]) break;
      userLevel = level;
    }
    return userLevel;
  };

  // On submit, compute global, category, and subcategory scores plus levels.
  const handleSubmit = () => {
    let globalScore = 0;
    const categoryScores: Record<string, number> = {};
    const subcategoryScores: Record<string, Record<string, number>> = {};
    const categoryLevels: Record<string, string> = {};

    const questionsByCategory: Record<string, FlatQuestion[]> = {};
    const questionsBySubcategory: Record<string, Record<string, FlatQuestion[]>> = {};

    flatQuestions.forEach((q) => {
      if (!questionsByCategory[q.category]) {
        questionsByCategory[q.category] = [];
      }
      questionsByCategory[q.category].push(q);

      if (!questionsBySubcategory[q.category]) {
        questionsBySubcategory[q.category] = {};
      }
      if (!questionsBySubcategory[q.category][q.subcategory]) {
        questionsBySubcategory[q.category][q.subcategory] = [];
      }
      questionsBySubcategory[q.category][q.subcategory].push(q);
    });

    Object.keys(questionsByCategory).forEach((category) => {
      const catQuestions = questionsByCategory[category];
      let catScore = 0;
      catQuestions.forEach((q) => {
        const ans = answers[q.id] ?? 0;
        catScore += ans;
      });
      categoryScores[category] = catScore;
      globalScore += catScore;
      categoryLevels[category] = computeCategoryLevel(catQuestions, answers);

      subcategoryScores[category] = {};
      Object.keys(questionsBySubcategory[category]).forEach((subcat) => {
        const subQuestions = questionsBySubcategory[category][subcat];
        let subScore = 0;
        subQuestions.forEach((q) => {
          const ans = answers[q.id] ?? 0;
          subScore += ans;
        });
        subcategoryScores[category][subcat] = subScore;
      });
    });

    setResultData({ globalScore, categoryScores, subcategoryScores, categoryLevels });
    setOpenResult(true);
  };

  // Paginate the flattened questions.
  const displayedQuestions = flatQuestions.slice(
    page * QUESTIONS_PER_PAGE,
    (page + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-red-50 p-8 mt-10">
      <Breadcrumbs />
      <motion.div
        className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">Questionnaire</h1>
        
        {displayedQuestions.map((q) => (
          <div key={q.id} className="mb-5 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 text-lg font-medium">{q.question}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">Category:</span> {q.category} |{" "}
              <span className="font-semibold">Subcategory:</span> {q.subcategory} |{" "}
              <span className="font-semibold">Level:</span> {q.niveaux}
            </p>
            <div className="mt-3 flex space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={q.score}
                  checked={answers[q.id] === q.score}
                  onChange={() => handleAnswer(q.id, q.score)}
                  className="form-radio text-red-500"
                />
                <span className="text-red-600 font-medium">Oui</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value="0"
                  checked={answers[q.id] === 0}
                  onChange={() => handleAnswer(q.id, 0)}
                  className="form-radio text-red-500"
                />
                <span className="text-red-600 font-medium">Non</span>
              </label>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          {page < totalPages - 1 ? (
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>

        {/* Pagination Indicators */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <span className="text-gray-700 font-medium">Pages:</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-md transition-colors ${
                page === i ? "bg-red-600 text-white" : "bg-white text-red-600"
              }`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Improved Results Modal with Accordion */}
      <Dialog.Root open={openResult} onOpenChange={setOpenResult}>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-4xl w-full max-h-[80vh] p-8 bg-white rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-[9999] overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <Dialog.Title className="text-2xl font-bold text-red-700">Your Results</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 text-red-600 hover:text-red-800" aria-label="Close">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
          {resultData && (
            <>
              <div className="mb-6 text-center">
                <p className="text-2xl font-bold text-red-700">Global Score: {resultData.globalScore}</p>
              </div>
              <Accordion.Root type="multiple" className="space-y-4 w-full">
                {Object.entries(resultData.categoryScores).map(([category, score]) => (
                  <Accordion.Item key={category} value={category} className="border rounded-md overflow-hidden">
                    <Accordion.Header className="bg-red-100 p-4 flex justify-between items-center cursor-pointer">
                      <Accordion.Trigger className="text-lg font-semibold text-red-700">
                        {category} – Score: {score} – Level: {resultData.categoryLevels[category]}
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="p-4 bg-red-50">
                      {resultData.subcategoryScores[category] &&
                        Object.entries(resultData.subcategoryScores[category]).map(([subcat, subScore]) => (
                          <div key={subcat} className="mb-2">
                            <p className="text-sm font-medium text-gray-700">
                              {subcat} – Score: {subScore}
                            </p>
                          </div>
                        ))}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Page;
