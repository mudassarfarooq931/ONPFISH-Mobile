import appConfigs from '@app-configs';

export default class Logger {
  private static _instance: Logger;
  private constructor() {}
  public static getInstance(): Logger {
    if (!this._instance) {
      this._instance = new Logger();
    }

    return this._instance;
  }

  public static log(message: string, object?: any) {
    if (!appConfigs.PRODUCTION) {
      console.log(message, object ?? '');
    }
  }

  public static error(message: string, object?: any) {
    if (!appConfigs.PRODUCTION) {
      console.log(message, object ?? '');
    }
  }
}
