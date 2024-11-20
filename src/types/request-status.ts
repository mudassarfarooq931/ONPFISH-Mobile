export enum RequestStatus {
  SUCCESS = 200, // Success
  API_ERROR = 404, // api error
  API_ERROR_NOT_MODIFIED = 304, // api error during update data
  API_ERROR_UNAUTHORIZED = 401, // api error during token expiration
  SERVER_ERROR = 500, // server error (e.g., exception thrown)
  NETWORK_ERROR = -3, // network error (not connected to internet)
  REQUEST_ERROR = -4, // request error something gone wrong locally within app
}
