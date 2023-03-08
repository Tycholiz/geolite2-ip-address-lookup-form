import { localIpRegex, ipV4Regex, ipV6Regex } from "./constants";

/**
 * Checks that an IP address is either IPv4 or IPv6, and that it is a remote IP address
 */
export const checkIpValidity = (address: string): boolean => {
  if (
    (!localIpRegex.test(address) && ipV4Regex.test(address)) ||
    ipV6Regex.test(address)
  ) {
    return true;
  }
  return false;
};
