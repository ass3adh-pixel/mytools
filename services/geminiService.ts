import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

// OCR: Extract text from image
export const extractTextFromImage = async (base64Image: string, mimeType: string = 'image/jpeg'): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Extract all text from this image accurately. Preserve the layout if possible. Return only the extracted text. If the text is Arabic, ensure correct formatting."
          }
        ]
      }
    });
    return response.text || "لم يتم العثور على نص.";
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("فشل استخراج النص. تأكد من صلاحية مفتاح API.");
  }
};

// AI Text Tools: Summarize, Rewrite, Proofread
export const processTextWithAi = async (text: string, task: 'summarize' | 'rewrite' | 'proofread'): Promise<string> => {
  try {
    const ai = getAiClient();
    let prompt = "";
    
    switch (task) {
      case 'summarize':
        prompt = "قم بتلخيص النص التالي باللغة العربية في نقاط موجزة:";
        break;
      case 'rewrite':
        prompt = "أعد صياغة النص التالي ليكون أكثر احترافية وجاذبية باللغة العربية:";
        break;
      case 'proofread':
        prompt = "قم بتصحيح الأخطاء الإملائية والنحوية في النص التالي، واشرح التغييرات إذا لزم الأمر:";
        break;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}\n\n${text}`
    });

    return response.text || "لم يتم إنشاء رد.";
  } catch (error) {
    console.error("AI Text Error:", error);
    throw new Error("حدث خطأ أثناء معالجة النص.");
  }
};

// Helper to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove Data URI prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};
