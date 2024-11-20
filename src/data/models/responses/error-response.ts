import {RequestStatus} from '@app-types';

export type TErrorResponse = {
  status: RequestStatus;
  message: string;
  networkError: boolean;
};

export class ErrorResponse {
  public status: RequestStatus;
  public message: string;
  public networkError: boolean;

  constructor(
    status: RequestStatus,
    message: string,
    networkError: boolean = false,
  ) {
    this.status = status;
    this.message = message;
    this.networkError = networkError;

    this.toJson = this.toJson.bind(this);
  }

  public toJson = (): TErrorResponse => ({
    status: this.status,
    message: this.message,
    networkError: this.networkError,
  });
}
