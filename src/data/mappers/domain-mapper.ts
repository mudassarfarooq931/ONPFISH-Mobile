import {DateUtil} from '@app-utils/date-util';
import {strings} from '@constants';

export abstract class DomainMapper<T, DomainModel> {
  //-----------------------------------------------
  abstract mapToDomainModel(model: T, item?: any): DomainModel;

  abstract mapToDomainList(modelList?: Array<T>): Array<DomainModel>;

  //-----------------------------------------
  protected _dateUtil = DateUtil.getInstance();

  //---------------------------------------------------------
  protected formatMillisToReadableDate = (millis?: number) =>
    this._dateUtil.formatMillisToAppDate(millis);

  protected formatMillisToReadableTime = (millis?: number) =>
    this._dateUtil.formatMillisToAppTime(millis);

  //-------------------------------------------
  protected domainSafeValue = (value: any) => {
    if (value === undefined || value === null)
      if (typeof value === 'number') return -1;

    return value;
  };

  protected domainValidValue = (value: any) => {
    if (
      value === undefined ||
      value === null ||
      value == '' ||
      value == false ||
      value == -1
    )
      return false;
    // if (typeof value === "number") return -1;

    return value;
  };

  protected dtoSafeValue = (value: any) => {
    if (
      (typeof value === 'number' && value === -1) ||
      (typeof value === 'string' && value === strings.NotAvailable)
    )
      return undefined;

    return value;
  };
}
