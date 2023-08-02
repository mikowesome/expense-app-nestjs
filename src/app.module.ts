import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SummaryModule } from './summary/summary.module';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
})
export class AppModule {}


