import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import MainLayout from "@/components/MainLayout"; // ✅ Layout eklendi

function Home() {
  const content = (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          AI Destekli CV Oluşturucu
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl">
          Yapay zeka teknolojisi ile profesyonel CV'nizi dakikalar içinde oluşturun.
        </p>
          
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-800">AI Teknolojisi</h3>
          <p className="text-gray-600">
            Yapay zeka ile kişiselleştirilmiş CV önerileri alın.
          </p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-800">Kolay Kullanım</h3>
          <p className="text-gray-600">
            Basit arayüz ile dakikalar içinde profesyonel CV oluşturun.
          </p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-800">Kredi Sistemi</h3>
          <p className="text-gray-600">
            Uygun fiyatlı kredi paketi ile istediğiniz kadar CV oluşturun.
          </p>
        </div>
      </motion.div>

      <div className="glass-card p-6 rounded-lg flex items-start gap-4 mt-10">
  <img
    alt="Payment methods"
    className="w-24 h-auto border-2 rounded"
    src="https://thumbs.dreamstime.com/b/mobile-payment-wallet-app-wireless-nfc-technology-man-paying-shopping-smartphone-application-credit-card-information-151771252.jpg"
  />
  
  <div>
    <h3 className="text-xl font-semibold mb-3 text-purple-800">Güvenli Ödeme</h3>
    <p className="text-gray-600">
      Uygun fiyatlı kredi paketi ile istediğiniz kadar CV oluşturun.
    </p>
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

export default Home;
