import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMenuExtractPromptDto {
  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
