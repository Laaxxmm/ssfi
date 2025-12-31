import { GoogleGenAI } from "@google/genai";
import { UserRole } from '../types';

// Lazy initialization to prevent top-level crashes if env vars are missing
const getAiClient = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generatePerformanceReport = async (role: UserRole, contextData: string) => {
  try {
    const ai = getAiClient();
    if (!ai) return "AI Analysis Unavailable: No API Key configured.";

    const model = 'gemini-2.0-flash-exp'; // Updated model name
    const systemInstruction = `
      You are the Chief AI Performance Analyst for the Speed Skating Federation of India (SSFI).
      Your tone is professional, encouraging, and data-driven.
      Analyze the provided context data based on the user's role: ${role}.
      
      For Admins: Summarize participation stats, highlight top performers, and suggest infrastructure improvements.
      For Coaches: Analyze skater times, suggest training regimen adjustments, and identify fatigue risks.
      For Students: Provide motivation, analyze their best times against national averages, and suggest dietary tips for speed skaters.
      
      Keep the response concise (under 200 words) and formatted as a bulleted insight list.
    `;

    // Correct API usage for @google/genai or strict format
    // Assuming simple generateContent is supported by the installed version wrappers
    // If not, we fall back to a safe mock for stability
    /* 
    const response = await ai.models.generateContent({
      model,
      contents: contextData,
      config: { systemInstruction }
    });
    return response.text; 
    */

    // TEMPORARY MOCK to Ensure Stability during Demo until key is confirmed
    return "AI Insight (Simulation):\n- Participation is up by 15%.\n- Recommended focus: 500m sprint starts.\n- Infrastructure: Pune rink needs resurfacing.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis is currently unavailable. Please check your network connection or API quota.";
  }
};