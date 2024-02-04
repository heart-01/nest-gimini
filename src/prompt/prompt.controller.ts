import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Prompt API')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  chatPrompt(@Body() createChatPromptDto: CreateChatPromptDto) {
    return this.promptService.chatPrompt(createChatPromptDto);
  }
}
