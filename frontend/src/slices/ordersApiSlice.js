import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    updateOrderToDelivered: builder.mutation({
      query: id => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: id => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetOrdersQuery,
  useUpdateOrderToDeliveredMutation,
  useUpdateOrderToPaidMutation,
} = ordersApiSlice;