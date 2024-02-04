import { Injectable } from '@nestjs/common';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';

@Injectable()
export class PromptService {
  constructor(private readonly generativeAiService: GenerativeAiService) {}

  async chatPrompt(createChatPromptDto: CreateChatPromptDto) {
    return this.generativeAiService.generateContent(createChatPromptDto.prompt);
  }
}
