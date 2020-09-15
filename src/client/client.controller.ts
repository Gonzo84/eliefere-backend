import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from './client.service';
import { UpdateClientRequest } from '../contract';
import { Client } from '../models/users/client.entity';
import { Clt } from './client.decorator';
import { updateClientEntityFields } from './client.mapper';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
      @Body() updateRequest: UpdateClientRequest,
      @Clt() client: Client,
  ): Promise<void> {
    if (id !== client.id || id !== updateRequest.client.id) {
      throw new UnauthorizedException();
    }
    const updatedClient = updateClientEntityFields(client, updateRequest.client);
    await this.clientService.updateClient(updatedClient);
  }
}
