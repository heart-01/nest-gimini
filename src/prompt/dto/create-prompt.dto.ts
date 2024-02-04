import { ApiProperty } from '@nestjs/swagger';

export class CreatePromptDto {
  @ApiProperty({ example: 'generate image cat' })
  prompt: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
