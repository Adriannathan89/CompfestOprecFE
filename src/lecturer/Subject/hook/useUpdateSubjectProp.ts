import { useSubjectService } from "@/core/hooks/useSubjectService";
import { getSubjectById } from "@/core/services/subject/subjectWithRelation.service";
import type { Subject, SubjectWithClass } from "@/core/types/subject.type";
import { useEffect, useState } from "react";

export default function useUpdateSubjectProp(subjectId: string) {
    const [subject, setSubject] = useState<SubjectWithClass | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { updateCurrentSubject, deleteCurrentSubject } = useSubjectService()
    
    useEffect(() => {
        const fetchSubject = async () => {
            setLoading(true);
            setError(null);
            try {
                getSubjectById(subjectId).then(res => setSubject(res));
            } catch (error: any) {
                setError(error.message || "Failed to fetch subject details");
            } finally {
                setLoading(false);
            }
        }

        if(subjectId) {
            fetchSubject();
        }
    }, [subjectId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === "semesterTaken" || name === "sks") {
            let newValue = value;
            newValue = newValue.replace(/^0+(?=\d)/, "").replace(/\D/g, "");
            setSubject(prev => prev ? { ...prev, [name]: Number(newValue) } : null);
            return;
        }

        setSubject(prev => prev ? { ...prev, [name]: value } : null);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!subject) {
            setError("No subject data to update");
            return;
        }

        const newSubjectForm: Subject = {
            name: subject.name,
            code: subject.code,
            semesterTaken: subject.semesterTaken,
            sks: subject.sks,
        }
        await updateCurrentSubject(newSubjectForm, String(subject.id));
    }

    const handleDelete = async () => {
        if(!subject) {
            setError("No subject data to delete");
            return;
        }
        await deleteCurrentSubject(String(subject.id));
    }

    return { subject, loading, error, handleInputChange, handleSubmit, handleDelete };
}