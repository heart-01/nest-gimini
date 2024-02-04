import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromptModule } from './prompt/prompt.module';
import { GenerativeAiModule } from './generative-ai/generative-ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PromptModule, GenerativeAiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
