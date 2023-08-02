import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common"
import { ReportType, data } from ".././data"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from ".././dtos/report.dto"
import { ReportService } from "./report.service"

@Controller("/report/:type")
export class ReportController {

  constructor(
    private readonly reportService: ReportService
  ){}

  @Get("")
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[] {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      return this.reportService.getAllReports(reportType)
  }

  @Get("/:id")
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      return this.reportService.getReportById(reportType, id)
  }

  @Post("")
  createReport(
    @Body() {amount, source}: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      return this.reportService.createReport(reportType, { source, amount})
  }

  @Put("/:id")
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
      
      return this.reportService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete("/:id")
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
      return this.reportService.deleteReport(id)
  }
}