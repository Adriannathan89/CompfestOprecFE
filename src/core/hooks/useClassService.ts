import { useEffect, useState } from "react"
import { createClass, deleteClass, getLecturerClasses, updateClass } from "@/core/services/class/class.service"
import { type Class } from "@/core/types/Class.type"
import { toast } from "sonner"
import { getClassById } from "../services/class/classDetailed.service"

export function useClassService() {
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

export function useFetchClasses() {
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true)
            setError(null)

            getLecturerClasses().then(res => {
                setClasses(res)
            }).catch(err => {
                setError(err.message || "Failed to fetch classes")
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchClasses()
    }, [])

    return { classes, loading, error }
}

export function useGetClassDetail(classId: string) {
    const [classDetail, setClassDetail] = useState<Class>({} as Class)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClassDetail = async () => {
            setLoading(true)
            setError(null)
            
            getClassById(classId).then(res => {
                setClassDetail(res)
            }).catch(err => {
                setError(err.message || "Failed to fetch class details")
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchClassDetail()
    }, [classId])

    return { classDetail, loading, error }
}