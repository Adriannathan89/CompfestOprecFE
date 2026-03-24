import { useState } from "react"
import { createClass, deleteClass, updateClass, type Class } from "../service/class.service"
import { toast } from "sonner"

export default function useClassService() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createNewClass = async (req: Class) => {
        setLoading(true)
        setError(null)
        try {
            const res = await createClass(req)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to create class")
        } finally {
            setLoading(false)
        }
    }

    const updateCurrentClass = async (req: Partial<Class>, classId: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await updateClass(req, classId)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to update class")
        } finally {
            setLoading(false)
        }
    }

    const deleteCurrentClass = async (classId: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await deleteClass(classId)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to delete class")
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, createNewClass, updateCurrentClass, deleteCurrentClass }
}