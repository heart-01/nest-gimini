import { Injectable } from '@nestjs/common';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { CreateChatPromptWithImageDto } from './dto/create-chat-prompt-with-image.dto';
import { CreateChatHistoryPromptDto } from './dto/create-chat-history-prompt.dto';
import { CreateChatChoicePromptDto } from './dto/create-chat-choice-prompt.dto';
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
        parts:
          'Please provide information and if the information is not in Thai, please translate it into Thai.',
      },
    ];
    return this.generativeAiService.chatHistoryPrompt(prompt, history);
  }

  async chatChoicePrompt(createChatChoicePromptDto: CreateChatChoicePromptDto) {
    const { question, answer } = createChatChoicePromptDto;
    const chat = `Question: ${question}. Answer: ${answer}. Generate 3 Choices`;
    const history: InputContent[] = [
      {
        role: 'user',
        parts: `
          I have question and answer. Please generate 3 choices that related with answer (but it is incorrect answer).

          Example like this (follow this pattern for generate choices)
          Question : What is the red color?
          Answer: Apple

          AI should result like this (no more description like this)
          Generate 3 Choices:
          1. Banana
          2. Orange
          3. Grape
        `,
      },
      {
        role: 'model',
        parts:
          'Please provide Question and Answer. I will give Generate 3 Choices for you.',
      },
    ];

    const result = await this.generativeAiService.chatHistoryPrompt(
      chat,
      history,
    );

    const pattern = /\d\.\s(.+?)(?=\n|$)/g;

    // Extract matches
    let choices: string[] = [answer];
    let match = null;
    while ((match = pattern.exec(result)) !== null) {
      choices.push(match[1].replace('*', ''));
    }

    choices = choices.sort((a, b) => 0.5 - Math.random());

    return choices;
  }
}
