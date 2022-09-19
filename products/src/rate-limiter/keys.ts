export const requestRateLimiter = (ipAddress: string) =>
  `requestratelimiter#${ipAddress}`;
export const productUploadRateLimiter = (ipAddress: string) =>
  `productuploadratelimiter#${ipAddress}`;
