import services from "@/services/services";
import { CreatePackageFormData } from "@/types/package.types";

interface GetPackagesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function getPackages(params?: GetPackagesParams) {
  return services({
    url: '/package',
    method: 'get',
    params,
  });
}

export function createPackage(data: CreatePackageFormData) {
    return services({
        url: '/package',
        method: 'post',
        data,
    });
}