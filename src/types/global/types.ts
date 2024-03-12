import { GridSortDirection } from "@mui/x-data-grid";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export interface ISuccessPayloadAction<P>
  extends PayloadAction<
    P,
    string,
    {
      arg: any;
      requestId: string;
      requestStatus: "fulfilled";
    },
    never
  > {
  payload: P;
}

export interface IErrorPayloadAction
  extends PayloadAction<
    unknown,
    string,
    {
      arg: any;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | {
          rejectedWithValue: false;
        }
    ),
    SerializedError
  > {}

export interface IAppState {
  message: Nullable<string>;
  status: Nullable<"success" | "error">;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IPaginationResponse {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IFilter {
  field: string;
  operator: string;
  value: string;
}

export interface ISort {
  field: string;
  direction: GridSortDirection;
}

export type ResponseWithMessage<T> = {
  data: T;
  message: string;
};
