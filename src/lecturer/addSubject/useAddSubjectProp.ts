import type { Subject } from "../courseList/service/subject.service";
import { type ChangeEvent, useState } from "react";


export function useAddSubjectProp(createNewSubject: (req: Subject) => void) {
    const [form, setForm] = useState<Subject>({
        name: '',
        code: '',
        sks: 1,
        semesterTaken: 1,
    })
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "sks") {
            let newValue = value

            newValue = newValue.replace(/^0+(?=\d)/, "")

            setForm({
                ...form,
                sks: Number(newValue)
            })
            return
        }

        if (name === "semesterTaken") {
            let newValue = value

            newValue = newValue.replace(/^0+(?=\d)/, "")
            setForm({
                ...form,
                semesterTaken: Number(newValue)
            })
            return
        }

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        createNewSubject({
            ...form,
        })
    }

    return { form, onChange, handleSubmit }
}