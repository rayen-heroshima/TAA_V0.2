"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const IntroductionPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <motion.div
        className="bg-white shadow-xl rounded-lg p-8 max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Formulaire de Maturité d'Entreprise
        </h1>
        <p className="text-gray-700 text-lg">
          Ce formulaire permet d'évaluer la maturité d'une entreprise en matière de 
          <strong> Gouvernance, Social et Environnement</strong>. 
          Il est basé sur plusieurs critères RSE (Responsabilité Sociétale des Entreprises).
        </p>

        <motion.div
          className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-red-600 font-medium">
            Répondez aux questions pour obtenir une évaluation complète de votre entreprise.
          </p>
        </motion.div>

        <motion.button
          onClick={() => router.push("/Formulaire_ESG")}
          className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Accéder au Formulaire
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IntroductionPage;
