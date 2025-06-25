import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
    fullname: string
    email: string
    id: number
    iat: number
    exp: number
}

export const useAuthen = () => {

    let userInfo = useCookie<JwtPayload>('user_info')

    const login = async (username: string, password: string) => {

        try {
            const runtimeConfig = useRuntimeConfig()
            const { data } = await axios.post(runtimeConfig.public.BACKEND_URL + '/auth/login', {
                username, password
            })

            const accessToken = data.accessToken
            const decoded: JwtPayload = jwtDecode(accessToken)

            const now = Math.floor(Date.now() / 1000)
            const expired = decoded.exp - now

            const cookie = useCookie('auth_token', {
                maxAge: expired,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            })

            cookie.value = accessToken
            // token.value = accessToken
            userInfo = useCookie<JwtPayload>('user_info', {
                maxAge: expired,
                path: '/',
                sameSite: 'strict',
                default: () => decoded
            })

            return data
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    const logout = () => {
        useCookie('auth_token').value = null
        navigateTo('/login');
    }

    return { userInfo, login, logout }
}