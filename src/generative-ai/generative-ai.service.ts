import { HttpException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GenerativeAiService {
  private genAI: GoogleGenerativeAI;
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async generateContent(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.log('🚀 ~ PromptService ~ create ~ error:', error);
      throw new HttpException('Failed to generate content', 500);
    }
  }
}
