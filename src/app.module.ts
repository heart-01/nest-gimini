import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PromptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
