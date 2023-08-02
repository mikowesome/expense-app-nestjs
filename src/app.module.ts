import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SummaryModule } from './summary/summary.module';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';

@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [ReportController],
  providers: [ReportService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
})
export class AppModule {}


