import { useEffect, useState } from "react"
import type { Subject, SubjectWithClass } from "@/core/types/subject.type"
import { createSubject, updateSubject, deleteSubject, getSubjects } from "@/core/services/subject/subject.service"
import { toast } from "sonner"
import { getSubjectsWithDetails } from "../services/subject/subjectWithRelation.service"

export function useSubjectService() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createNewSubject = async (req: Subject) => {
        setLoading(true)
        setError(null)
        try {
            const res = await createSubject(req)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to create subject")
        } finally {
            setLoading(false)
        }
    }

    const updateCurrentSubject = async (req: Partial<Subject>, subjectId: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await updateSubject(req, subjectId)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to update subject")
        } finally {
            setLoading(false)
        }
    }

    const deleteCurrentSubject = async (subjectId: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await deleteSubject(subjectId)
            toast.success(res.message)
        } catch (err) {
            setError("Failed to delete subject")
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, createNewSubject, updateCurrentSubject, deleteCurrentSubject }
}

export function useFetchSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await getSubjects()
                setSubjects(res)
            } catch (err) {
                setError("Failed to fetch subjects")
            } finally {
                setLoading(false)
            }
        }
        fetchSubjects()
    }, [])

    return { subjects, loading, error }
}

export function useFetchSubjectsWithDetails() {
    const [subjects, setSubjects] = useState<SubjectWithClass[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await getSubjectsWithDetails()
                setSubjects(res)
            } catch (err) {
                setError("Failed to fetch subjects")
            } finally {
                setLoading(false)
            }
        }
        fetchSubjects()
    }, [])

    return { subjects, loading, error }
}