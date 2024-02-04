import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptService {
  create(createPromptDto: CreatePromptDto) {
    return 'This action adds a new prompt';
  }
}
