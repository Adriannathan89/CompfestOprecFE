import { useState } from "react";
import type { Class } from "../../../core/types/Class.type";

export function useNewClassProp(CreateNewClass: (req: Class) => Promise<void>) {
    const [form, setForm] = useState<Partial<Class>>({
        name: "",
        subjectId: "",
        classCapacity: 0,
        isHiddenLecturer: false
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "classCapacity") {
            let newValue = value
            newValue = newValue.replace(/^0+(?=\d)/, "").replace(/\D/g, "");

            setForm({
                ...form,
                classCapacity: Number(newValue)
            })
            return
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "isHiddenLecturer") {
            setForm({
                ...form,
                isHiddenLecturer: value === "true"
            })
            return
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        CreateNewClass(form as Class)
    }

    return { form, onChange, onSelectChange, handleSubmit }
}