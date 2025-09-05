import { Configuration } from "openai";
import { config } from "dotenv";
config();

export const configureOpenAI = () => {
  return new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPEN_AI_ORG || undefined,
  });
};
