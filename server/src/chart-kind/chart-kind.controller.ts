import { Controller, Get } from '@nestjs/common';
import { ChartKindModel } from '../database/schemas/chart-kind.model';
import { ChartKindService } from './chart-kind.service';

@Controller('chartskinds')
export class ChartKindController {
    constructor(private chartKindService: ChartKindService) {}

    @Get()
    public async getallChartsKinds(): Promise<ChartKindModel[]> {
      return await this.chartKindService.getChartKinds();
    }
}
