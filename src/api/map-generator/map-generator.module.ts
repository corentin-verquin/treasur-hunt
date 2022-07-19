import { Module } from '@nestjs/common';
import MapGeneratorController from './map-generator.controller';
import MapGeneratorService from './map-generator.service';

@Module({
    providers: [MapGeneratorService],
    controllers: [MapGeneratorController]
})
export class MapGeneratorModule { }