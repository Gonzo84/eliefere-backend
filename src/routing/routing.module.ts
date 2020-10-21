import { HttpModule, Module } from '@nestjs/common';
import { RoutingService } from './routing.service';
import { RoutingController } from './routing.controller';

@Module({
  imports: [HttpModule],
  controllers: [RoutingController],
  providers: [RoutingService],
})
export class RoutingModule {
}
