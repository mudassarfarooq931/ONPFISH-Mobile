import {
  AuthenticateUserResponse,
  ChangePasswordResponse,
  ErrorResponse,
  GetCompletedInquiriesResponse,
  GetInquiriesByIdResponse,
  GetManagePrescriptionResponse,
  GetPrescriptionByIdResponse,
  GetPrescriptionsResponse,
  GetProductListByIdResponse,
  GetRefillHistoryResponse,
  GetStatesListResponse,
  InquiriesResponse,
  LogoutUserResponse,
  MarkInqueryAssignToMeResponse,
  PatientDetailResponse,
  RegisterBiometricResponse,
  SaveDeviceTokenResponse,
  SaveInquiryResponse,
  SchedulesResponse,
  SendInquiryInProgressResponse,
  SendVerificationCodeResponse,
  UpdatePaymentDetailResponse,
  UpdateProfileResponse,
  UpdateRefillDateResponse,
  UpdateShippingAddressResponse,
  VerificationCodeResponse,
} from '@responses';

export type ResponseType =
  | ErrorResponse
  | AuthenticateUserResponse
  | LogoutUserResponse
  | ChangePasswordResponse
  | SendVerificationCodeResponse
  | VerificationCodeResponse
  | UpdateProfileResponse
  | InquiriesResponse
  | SendInquiryInProgressResponse
  | SaveDeviceTokenResponse
  | RegisterBiometricResponse
  | SchedulesResponse
  | PatientDetailResponse
  | GetInquiriesByIdResponse
  | GetProductListByIdResponse
  | SaveInquiryResponse
  | GetCompletedInquiriesResponse
  | MarkInqueryAssignToMeResponse
  | GetPrescriptionsResponse
  | GetPrescriptionByIdResponse
  | GetManagePrescriptionResponse
  | GetRefillHistoryResponse
  | UpdateRefillDateResponse
  | GetStatesListResponse
  | UpdateShippingAddressResponse
  | UpdatePaymentDetailResponse;
