import { ApiProperty } from '@nestjs/swagger';

export class CreateChatPromptDto {
  @ApiProperty({ example: 'generate image cat' })
  prompt: string;
}
