import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { Logger } from "winston";

export const fixture = {
  // @ts-ignore
  page: undefined as Page,
  logger: undefined as Logger,
  apiContext: undefined as unknown as APIRequestContext,
  response: undefined as unknown as APIResponse,
};
