import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    // "/v1beta/openai/" - Intha slash matrum path romba strict-aa irukanum
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" 
});

export default openai