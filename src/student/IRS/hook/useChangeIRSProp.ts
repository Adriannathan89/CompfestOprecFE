import { useCreateAndDeleteStudentTakingClass, useFetchEnrollmentForm } from "@/core/hooks/StudentTakingForm.hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useChangeIRSProp() {
    const [registerClassId, setRegisterClassId] = useState<string[]>([]);
    const [intitialSelectedClassId, setInitialSelectedClassId] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { enrollmentForm } = useFetchEnrollmentForm();
    const { enrollClass, unenrollClass } = useCreateAndDeleteStudentTakingClass();
    const router = useNavigate();

    useEffect(() => {
        if(!enrollmentForm) return;

        const initialSelectedClasses = enrollmentForm.map(form => String(form.class.id));
        setRegisterClassId(initialSelectedClasses);
        setInitialSelectedClassId(initialSelectedClasses);
    }, [enrollmentForm]);

    const handleClickRadio = (classId: string, classGroupIds: string[]) => {
        setRegisterClassId((prev) => {
            const nextId = String(classId);
            const group = new Set(classGroupIds.map(String));

            const withoutSameSubject = prev.filter((id) => !group.has(String(id)));

            const isCurrentlySelected = prev.includes(nextId);
            if (isCurrentlySelected) return withoutSameSubject;

            return [...withoutSameSubject, nextId];
        });
    };

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        const toBeEnrolled = registerClassId.filter(id => !intitialSelectedClassId.includes(id));
        const tobeUnenrolled = intitialSelectedClassId.filter(id => !registerClassId.includes(id));

        try {
            await Promise.all([
                ...toBeEnrolled.map((classId) => enrollClass(classId)),
                ...tobeUnenrolled.map((classId) => unenrollClass(classId))
            ]);
            router("/student/irs/finalize");
        } catch (err: any) {
            setError(err.message || "Failed to enroll in selected classes");
        } finally {
            setLoading(false);
        }
    };

    return { registerClassId, loading, error, handleClickRadio, handleClick };
}