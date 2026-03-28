import { createStudentTakingClassForm, deleteStudentTakingClassForm, getEnrollmentForm } from "../services/studentTakingClassForm/studentCreateTakingClassForm.service"
import { finalizeMyEnrollment, getClassConflict } from "../services/studentTakingClassForm/finalizeForm.service"
import { toast } from "sonner"
import type { DetailedClassConflict, StudentTakingClassForm } from "../types/studentTakingClassForm.type"
import { useEffect, useState } from "react"

export function useCreateAndDeleteStudentTakingClass() {
    const enrollClass = async (classId: string) => {
        try {
            const res = await createStudentTakingClassForm(classId)
            toast.success(res.message)
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Failed to enroll in class")
        }
    }

    const unenrollClass = async (formId: string) => {
        try {
            const res = await deleteStudentTakingClassForm(formId)
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err.message || "Failed to unenroll from class")
        }
    }

    return { enrollClass, unenrollClass }
}

export function useFinalizeEnrollment() {
    const finalizeEnrollment = async () => {
        try {
            const res = await finalizeMyEnrollment()
            toast.success(res.message)
        } catch (err: any) {
            toast.error(err.message || "Failed to finalize enrollment")
        }
    }

    return { finalizeEnrollment }
}

export function useGetConflictingClasses() {
    const [conflictingClasses, setConflictingClasses] = useState<DetailedClassConflict[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getConflictingClasses = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const res = await getClassConflict()
                setConflictingClasses(res.data)
            } catch (err: any) {
                setError(err.message || "Failed to fetch conflicting classes")
            } finally {
                setLoading(false)
            }
        }
        getConflictingClasses()

    }, [])

    return { conflictingClasses, loading, error }
}

export function useFetchEnrollmentForm() {
    const [enrollmentForm, setEnrollmentForm] = useState<StudentTakingClassForm[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEnrollmentForm = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await getEnrollmentForm()
                setEnrollmentForm(res.data)
            } catch (err: any) {
                setError(err.message || "Failed to fetch enrollment form")
            } finally {
                setLoading(false)
            }
        }
        fetchEnrollmentForm()
    }, [])

    return { enrollmentForm, loading, error }
}