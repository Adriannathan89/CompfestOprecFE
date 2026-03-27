import { useEffect, useState } from "react";
import { login, logout, register } from "../services/auth/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { validate } from "../services/auth/auth-validate.service";
import { toast } from "sonner";
import { getSelfInfo } from "../services/auth/get-self-info.service";

export function useLogoutService() {
    useEffect(() => {
        logout().catch(err => {
            alert(err)
        })
    }, [])
}

export function authFormProps(isLogin: boolean, setIsLogin: React.Dispatch<React.SetStateAction<boolean>>) {
    const router = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            const success = await login(form.username, form.password).catch(err => {
                toast.error(err.message || "Login failed")
            })

            if (success) {
                await validate().then((res) => {
                    if (res === "Tier-1") {
                        router("/lecturer")
                    } else if (res === "Tier-2") {
                        router("/student")
                    }
                }).catch(err => {
                    toast.error(err.message || "Failed to validate authentication")
                })
            }
        } else {
            if (form.password !== form.confirmPassword) {
                toast.error("Password dan konfirmasi password tidak cocok")
                return
            }
            const success = await register(form.username, form.password).catch(err => {
                toast.error(err.message || "Registration failed")
                return false
            })

            if (success) {
                setIsLogin(true)
            }
        }
    }
    return { form, onChange, handleSubmit }
}

export function useAuthValidation() {
    const [lecturerValidated, setLecturerValidated] = useState<boolean | null>(null)
    const [studentValidated, setStudentValidated] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const location = useLocation()
    
    useEffect(() => {
        let flag = false
        const validateAuth = async () => {
            await validate().then((res) => {
                if (res === "Tier-1") {
                    setLecturerValidated(true)
                    setStudentValidated(true)
                    flag = true
                } else if (res === "Tier-2") {
                    setStudentValidated(true)
                    setLecturerValidated(false)
                    flag = true
                } 
            }).catch(err => {
                toast.error(err.message || "Failed to validate authentication")
            }).finally(() => {
                setLoading(false)
                if(!flag) setLecturerValidated(false)
                if(!flag) setStudentValidated(false)
            })
        }
        validateAuth()
    }, [location.pathname])

    return { lecturerValidated, studentValidated, loading }
}

export function getSelf() {
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        const fetchSelfInfo = async () => {
            getSelfInfo().then(res => {
                setUsername(res)
            }).catch(err => {
                toast.error(err.message || "Failed to fetch user info")
            })
        }
        fetchSelfInfo()
    }, [])

    return { username }
}