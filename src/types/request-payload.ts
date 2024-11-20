export type SignupUserPayload = {
  fullName: string;
  email: string;
  password: string;
  role: string | null;
};
export type LoginPayload = {
  email: string;
  password: string;
};

export type FishIdentifyPayload = {
  file: any;
};
