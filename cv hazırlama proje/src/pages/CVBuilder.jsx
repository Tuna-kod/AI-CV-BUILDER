import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCredit } from "@/contexts/CreditContext";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import html2pdf from 'html2pdf.js';
import MainLayout from "@/components/MainLayout";

function CVBuilder() {
  const { credits, deductCredits, addToHistory } = useCredit();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: ""
  });
  const [generatedCV, setGeneratedCV] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateAIContent = async (data) => {
    return {
      enhancedExperience: data.experience + "\n• Proaktif çalışma tarzı ile ekip performansını artırdım\n• Müşteri memnuniyetini %25 artırdım",
      enhancedSkills: data.skills + "\n• Problem Çözme\n• Analitik Düşünme\n• İletişim Becerileri",
      summary: "Deneyimli ve sonuç odaklı profesyonel. Güçlü iletişim becerileri ve analitik yaklaşımı ile projelerde başarılı sonuçlar elde etmiştir."
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (credits < 10) {
      toast({
        title: "Yetersiz Kredi",
        description: "CV oluşturmak için yeterli krediniz bulunmuyor.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const aiEnhancedContent = await generateAIContent(formData);
      
      const enhancedCV = {
        ...formData,
        experience: aiEnhancedContent.enhancedExperience,
        skills: aiEnhancedContent.enhancedSkills,
        summary: aiEnhancedContent.summary
      };
      
      setGeneratedCV(enhancedCV);
      deductCredits(10);
      addToHistory(enhancedCV);
      
      toast({
        title: "CV Oluşturuldu",
        description: "CV'niz başarıyla oluşturuldu ve indirilmeye hazır.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "CV oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadCV = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      toast({
        title: "Hata",
        description: "CV önizleme bulunamadı.",
        variant: "destructive"
      });
      return;
    }

    const opt = {
      margin: 1,
      filename: `${formData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: "Başarılı",
        description: "CV'niz başarıyla indirildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "CV indirilirken bir hata oluştu.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">CV Oluşturucu</h2>
              <p className="text-gray-600">
                Kalan Krediniz: <span className="font-bold">{credits}</span>
              </p>
              <p className="text-sm text-gray-500">
                Her CV oluşturma 10 kredi gerektirir
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Eğitim</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">İş Deneyimi</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Yetenekler</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "CV Oluşturuluyor..." : "CV Oluştur"}
              </Button>
            </form>
          </motion.div>

          {generatedCV && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">CV Önizleme</h2>
                <Button onClick={downloadCV}>PDF İndir</Button>
              </div>

              <div id="cv-preview" className="space-y-6 p-8 bg-white">
                <div className="border-b pb-4">
                  <h1 className="text-3xl font-bold">{generatedCV.fullName}</h1>
                  <p className="text-gray-600">{generatedCV.email} | {generatedCV.phone}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Özet</h2>
                  <p className="text-gray-700">{generatedCV.summary}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">İş Deneyimi</h2>
                  <p className="text-gray-700 whitespace-pre-line">{generatedCV.experience}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Eğitim</h2>
                  <p className="text-gray-700 whitespace-pre-line">{generatedCV.education}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Yetenekler</h2>
                  <p className="text-gray-700 whitespace-pre-line">{generatedCV.skills}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <img alt="Payment methods" className="h-8 mx-auto" src="https://images.unsplash.com/photo-1586880244543-0528a802be97" />
            <p className="text-sm text-gray-500 mt-2">Güvenli Ödeme</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CVBuilder;
