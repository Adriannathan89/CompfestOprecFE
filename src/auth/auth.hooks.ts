import { useEffect, useState } from "react";
import { login, logout, register } from "./service/auth.service";
import { useNavigate } from "react-router-dom";
import { validate } from "./service/auth-validate.service";
import { toast } from "sonner";
import { getSelfInfo } from "./service/get-self-info.service";

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
                toast.error(err)
            })
            if (success) {
                await validate().then((res) => {
                    if (res === "Tier-1") {
                        router("/lecturer")
                    } else if (res === "Tier-2") {
                        router("/student")
                    }
                }).catch(err => {
                    toast.error(err)
                })
            }
        } else {
            if (form.password !== form.confirmPassword) {
                toast.error("Password dan konfirmasi password tidak cocok")
                return
            }
            const success = await register(form.username, form.password).catch(err => {
                toast.error(err)
            })

            if (success) {
                setIsLogin(true)
            }
        }
    }
    return { form, onChange, handleSubmit }
}

export function useAuthValidation() {
    const [lecturerValidated, setLecturerValidated] = useState<boolean>(true)
    const [studentValidated, setStudentValidated] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const validateAuth = async () => {
            await validate().then((res) => {
                if (res === "Tier-1") {
                    setLecturerValidated(true)
                } else if (res === "Tier-2") {
                    setStudentValidated(true)
                    setLecturerValidated(false)
                } 
            }).catch(err => {
                toast.error(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        validateAuth()
    }, [])

    return { lecturerValidated, studentValidated, loading }
}

export function getSelf() {
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        const fetchSelfInfo = async () => {
            getSelfInfo().then(res => {
                setUsername(res)
            }).catch(err => {
                toast.error(err)
            })
        }
        fetchSelfInfo()
    }, [])

    return { username }
}