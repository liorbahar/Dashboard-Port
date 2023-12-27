import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ChartKindService } from '../chart-kind.service';
import { ChartKindModel } from 'src/database/schemas/chart-kind.model';
import {isNull} from 'lodash'
  
@ValidatorConstraint({ name: 'ChartKindExistsValidation', async: true })
@Injectable()
export class ChartKindExistsValidation implements ValidatorConstraintInterface {
  
  constructor(private chartKindService: ChartKindService) {}
  
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    try {
      const chartKind: ChartKindModel = await this.chartKindService.getChartKind(value);
      return !isNull(chartKind)
    }
    catch(e) {
      return false;
    }
  }
  
  defaultMessage(args: ValidationArguments): string {
    throw new BadRequestException(`Cannot find chart kind with id ${args.value}`);
  }
  }