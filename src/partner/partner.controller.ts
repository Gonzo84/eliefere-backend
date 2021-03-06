import {
  Body,
  Controller,
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
import { Partner } from '../entities/users/partner.entity';
import { Patnr } from './partner.decorator';
import { toNearestPartnerModel, updatePartnerEntityFields } from './partner.mapper';
import { UpdatePartnerRequest, NearestPartnersRequest } from '../contract';
import { GetNearestPartnersResponse } from '../contract/response/partner/get-nearest-partners-response.model';

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
      @Patnr() partner: Partner,
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
  ): Promise<GetNearestPartnersResponse> {
    // eslint-disable-next-line max-len
    return new GetNearestPartnersResponse(toNearestPartnerModel(await this.partnerService.getNearestPartners(nearestPartnersRequest)));
  }
}
