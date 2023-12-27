import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import {isNull} from 'lodash'
import { ChartService } from '../chart.service';
import { ChartModel } from 'src/database/schemas/chart.model';
  
@ValidatorConstraint({ name: 'ChartExistsValidation', async: true })
@Injectable()
export class ChartExistsValidation implements ValidatorConstraintInterface {
  
  constructor(private chartService: ChartService) {}
  
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    try {
      const chart: ChartModel = await this.chartService.getChart(value);
      return !isNull(chart)
    }
    catch(e) {
      return false;
    }
  }
  
  defaultMessage(args: ValidationArguments): string {
    throw new BadRequestException(`Cannot find chart with id ${args.value}`);
  }
  }