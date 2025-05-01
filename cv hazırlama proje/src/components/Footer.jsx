
import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, FileText, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-blur border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient">
                AI CV Builder
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Yapay zeka destekli CV oluşturma aracımız ile kariyerinizde fark yaratın. Modern, profesyonel ve dikkat çekici CV'ler oluşturun.
            </p>
            <div className="flex space-x-6">
              <Mail className="text-purple-400 h-6 w-6" />
              <Phone className="text-purple-400 h-6 w-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">CV Oluştur</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/templates" className="text-gray-400 hover:text-white transition-colors">
                    CV Şablonları
                  </Link>
                </li>
                <li>
                  <Link to="/examples" className="text-gray-400 hover:text-white transition-colors">
                    Örnek CV'ler
                  </Link>
                </li>
                <li>
                  <Link to="/tips" className="text-gray-400 hover:text-white transition-colors">
                    CV Yazım İpuçları
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">AI Özellikleri</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/ai-features" className="text-gray-400 hover:text-white transition-colors">
                    AI Asistan
                  </Link>
                </li>
                <li>
                  <Link to="/skills" className="text-gray-400 hover:text-white transition-colors">
                    Yetenek Önerileri
                  </Link>
                </li>
                <li>
                  <Link to="/analysis" className="text-gray-400 hover:text-white transition-colors">
                    CV Analizi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2025 AI CV Builder. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/Tuna-kod/AI-CV-BUILDER" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
