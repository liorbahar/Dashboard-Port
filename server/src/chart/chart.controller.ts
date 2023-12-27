import { Controller, Get, Post, Body, HttpException, HttpStatus, Res, Put } from '@nestjs/common';
import { ChartCreationDto, ChartLocationReplaceDto } from './chart.dto';
import { Response } from 'express';
import { ChartService } from './chart.service';
import { ChartModel } from '../database/schemas/chart.model';
import { ChartData } from './chart.interface';


@Controller('chart')
export class ChartController {
    constructor(private chartService: ChartService) {}

    @Post()
    public async createChart(@Res() res: Response, @Body() data: ChartCreationDto): Promise<void> {
      try {
        const chart: ChartModel = await this.chartService.addChart(data);
        res.status(HttpStatus.CREATED).json(chart);
      }
      catch(e) {
        throw new HttpException(`Failed to insert chart due to ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get()
    public async findAllCharts(): Promise<ChartData[]> {
      return await this.chartService.findAll();
    }

    @Put()
    public async replaceChartLocations(@Res() res: Response, @Body() data: ChartLocationReplaceDto): Promise<void> {
      try {
        await this.chartService.replaceChartOrder(data.sourceChartId, data.destinationChartId);
        res.status(HttpStatus.OK).json({ "message" : `Replacement charts done`});
      }
      catch(e) {
        throw new HttpException(`Failed to replace charts due to ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}