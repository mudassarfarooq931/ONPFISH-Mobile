import {RequestStatus} from '@app-types';

export type TBaseResponse<T> = {
  status: RequestStatus;
  msg: string;
  data: T;
};

export class BaseResponse<T> {
  public status: RequestStatus;
  public msg: string;
  public data: T;

  constructor(status: RequestStatus, msg: string, data: T) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }

  public toJson = (): TBaseResponse<T> => ({
    status: this.status,
    data: this.data,
    msg: this.msg,
  });
}
