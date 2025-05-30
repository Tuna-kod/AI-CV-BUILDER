import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCredit } from "@/contexts/CreditContext";
import { motion } from "framer-motion";
import MainLayout from "@/components/MainLayout"; 

function Dashboard() {
  const { credits, addCredits } = useCredit();

  const handleBuyCredits = (amount) => {
    addCredits(amount);
  };

  const content = (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Hoş Geldiniz</h2>
          <p className="text-purple-800 mb-4">
            Mevcut Krediniz: <span className="font-bold">{credits}</span>
          </p>
          <Link to="/cv-builder">
            <Button>Yeni CV Oluştur</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">10 Kredi</h3>
            <p className="text-3xl font-bold mb-4">₺49.99</p>
            <Button
              onClick={() => handleBuyCredits(10)}
              className="w-full"
              variant="outline"
            >
              Satın Al
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500"
          >
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-sm rounded-bl">
              En Popüler
            </div>
            <h3 className="text-xl font-semibold mb-4">25 Kredi</h3>
            <p className="text-3xl font-bold mb-4">₺99.99</p>
            <Button
              onClick={() => handleBuyCredits(25)}
              className="w-full"
            >
              Satın Al
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">50 Kredi</h3>
            <p className="text-3xl font-bold mb-4">₺179.99</p>
            <Button
              onClick={() => handleBuyCredits(50)}
              className="w-full"
              variant="outline"
            >
              Satın Al
            </Button>
          </motion.div>
        </div>

        <div className="md:col-span-2 flex justify-center mt-8">
      <div className="glass-card p-6 rounded-lg text-center max-w-sm mb-8">
        <img
          alt="Payment methods"
          className="mx-auto mb-4 w-20 h-auto border-2 rounded"
          src="https://images.unsplash.com/photo-1586880244543-0528a802be97"
        />
        <p className="text-lg font-semibold text-purple-900 mb-2 mt-2">Güvenli Ödeme</p>
        <p className="text-purple-800">
          3D Secure ile bilgileriniz güven altında ödeme sağlayın.
        </p>
      </div>
    </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      {content}
    </MainLayout>
  );
}

export default Dashboard;
