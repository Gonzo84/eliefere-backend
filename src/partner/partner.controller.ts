import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PartnerService } from './partner.service';
import { PartnerEntity } from '../entities';
import { Patnr } from './partner.decorator';
import { toNearestPartnerModel, updatePartnerEntityFields } from './partner.mapper';
import {
  UpdatePartnerRequest,
  NearestPartnersRequest,
  ServiceClassRequest,
  PostServiceClassResponse,
  GetTypesOfServiceResponse,
} from '../contract';
import { PostNearestPartnersResponse } from '../contract/response/partner/post-nearest-partners-response.model';

@ApiTags('partners')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async updatePartner(
    @Param('id', ParseIntPipe) id: number,
      @Body() updateRequest: UpdatePartnerRequest,
      @Patnr() partner: PartnerEntity,
  ): Promise<void> {
    if (id !== partner.id || id !== updateRequest.partner.id) {
      throw new UnauthorizedException();
    }
    const updatedPartner = updatePartnerEntityFields(partner, updateRequest.partner);
    await this.partnerService.updatePartner(updatedPartner);
  }

  @Post('nearest')
  @HttpCode(HttpStatus.OK)
  async nearestPartners(
    @Body() nearestPartnersRequest: NearestPartnersRequest,
  ): Promise<PostNearestPartnersResponse> {
    // eslint-disable-next-line max-len
    return new PostNearestPartnersResponse(toNearestPartnerModel(await this.partnerService.getNearestPartners(nearestPartnersRequest)));
  }

  @ApiBearerAuth()
  @Post('service-class')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async serviceClass(
    @Body() serviceClassRequest: ServiceClassRequest,
  ): Promise<PostServiceClassResponse> {
    // eslint-disable-next-line max-len
    return new PostServiceClassResponse(await this.partnerService.postServiceClass(serviceClassRequest));
  }

  @Get('types-of-service')
  @HttpCode(HttpStatus.OK)
  async typesOfService(): Promise<GetTypesOfServiceResponse> {
    // eslint-disable-next-line max-len
    return new GetTypesOfServiceResponse(await this.partnerService.getTypesOfService());
  }
}
