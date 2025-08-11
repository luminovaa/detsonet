import services from "@/services/services";

interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function getCustomers(params?: GetCustomersParams) {
  return services({
    url: '/customer',
    method: 'get',
    params,
  });
}

export function deleteCustomer(id: string) {
  return services({
    url: `/customer/${id}`,
    method: 'delete',
  });
}