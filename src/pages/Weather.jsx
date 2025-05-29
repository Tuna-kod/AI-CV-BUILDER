import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

function Weather() {
  const { toast } = useToast();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=e559ca3336630d60b6eb9e01577497b5&units=metric&lang=tr`
        );
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Hata",
          description: "Hava durumu verisi alınamadı.",
        });
      }
    };

    fetchWeather();
  }, [toast]);

  if (loading) {
    return (
      <div className="pt-20 text-center text-purple-800 text-xl">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 rounded-lg max-w-md w-full text-center"
      >
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          {weather.name} Hava Durumu
        </h1>
        <p className="text-lg text-purple-800">
          {weather.weather[0].description}
        </p>
        <p className="text-2xl text-purple-900 font-semibold mt-2">
          {weather.main.temp}°C
        </p>
        <p className="text-sm text-purple-700 mt-1">
          Nem: {weather.main.humidity}% | Rüzgar: {weather.wind.speed} m/s
        </p>
      </motion.div>
    </div>
  );
}

export default Weather;