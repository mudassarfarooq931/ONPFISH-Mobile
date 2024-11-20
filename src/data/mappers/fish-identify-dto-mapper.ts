import {FishDto, FishListDto} from '@dto-models';
import {Fish} from '@domain-models';
import {DomainMapper} from './domain-mapper';

export class FishDtoMapper extends DomainMapper<FishDto, Array<Fish>> {
  mapToDomainModel = (model: FishDto): Array<Fish> => {
    return model.fishList.map(fish => ({
      id: this.domainSafeValue(fish.id),
      name: this.domainSafeValue(fish.name),
    }));
  };

  mapToDomainList = (modelList?: Array<FishDto>): Array<Array<Fish>> =>
    modelList?.map(item => this.mapToDomainModel(item)) ?? new Array();
}
