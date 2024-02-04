import { Injectable } from '@nestjs/common';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { CreateChatPromptWithImageDto } from './dto/create-chat-prompt-with-image.dto';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';

@Injectable()
export class PromptService {
  constructor(private readonly generativeAiService: GenerativeAiService) {}

  async chatPrompt(createChatPromptDto: CreateChatPromptDto) {
    return this.generativeAiService.generateContent(createChatPromptDto.prompt);
  }

  async chatPromptWithImage(
    createChatPromptWithImageDto: CreateChatPromptWithImageDto,
    image: Express.Multer.File,
  ) {
    const imageBase64 = image.buffer.toString('base64');
    const imageMimeType = image.mimetype;

    return this.generativeAiService.generateContentWithImage(
      createChatPromptWithImageDto.prompt,
      imageBase64,
      imageMimeType,
    );
  }
}
