/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum EAnimalSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export enum EAnimalAge {
  ONE_TO_THREE_MONTHS = "ONE_TO_THREE_MONTHS",
  THREE_TO_SIX_MONTHS = "THREE_TO_SIX_MONTHS",
  SIX_TO_TWELVE_MONTHS = "SIX_TO_TWELVE_MONTHS",
  ONE_TO_TWO_YEARS = "ONE_TO_TWO_YEARS",
  TWO_TO_FIVE_YEARS = "TWO_TO_FIVE_YEARS",
  FIVE_TO_TEN_YEARS = "FIVE_TO_TEN_YEARS",
  TEN_PLUS_YEARS = "TEN_PLUS_YEARS",
}

export interface AppMetadata {
  provider?: string | null;
  providers?: string[] | null;
}

export interface Coordinates {
  /** @format double */
  latitude?: number | null;
  /** @format double */
  longitude?: number | null;
}

export interface LoginRequest {
  username?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface RegisterRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface SightingDetail {
  /** @format int32 */
  id?: number;
  name?: string | null;
  species?: string | null;
  breed?: string | null;
  age?: EAnimalAge;
  sex?: EAnimalSex;
  imageUrl?: string | null;
  /** @format date-time */
  lastSpotted?: string;
  location?: string | null;
  notes?: string | null;
  submittedById: string | null;
  submittedByName?: string | null;
  ageLabel?: string | null;
  sexLabel?: string | null;
  tagsArray?: string[] | null;
}

export interface SightingPreview {
  /** @format int32 */
  id?: number;
  name?: string | null;
  species?: string | null;
  breed?: string | null;
  imageUrl?: string | null;
  /** @format date-time */
  lastSpotted?: string;
  coordinates: Coordinates;
  submittedById: string | null;
  /** @format int32 */
  sightingDetailId?: number | null;
}

export interface TokenDto {
  token: string | null;
}

export interface User {
  id: string | null;
  email: string | null;
  aud?: string | null;
  role?: string | null;
  phone?: string | null;
  /** @format date-time */
  email_confirmed_at?: string | null;
  /** @format date-time */
  confirmed_at?: string | null;
  /** @format date-time */
  last_sign_in_at?: string | null;
  app_metadata?: AppMetadata;
  user_metadata?: UserMetadata;
  /** @format date-time */
  created_at?: string | null;
  /** @format date-time */
  updated_at?: string | null;
  is_anonymous?: boolean;
}

export interface UserMetadata {
  emailVerified?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title straysafe API
 * @version v1
 * @contact hassan khan <hk656.2004@gmail.com>
 *
 * welcome to straysafe API
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name UsersAllList
     * @request GET:/Admin/Users/All
     * @secure
     */
    usersAllList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/Admin/Users/All`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name LoginCreate
     * @request POST:/Auth/Login
     * @secure
     */
    loginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<TokenDto, any>({
        path: `/Auth/Login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RegisterCreate
     * @request POST:/Auth/Register
     * @secure
     */
    registerCreate: (data: RegisterRequest, params: RequestParams = {}) =>
      this.request<TokenDto, any>({
        path: `/Auth/Register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  sighting = {
    /**
     * No description
     *
     * @tags Sighting
     * @name PreviewsCreate
     * @request POST:/Sighting/Previews
     * @secure
     */
    previewsCreate: (data: Coordinates, params: RequestParams = {}) =>
      this.request<SightingPreview[], any>({
        path: `/Sighting/Previews`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sighting
     * @name DetailDetail
     * @request GET:/Sighting/Detail/{id}
     * @secure
     */
    detailDetail: (id: number, params: RequestParams = {}) =>
      this.request<SightingDetail, any>({
        path: `/Sighting/Detail/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name GetUser
     * @request GET:/User/Me
     * @secure
     */
    getUser: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/Me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
