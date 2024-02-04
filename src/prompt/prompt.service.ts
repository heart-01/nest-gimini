import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';

@Injectable()
export class PromptService {
  constructor(private readonly generativeAiService: GenerativeAiService) {}

  async create(createPromptDto: CreatePromptDto) {
    return this.generativeAiService.generateContent(createPromptDto.prompt);
  }
}
