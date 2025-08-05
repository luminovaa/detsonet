import service from "@/services/services";

export function getUsers() {
    return service({
        url: '/user',
        method: 'get'
    })
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