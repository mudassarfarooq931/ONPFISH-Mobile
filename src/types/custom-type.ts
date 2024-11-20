import {CustomEnum} from '@constants';

export type CreditCardInputType = {
  valid: boolean;
  values: {
    number: string;
    expiry: string;
    cvc: string;
    type: string;
  };
  status: {
    number: string;
    expiry: string;
    cvc: string;
  };
};

export type PatientSupportQuestion = {
  id: number;
  question: string;
  isSub: boolean;
  sub: Array<{
    id: number;
    question: string;
  }>;
};

export type BiometricsData = {
  public_key: string;
  device_id: string;
  device_name: string;
  device_platform: string;
  user_name: string;
};

export type ScannerType = 'search' | 'photo' | 'barcode';
export type FlashType = 'on' | 'auto' | 'off';

export type CaptureInfo = {
  type?: ScannerType;
  codeType?: string;
  codeValue?: string;

  imageUri?: string;
  imagePath?: string;
  imageName?: string;
  imageSize?: number;
};
