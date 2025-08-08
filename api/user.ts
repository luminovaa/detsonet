import service from "@/services/services";

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export function getUsers(params?: GetUsersParams) {
  return service({
    url: '/user',
    method: 'get',
    params,
  });
}
export function getUserById(id: string) {
    return service({
        url: `/user/${id}`,
        method: 'get'
    })
}

export function createUser(user: any) {
    return service({
        url: '/user',
        method: 'post',
        data: user
    })
}