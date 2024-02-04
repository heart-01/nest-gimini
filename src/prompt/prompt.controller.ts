import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from '@config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Prompt API')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePromptDto })
  @UseInterceptors(FileInterceptor('file', multerOptions()))
  create(@Body() createPromptDto: CreatePromptDto,  @UploadedFile() file: Express.Multer.File,) {
    return this.promptService.create(createPromptDto);
  }
}
