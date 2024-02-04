import { HttpException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, InputContent } from '@google/generative-ai';

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

  async generateContentWithImage(
    prompt: string,
    file: string,
    mimeType: string,
  ) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    const imageParts = [this.fileToGenerativePart(file, mimeType)];

    try {
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.log('🚀 ~ PromptService ~ create ~ error:', error);
      throw new HttpException('Failed to generate content', 500);
    }
  }

  fileToGenerativePart(file: string, mimeType: string) {
    return {
      inlineData: {
        data: file,
        mimeType,
      },
    };
  }
}
