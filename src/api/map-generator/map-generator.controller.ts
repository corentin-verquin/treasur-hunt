import { Controller, Get } from "@nestjs/common";
import MapGeneratorService from "./map-generator.service";

@Controller('map-generator')
export default class MapGeneratorController{

    constructor(private readonly mapGeneratorService: MapGeneratorService){}

    @Get('/')
    generate(){
        return this.mapGeneratorService.generate()
    }
}