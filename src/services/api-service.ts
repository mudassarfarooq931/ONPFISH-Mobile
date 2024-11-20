import appConfigs from '@app-configs';

import {endpoints, strings} from '@constants';
import auth from '@react-native-firebase/auth';

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import qs from 'qs';
import Logger from './log-service';
import {ErrorResponse, FishIdentifyResponse} from '@responses';
import {PayloadType} from '@app-types/payload-types';
import {FishIdentifyPayload, ResponseType} from '@app-types';
import HelperService from './helper-service';

//-------------------------------

interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  error_description?: string;
  toJSON: () => object;
}

//-------------------------------

abstract class HttpClient {
  protected readonly axiosInstance: AxiosInstance;

  protected constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      responseType: 'json',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    this._initializeResponseInterceptor =
      this._initializeResponseInterceptor.bind(this);
    this._initializeResponseInterceptor();
  }
  private _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.request.use(
      async request => {
        const accessToken = 'accessToken';
        const headerToken = `bearer ${accessToken}`;
        // request.headers['X-API-Key'] = appConfigs.ACCESS_KEY;
        request.headers['Authorization'] = headerToken ?? '';
        return request;
      },

      async error => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      response => response,
      async apiError => {
        const originalConfig = apiError.config;
        if (apiError.response) {
          // Access Token was expired
          if (apiError.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
              return this.axiosInstance(originalConfig);
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                  return Promise.reject(error.response.data);
                }
              }
              return Promise.reject(error);
            }
          }

          if (apiError.response.status === 401 && apiError.response.data) {
            return Promise.reject(apiError.response.data);
          }
          if (
            apiError.response.status === 400 &&
            apiError.response.data.error === 'Logout'
          ) {
            auth()?.signOut();
            await HelperService.getInstance().clearAllStates();
          }
        }
        return Promise.reject(apiError);
      },
    );
  };
  public get initializeResponseInterceptor() {
    return this._initializeResponseInterceptor;
  }
  public set initializeResponseInterceptor(value) {
    this._initializeResponseInterceptor = value;
  }
}

//-------------------------------

type ApiTypes = 'fishIdentify';

//-------------------------------------------

export class ApiService extends HttpClient {
  //-----------------------------------------
  private static _instance = new ApiService();
  private constructor() {
    Logger.log('API_URL: ', endpoints.API_URL);
    super(endpoints.API_URL);
  }
  public static getInstance = () => {
    if (!ApiService._instance) {
      ApiService._instance = new ApiService();
    }

    return ApiService._instance;
  };

  //---------------------
  private handleError = (
    error: AxiosError,
    apiType: ApiTypes,
  ): ErrorResponse => {
    if (error.response) {
      // Request made and server responded
      Logger.log(apiType, error.response.data);
      Logger.log(apiType, error.response.status);
      Logger.log(apiType, error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      Logger.log(apiType, error.request);
    } else if (error.error_description) {
      // The request was made but error_description
      Logger.log(apiType, error.error_description);
      return new ErrorResponse(-4, error.error_description, false);
    } else {
      Logger.log(apiType, error.message);
      return new ErrorResponse(-3, strings.Error.NetworkError, true);
    }

    return new ErrorResponse(-4, error.message, false);
  };

  //-------------------------------------------------------------------------
  public safeApiCall = async <P extends PayloadType, R extends ResponseType>(
    payload: P,
    apiType: ApiTypes,
  ): Promise<R> => {
    switch (apiType) {
      case 'fishIdentify': {
        const response = await this.fishIdentify<FishIdentifyResponse>(
          payload as FishIdentifyPayload,
        )
          .then(response => new FishIdentifyResponse(response?.data))
          .catch((error: AxiosError) => this.handleError(error, apiType));

        if (response instanceof ErrorResponse) throw response;
        else if (
          response instanceof FishIdentifyResponse &&
          response.status !== 200
        ) {
          throw new ErrorResponse(response.status, response.msg, false);
        }

        return response as R;
      }
    }
  };

  //--------------------------------------------------------------------
  private fishIdentify = async <R>(payload: FishIdentifyPayload) =>
    this.axiosInstance.post<R>(
      endpoints.fishIdentify,
      qs.stringify({
        file: payload.file,
      }),
    );
}
