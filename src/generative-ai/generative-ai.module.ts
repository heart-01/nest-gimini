import { Module, Global } from '@nestjs/common';
import { GenerativeAiService } from './generative-ai.service';

@Global()
@Module({
  controllers: [],
  providers: [GenerativeAiService],
  exports: [GenerativeAiService],
})
export class GenerativeAiModule {}
