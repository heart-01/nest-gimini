import { InputContent } from '@google/generative-ai';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatHistoryPromptDto {
  @ApiProperty({ example: 'How many paws are in my house?' })
  prompt: string;

  @ApiProperty({
    example: [
      {
        role: 'user',
        parts: 'Hello, I have 2 dogs in my house.',
      },
      {
        role: 'model',
        parts: 'Great to meet you. What would you like to know?',
      },
    ],
  })
  history: InputContent[];
}
