import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { authFormProps } from "./auth.hooks";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const { form, onChange, handleSubmit } = authFormProps(isLogin, setIsLogin)

    return (
        <div className="flex w-full h-screen justify-center items-center gap-20">
            <div className="w-[600px] h-[580px] border-1 shadow-md rounded-xl text-card-foreground p-4">
                <p className="text-2xl flex justify-center">{isLogin ? "Login" : "Register"}</p>
                <form className="h-full flex flex-col gap-[32px] mt-[40px] p-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[12px]">
                        <p>Username: </p>
                        <Input
                            className="h-[40px]"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={onChange} />
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <p>Password: </p>
                        <Input
                            className="h-[40px]"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={onChange} />
                    </div>
                    {!isLogin && (
                        <div className="flex flex-col gap-[12px]">
                            <p>Ulangi Password: </p>
                            <Input
                                className="h-[40px]"
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={onChange} />
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={!form.username || !form.password || (!isLogin && (form.confirmPassword !== form.password))}
                        className="w-full h-10 bg-sidebar-primary text-primary hover:bg-sidebar-primary/90 mt-6 ">
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </form>
            </div>
            <div className="flex flex-col justify-center items-center w-[600px] h-[560px] text-card-foreground p-4">
                <p className="text-3xl">Selamat Datang</p>
                <p className="text-3xl">Di sistem informasi akademik</p>
                <p className="text-xl mt-4">Silahkan login untuk melanjutkan</p>
                <div className="flex flex-col justify-center mt-4">
                    <p>{isLogin ? "Belum punya akun? " : "Sudah punya akun? "}</p>
                    <Button
                    className="bg-transparent text-primary border-1 border-sidebar-accent hover:bg-transparent rounded-3xl mt-[20px]"
                    onClick={() => setIsLogin(!isLogin)}
                    >{isLogin ? "Register" : "Login"}</Button>
                </div>
            </div>
        </div>
    )
}