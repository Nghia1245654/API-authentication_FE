import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const apiInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // ⚠️ QUAN TRỌNG: Để trình duyệt tự gửi/nhận Cookie
})

// Request Interceptor: Gắn Access Token vào Header
apiInstance.interceptors.request.use(
    (config) => {
        // Lấy Access Token từ biến nhớ (hoặc Context/Redux)
        // LƯU Ý: Không nên lấy từ LocalStorage nếu muốn bảo mật tuyệt đối
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor: Xử lý khi Token hết hạn (Lỗi 401)
apiInstance.interceptors.response.use(
    (response) => response, // Nếu thành công thì trả về data
    async (error) => {
        const originalRequest = error.config

        // Bỏ qua nếu đang ở trang login
        if (window.location.href.includes('/login')) {
            return Promise.reject(error)
        }

        // Nếu lỗi là 401 (Unauthorized) và chưa thử retry lần nào
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Gọi API Refresh Token
                // Trình duyệt sẽ TỰ ĐỘNG gửi cookie 'refreshToken' đi kèm
                const res = await apiInstance.post('/auth/refresh-token')

                // Lấy Access Token mới từ server trả về
                const newAccessToken = res.data.data.accessToken

                // Lưu lại token mới
                localStorage.setItem('accessToken', newAccessToken)

                // Gắn token mới vào header của request cũ và gọi lại
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return apiInstance(originalRequest)

            } catch (refreshError) {
                // Nếu refresh cũng lỗi (token hết hạn hẳn/bị xóa) -> Logout
                console.log('Phiên đăng nhập hết hạn')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userInfo')
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default apiInstance