
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const CreditContext = createContext();

export function useCredit() {
  return useContext(CreditContext);
}

export function CreditProvider({ children }) {
  const [credits, setCredits] = useState(0);
  const [cvHistory, setCvHistory] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCredits = localStorage.getItem("credits");
    const storedHistory = localStorage.getItem("cvHistory");
    
    if (storedCredits) {
      setCredits(parseInt(storedCredits));
    }
    
    if (storedHistory) {
      setCvHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addCredits = (amount) => {
    const newCredits = credits + amount;
    setCredits(newCredits);
    localStorage.setItem("credits", newCredits.toString());
    toast({
      title: "Kredi Eklendi",
      description: `${amount} kredi hesabınıza eklendi.`,
    });
  };

  const deductCredits = (amount) => {
    if (credits >= amount) {
      const newCredits = credits - amount;
      setCredits(newCredits);
      localStorage.setItem("credits", newCredits.toString());
      return true;
    }
    return false;
  };

  const addToHistory = (cv) => {
    const newCV = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...cv
    };
    const updatedHistory = [newCV, ...cvHistory];
    setCvHistory(updatedHistory);
    localStorage.setItem("cvHistory", JSON.stringify(updatedHistory));
    return newCV;
  };

  const value = {
    credits,
    cvHistory,
    addCredits,
    deductCredits,
    addToHistory
  };

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  );
}
