import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreateChatPromptDto } from './dto/create-chat-prompt.dto';
import { CreateChatPromptWithImageDto } from './dto/create-chat-prompt-with-image.dto';
import { CreateChatHistoryPromptDto } from './dto/create-chat-history-prompt.dto';
import { CreateChatChoicePromptDto } from './dto/create-chat-choice-prompt.dto';
import { CreateChatLocationPromptDto } from './dto/create-chat-location-prompt.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from '@config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateChatMenuExtractPromptDto } from './dto/create-chat-menu-extract-prompt.dto copy';

@ApiTags('Prompt API')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  chatPrompt(@Body() createChatPromptDto: CreateChatPromptDto) {
    return this.promptService.chatPrompt(createChatPromptDto);
  }

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateChatPromptWithImageDto })
  @UseInterceptors(FileInterceptor('image', multerOptions()))
  chatPromptWithImage(
    @Body() createChatPromptWithImageDto: CreateChatPromptWithImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.promptService.chatPromptWithImage(
      createChatPromptWithImageDto,
      image,
    );
  }

  @Post('history')
  chatHistoryPrompt(
    @Body() createChatHistoryPromptDto: CreateChatHistoryPromptDto,
  ) {
    return this.promptService.chatHistoryPrompt(createChatHistoryPromptDto);
  }

  @Post('summary')
  chatSummaryPrompt(@Body() createChatPromptDto: CreateChatPromptDto) {
    return this.promptService.chatSummaryPrompt(createChatPromptDto);
  }

  @Post('choice')
  chatChoicePrompt(
    @Body() createChatChoicePromptDto: CreateChatChoicePromptDto,
  ) {
    return this.promptService.chatChoicePrompt(createChatChoicePromptDto);
  }

  @Post('location')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateChatLocationPromptDto })
  @UseInterceptors(FileInterceptor('image', multerOptions()))
  chatLocationPrompt(@UploadedFile() image: Express.Multer.File) {
    return this.promptService.chatLocationPrompt(image);
  }

  @Post('menu-extract')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateChatMenuExtractPromptDto })
  @UseInterceptors(FileInterceptor('image', multerOptions()))
  chatMenuExtractPrompt(@UploadedFile() image: Express.Multer.File) {
    return this.promptService.chatMenuExtractPrompt(image);
  }
}
