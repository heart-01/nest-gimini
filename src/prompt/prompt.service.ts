import { Injectable } from '@nestjs/common';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { CreateChatPromptWithImageDto } from './dto/create-chat-prompt-with-image.dto';
import { CreateChatHistoryPromptDto } from './dto/create-chat-history-prompt.dto';
import { GenerativeAiService } from '../generative-ai/generative-ai.service';
import { InputContent } from '@google/generative-ai';

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

  async chatHistoryPrompt(
    createChatHistoryPromptDto: CreateChatHistoryPromptDto,
  ) {
    const { prompt, history } = createChatHistoryPromptDto;
    return this.generativeAiService.chatHistoryPrompt(prompt, history);
  }

  async chatSummaryPrompt(createChatPromptDto: CreateChatPromptDto) {
    const { prompt } = createChatPromptDto;
    const history: InputContent[] = [
      {
        role: 'user',
        parts: `
          Summary this text that write in format of bullet points
          Example:
          - summary point 1
          - summary point 2
        `,
      },
      {
        role: 'model',
        parts: 'Please provide information and if the information is not in Thai, please translate it into Thai.',
      },
    ];
    return this.generativeAiService.chatHistoryPrompt(prompt, history);
  }
}
