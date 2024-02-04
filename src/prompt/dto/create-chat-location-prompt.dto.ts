import { ApiProperty } from '@nestjs/swagger';

export class CreateChatLocationPromptDto {
  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
