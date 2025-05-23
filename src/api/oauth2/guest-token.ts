import { getRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";

const url = migrosApiPaths["authentication"].public.v1 + "/guest";

export interface IAuthenticationOptions extends Record<string, any> {
  authorizationNotRequired: boolean;
}

const defaultAuthenticationOptions: IAuthenticationOptions = {
  authorizationNotRequired: true,
};

async function getGuestTokenRequest(
  url: string,
  options: IAuthenticationOptions,
): Promise<Record<string, any>> {
  const necessaryHeaders = {
    ["accept"]: "application/json, text/plain, */*",
  };

  const response = await getRequestBypass(url, options, necessaryHeaders);

  if (!response.headers["leshopch"]) {
    throw new Error("No guest token found in the response headers.");
  }

  return {
    token: response.headers["leshopch"],
    body: response.data,
  };
}

export async function getGuestToken(): Promise<any> {
  return getGuestTokenRequest(url, defaultAuthenticationOptions);
}
