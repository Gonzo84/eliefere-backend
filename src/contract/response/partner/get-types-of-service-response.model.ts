import { TypesOfServiceEntity } from '../../../entities';

export class GetTypesOfServiceResponse {
  types: string[];

  constructor(data: TypesOfServiceEntity[]) {
    this.types = data.map((value) => value.name);
  }
}
