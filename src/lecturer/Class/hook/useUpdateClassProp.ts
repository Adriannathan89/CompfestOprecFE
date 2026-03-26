import { updateClass } from "@/core/services/class/class.service";
import type { Class } from "@/core/types/Class.type";
import { useState } from "react";

export default function useUpdateClassProp() {
    const [updatedData, setUpdatedData] = useState<Class>({} as Class);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            await updateClass(updatedData, String(updatedData.id));
        } catch (error) {
            setError("Failed to update class details");
        } finally {
            setLoading(false);
        }
    }

    return { updatedData, loading, error, handleInputChange, handleSubmit };
}