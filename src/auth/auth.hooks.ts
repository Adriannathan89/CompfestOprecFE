import { useEffect, useState } from "react";
import { login, logout, register } from "./auth.service";
import { useNavigate } from "react-router-dom";

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
                alert(err)
            })
            if(success) {
                router("/")
            }
        } else {
            if(form.password !== form.confirmPassword) {
                alert("Password dan konfirmasi password tidak cocok")
                return
            }
            const success = await register(form.username, form.password).catch(err => {
                alert(err)
            })
            
            if(success) {
                setIsLogin(true)
            }
        }
    }
    return { form, onChange, handleSubmit }
}