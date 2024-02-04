import { ApiProperty } from '@nestjs/swagger';

export class CreateChatPromptWithImageDto {
  @ApiProperty({ example: 'what is this image?' })
  prompt: string;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
