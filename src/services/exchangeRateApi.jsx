import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exchangeRateApi = createApi({
    reducerPath: "exchangeRateApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://v6.exchangerate-api.com/v6/70c00da0431509e99f150dad/",
    }),
    endpoints: (builder) => ({
        getExchangeRates: builder.query({
            query: () => `latest/USD`,
        }),
    }),
});

export const { useGetExchangeRatesQuery } = exchangeRateApi;
