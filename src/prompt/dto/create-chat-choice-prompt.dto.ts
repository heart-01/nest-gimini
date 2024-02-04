import { ApiProperty } from '@nestjs/swagger';

export class CreateChatChoicePromptDto {
  @ApiProperty({ example: 'what is red color?' })
  question: string;

  @ApiProperty({ example: 'Apple' })
  answer: string;
}
