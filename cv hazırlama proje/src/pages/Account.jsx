import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCredit } from "@/contexts/CreditContext";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/MainLayout";

function AccountContent() {
  const { user, updateProfile } = useAuth();
  const { cvHistory } = useCredit();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePicture: user?.profilePicture || ""
  });

  const [selectedCV, setSelectedCV] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    toast({
      title: "Profil Güncellendi",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCV = async (cv) => {
    const element = document.getElementById(`cv-preview-${cv.id}`);
    if (!element) {
      toast({
        title: "Hata",
        description: "CV önizleme bulunamadı.",
        variant: "destructive",
      });
      return;
    }

    const opt = {
      margin: 1,
      filename: `${cv.fullName.replace(/\s+/g, "_")}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
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
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Profil Bilgileri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera size={32} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Profil Bilgileri</h2>
              <p className="text-gray-600">Profil bilgilerinizi güncelleyin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adres
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button type="submit">Kaydet</Button>
          </form>
        </motion.div>

        {/* CV Geçmişi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">CV Geçmişi</h2>

          {cvHistory.length === 0 ? (
            <p className="text-gray-500">Henüz CV oluşturmadınız.</p>
          ) : (
            <div className="space-y-4">
              {cvHistory.map((cv) => (
                <div
                  key={cv.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{cv.fullName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(cv.date).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedCV(selectedCV?.id === cv.id ? null : cv)
                        }
                      >
                        {selectedCV?.id === cv.id ? "Gizle" : "Görüntüle"}
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => downloadCV(cv)}
                      >
                        İndir
                      </Button>
                    </div>
                  </div>

                  {selectedCV?.id === cv.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div
                        id={`cv-preview-${cv.id}`}
                        className="space-y-6 p-8 bg-white border rounded-lg"
                      >
                        <div className="border-b pb-4">
                          <h1 className="text-3xl font-bold">{cv.fullName}</h1>
                          <p className="text-gray-600">
                            {cv.email} | {cv.phone}
                          </p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold mb-2">Özet</h2>
                          <p className="text-gray-700">{cv.summary}</p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold mb-2">İş Deneyimi</h2>
                          <p className="text-gray-700 whitespace-pre-line">{cv.experience}</p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold mb-2">Eğitim</h2>
                          <p className="text-gray-700 whitespace-pre-line">{cv.education}</p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold mb-2">Yetenekler</h2>
                          <p className="text-gray-700 whitespace-pre-line">{cv.skills}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


export default function Account() {
  return (
    <MainLayout>
      <AccountContent />
    </MainLayout>
  );
}
