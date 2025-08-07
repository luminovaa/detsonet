import axios from "axios";

interface ServiceOptions {
    onUnauthorized?: () => void;
}

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
    
    failedQueue = [];
};

const createService = (options?: ServiceOptions) => {
    const service = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 50000,
        withCredentials: true, // PENTING: untuk mengirim cookies otomatis
    }); 

    service.interceptors.request.use(
        (config) => {
            // Tidak perlu menambah Authorization header manual
            // karena cookies akan dikirim otomatis dengan withCredentials: true
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const loginEndpoints = ['/auth/login', '/admin'];

    service.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const isLoginRequest = loginEndpoints.some(endpoint => 
                error.config?.url?.includes(endpoint)
            );

            // Jika 401 dan bukan login request dan belum retry
            if (error.response?.status === 401 && !isLoginRequest && !originalRequest._retry) {
                
                // Jika sedang dalam proses refresh, tambahkan ke queue
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => {
                        return service(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Coba refresh token
                    await authService.refreshToken();
                    processQueue(null);
                    return service(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    
                    // Cookies akan otomatis dihapus oleh browser jika expired
                    // atau kita bisa memanggil logout endpoint untuk menghapus cookies
                    
                    if (options?.onUnauthorized) {
                        options.onUnauthorized();
                    }
                    
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return service;
};

export const authService = {
    login: async (credentials: { identifier: string; password: string }) => {
        const service = createService();
        const response = await service.post('/auth/login', credentials);
        
        // Tidak perlu simpan ke localStorage
        // Semua data sudah tersimpan di HTTP-only cookies
        return response.data.data;
    },

    logout: async () => {
        const service = createService();
        try {
            await service.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        // Tidak perlu hapus localStorage karena tidak digunakan
        // Cookies akan dihapus oleh backend saat logout
    },

    refreshToken: async () => {
        const service = createService();
        const response = await service.post('/auth/refresh');
        return response.data;
    },

    // Method untuk cek user info dari backend
    getCurrentUser: async () => {
        const service = createService();
        try {
            const response = await service.get('/auth/me'); // endpoint untuk get current user
            return response.data.data;
        } catch (error) {
            return null;
        }
    },

    // Method untuk verify session
    verifySession: async () => {
        const service = createService();
        try {
            const response = await service.get('/auth/verify');
            return response.data;
        } catch (error) {
            return null;
        }
    }
};

export default createService();