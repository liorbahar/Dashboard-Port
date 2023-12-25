import { Test, TestingModule } from '@nestjs/testing';
import { EventSchemaController } from './event-schema.controller';

describe('EventSchemaController', () => {
  let controller: EventSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventSchemaController],
    }).compile();

    controller = module.get<EventSchemaController>(EventSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
