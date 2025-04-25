// src/features/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { apiTagTypes } from "../../constants/apiTags";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: apiTagTypes as unknown as string[],
  endpoints: () => ({}),
});
