
import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import { Logger } from "winston";
import { Pool } from "pg";

export const fixture: {
  page?: Page;
  logger?: Logger;
  apiContext?: APIRequestContext;
  response?: APIResponse;
  supabase?: any;
  db?: Pool;
} = {};
