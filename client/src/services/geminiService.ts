import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client lazily to prevent app crashes if env var is missing
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.warn("Failed to initialize Gemini AI client");
}

export const getCareerAdvice = async (userPrompt: string): Promise<string> => {
  try {
    if (!ai) {
      return "AI connection is not configured. Please add your GEMINI_API_KEY to the environment variables.";
    }
    
    // Call generateContent directly using the initialized 'ai' instance
    // Using gemini-3-flash-preview for a balanced speed and intelligence in career Q&A
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the "Career Soulmate AI". Your tone is encouraging, insightful, and professional. 
        You help people find their professional destiny. Provide short, actionable advice. 
        Use bullet points where helpful. If asked about salary, provide realistic ranges. 
        Always end with a supportive "Your destiny awaits!"`,
        temperature: 0.7,
      },
    });

    // Accessing the text property directly as per the latest SDK spec
    return response.text || "I'm having trouble connecting to your destiny right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The career path is currently foggy. Let's try again in a moment.";
  }
};
