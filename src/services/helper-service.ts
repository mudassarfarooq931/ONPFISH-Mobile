import {height_screen, width_screen} from '@app-utils/dimensions';

import store from '@redux/store';

export default class HelperService {
  private static _instance: HelperService;
  private constructor() {}
  public static getInstance(): HelperService {
    if (!this._instance) {
      this._instance = new HelperService();
    }

    return this._instance;
  }
  clearAllStates = async () => {
    const dispatch = store.store.dispatch;
  };

  public static async logOut(response: any) {
    const dispatch = store.store.dispatch;
  }

  //------------------------------------------------------------------------
  public getIsDeviceMobile = () => {
    const aspectRatio = height_screen / width_screen;
    // You can adjust the threshold based on your criteria for what defines a tablet
    //aspectRatio > 1.6 is Example threshold, you may need to adjust this
    if (aspectRatio > 1.6) {
      return true;
    } else {
      return false;
    }
  };
}
