
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Simulate login
    const mockUser = {
      id: "1",
      email,
      name: "Test User",
      phone: "",
      address: "",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    toast({
      title: "Başarılı",
      description: "Giriş yapıldı",
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Başarılı",
      description: "Çıkış yapıldı",
    });
  };

  const register = (email, password) => {
    const mockUser = {
      id: "1",
      email,
      name: "Test User",
      phone: "",
      address: "",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("user", JSON.stringify(mockUser));
    // Give 20 free credits to new users
    localStorage.setItem("credits", "20");
    setUser(mockUser);
    toast({
      title: "Başarılı",
      description: "Kayıt olundu ve 20 ücretsiz kredi hesabınıza eklendi!",
    });
    return true;
  };

  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast({
      title: "Başarılı",
      description: "Profil güncellendi",
    });
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
