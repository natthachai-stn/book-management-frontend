import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
    iat: number
    exp: number
}

export const useAuthen = () => {
    const token = useState('auth_token', () => null)

    const login = async (username: string, password: string) => {
        try {
            const runtimeConfig = useRuntimeConfig()
            const { data } = await axios.post(runtimeConfig.public.BACKEND_URL + '/auth/login', {
                username, password
            })

            const accessToken = data.accessToken
            const decoded: JwtPayload = jwtDecode(accessToken)

            const now = Math.floor(Date.now() / 1000)
            const secondsUntilExpiry = decoded.exp - now

            const cookie = useCookie('auth_token', {
                maxAge: secondsUntilExpiry,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            })

            cookie.value = accessToken
            token.value = accessToken

            return data
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    const logout = () => {
        useCookie('auth_token').value = null
        token.value = null
    }

    return { token, login, logout }
}