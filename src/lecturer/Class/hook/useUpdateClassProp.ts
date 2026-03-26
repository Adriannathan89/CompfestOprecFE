import { updateClass } from "@/core/services/class/class.service";
import type { Class } from "@/core/types/Class.type";
import { useEffect, useState } from "react";

export default function useUpdateClassProp(classDetail: Class | null) {
    const [updatedData, setUpdatedData] = useState<Class | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (classDetail) {
            setUpdatedData(classDetail);
        }
    }, [classDetail]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "classCapacity") {
            let newValue = value;
            newValue = newValue.replace(/^0+(?=\d)/, "");
            setUpdatedData(prev => prev ? { ...prev, [name]: Number(newValue) } : null);
            return;
        }

        if(name === "isHiddenLecturer") {
            setUpdatedData(prev => prev ? { ...prev, [name]: value === "true" } : null);
            return;
        }

        setUpdatedData(prev => prev ? { ...prev, [name]: name === "classCapacity" ? Number(value) : value } : null);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            if(!updatedData) {
                setError("No data to update");
                return;
            }
            await updateClass(updatedData, String(updatedData.id));
        } catch (error) {
            setError("Failed to update class details");
        } finally {
            setLoading(false);
        }
    }

    return { updatedData, loading, error, handleInputChange, handleSubmit };
}