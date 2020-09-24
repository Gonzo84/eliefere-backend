import { Module } from '@nestjs/common';

import { DevController } from './dev.controller';

@Module({
  imports: [
  ],
  providers: [],
  exports: [],
  controllers: [DevController],

})
export class DevModule {
}
