import {FishDto} from '@dto-models';
import {BaseResponse} from './base-response';

export class FishIdentifyResponse extends BaseResponse<FishDto> {
  constructor(response: FishIdentifyResponse) {
    super(response.status, response.msg, response.data);
  }
}
