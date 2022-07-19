import { Module, Global } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'fs';
import { MapGeneratorModule } from './api/map-generator/map-generator.module';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MapGeneratorModule
  ],
  providers: [
    {
      provide: 'config',
      useFactory: configurationFactory
    }
  ],
  exports: ['config']
})
export class AppModule { }

async function configurationFactory() {
  const env = process.env.NODE_ENV ?? 'dev'

  const envConfig = existsSync(join(__dirname, 'configuration', 'env', `${env}.js`)) ?
    new (await import(`./configuration/env/${env}`)).default() :
    {}

  const base = new (await import('./configuration/index')).default()

  return { ...base, ...envConfig }
}