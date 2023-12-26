import { Controller, Get, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ChartCreationDto } from './chart.dto';
import { Response } from 'express';
import { ChartService } from './chart.service';
import { ChartModel } from './chart.model';


@Controller('chart')
export class ChartController {
    constructor(private chartService: ChartService) {}

    @Post()
    public async createChart(@Res() res: Response, @Body() data: ChartCreationDto): Promise<void> {
      try {
        const chart: ChartModel = await this.chartService.addChart(data);
        res.status(201).json(chart);
      }
      catch(e) {
        throw new HttpException(`Failed to insert chart due to ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get()
    public async findAllCharts(): Promise<ChartModel[]> {
      return await this.chartService.findAll();
    }
}