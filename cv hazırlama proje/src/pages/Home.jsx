
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function Home() {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAIDemo = () => {
    toast({
      title: "AI Özelliği",
      description: "AI destekli CV önerisi için lütfen giriş yapın.",
    });
  };

  return (
    <div className="pt-16 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
          AI Destekli CV Oluşturucu
        </h1>
        <p className="text-xl text-purple-800 mb-8 max-w-2xl">
          Yapay zeka teknolojisi ile profesyonel CV'nizi dakikalar içinde oluşturun.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link to="/cv-builder">
              <Button size="lg" className="text-lg px-8 button-gradient">
                CV Oluştur
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 button-gradient">
                Hemen Başla
              </Button>
            </Link>
          )}
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 flex items-center gap-2 border-purple-500 text-purple-800 hover:bg-purple-100"
            onClick={handleAIDemo}
          >
            <Sparkles className="w-5 h-5" />
            AI Demo
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">AI Teknolojisi</h3>
          <p className="text-purple-800">
            Yapay zeka ile kişiselleştirilmiş CV önerileri alın.
          </p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">Kolay Kullanım</h3>
          <p className="text-purple-800">
            Basit arayüz ile dakikalar içinde profesyonel CV oluşturun.
          </p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">Kredi Sistemi</h3>
          <p className="text-purple-800">
            Uygun fiyatlı kredi paketi ile istediğiniz kadar CV oluşturun.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-20 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-purple-900">AI Özellikleri</h2>
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Akıllı İçerik Önerileri</h3>
            <p className="text-purple-800">
              AI teknolojimiz, deneyimlerinize göre en etkili CV içeriğini önerir.
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Otomatik Düzenleme</h3>
            <p className="text-purple-800">
              CV'nizi profesyonel standartlara uygun şekilde otomatik düzenler.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 text-center mb-8">
        <img alt="Payment methods" className="h-8" src="https://images.unsplash.com/photo-1586880244543-0528a802be97" />
        <p className="text-sm text-purple-800 mt-2">Güvenli Ödeme</p>
      </div>
    </div>
  );
}

export default Home;
