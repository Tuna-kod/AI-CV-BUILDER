
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCredit } from "@/contexts/CreditContext";
import { motion } from "framer-motion";
import { FileText, CreditCard } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const { credits } = useCredit();
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="nav-blur fixed w-full z-50 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AI CV Builder</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CreditCard size={16} className="text-purple-300" />
                  <span className="text-sm text-purple-100">
                    {credits} Kredi
                  </span>
                </motion.div>
                <Link to="/cv-builder">
                  <Button variant="default" className="button-gradient hover:opacity-90 flex items-center gap-2">
                    <FileText size={16} />
                    CV Hazırla
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-purple-100 hover:text-white hover:bg-white/10">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/account">
                  <Button variant="ghost" className="text-purple-100 hover:text-white hover:bg-white/10">
                    Profil
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="border-purple-300 text-purple-100 hover:bg-purple-900/50"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-purple-100 hover:text-white hover:bg-white/10">
                    Giriş Yap
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="button-gradient hover:opacity-90">
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
