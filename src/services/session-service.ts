import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from './log-service';
import {CryptUtil} from '@app-utils/crypto-util';

export default class SessionService {
  static storeString = async (key: string, value: string) => {
    try {
      const encryptedData = CryptUtil.getInstance().getEncryptedData(value);
      await AsyncStorage.setItem(key, encryptedData);
    } catch (e) {
      Logger.log('async_storage', e);
    }
  };

  static storeObject = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      const encryptedData = CryptUtil.getInstance().getEncryptedData(jsonValue);
      await AsyncStorage.setItem(key, encryptedData);
    } catch (e) {
      Logger.log('async_storage', e);
    }
  };

  static getString = async (key: string, defaultValue?: any) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      const decryptedData = CryptUtil.getInstance().getDecryptedData(
        storedValue || defaultValue,
      );
      return decryptedData || defaultValue;
    } catch (error) {
      Logger.log('async_storage', error);
      return defaultValue;
    }
  };

  static getObject = async (key: string, defaultValue: any = null) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      const decryptedData = storedValue
        ? CryptUtil.getInstance().getDecryptedData(storedValue)
        : defaultValue;
      return decryptedData ? JSON.parse(decryptedData) : defaultValue;
    } catch (error) {
      Logger.log('async_storage', error);
      return defaultValue;
    }
  };

  static clearKey = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Logger.log('async_storage', e);
    }
  };

  static clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      Logger.log('async_storage', e);
    }
  };
}
