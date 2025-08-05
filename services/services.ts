import axios from "axios";

interface ServiceOptions {
    onUnauthorized?: () => void;
}

const createService = (options?: ServiceOptions) => {
    const service = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 50000,
        withCredentials: true, // PENTING: untuk mengirim cookies otomatis
    }); 

    // Request interceptor - tidak perlu menambah Authorization header manual
    // karena cookies akan dikirim otomatis dengan withCredentials: true
    service.interceptors.request.use(
        (config) => {
            // Tidak perlu mengambil token dari localStorage
            // karena backend menggunakan HTTP-only cookies
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const loginEndpoints = ['/auth/login', '/admin']; // sesuaikan dengan endpoint login Anda

    service.interceptors.response.use(
        (response) => response,
        async (error) => {
            const isLoginRequest = loginEndpoints.some(endpoint => 
                error.config?.url?.includes(endpoint)
            );

            if (error.response?.status === 401 && !isLoginRequest) {
                // Hapus data user dari storage (jika ada)
                localStorage.removeItem('user');
                
                // Cookies akan otomatis dihapus oleh browser jika expired
                // atau Anda bisa memanggil logout endpoint untuk menghapus cookies
                
                if (options?.onUnauthorized) {
                    options.onUnauthorized();
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
        return response.data;
    },

    logout: async () => {
        const service = createService();
        try {
            await service.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('user');
        }
    },

    refreshToken: async () => {
        const service = createService();
        const response = await service.post('/auth/refresh');
        return response.data;
    }
};

export default createService();