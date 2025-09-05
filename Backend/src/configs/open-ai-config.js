import OpenAI from "openai";
import { config } from "dotenv";
config();

export const configureOpenAI = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPEN_AI_ORG || undefined,
  });
  return openai;
};
