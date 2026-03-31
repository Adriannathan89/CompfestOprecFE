import { Input } from "@/components/ui/input";
import type { Class } from "@/core/types/Class.type";

interface UpdateClassFormProps {
    updatedData: Class,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    updateMode: boolean
}

export default function UpdateClassForm({updatedData, handleInputChange, updateMode} : UpdateClassFormProps) {
    const containerStyle = "flex flex-col p-2 gap-[8px]"
    
    return (
        <>
            <div className={containerStyle}>
                <p className="px-1">Nama Kelas: </p>
                <Input
                    onChange={handleInputChange}
                    disabled={!updateMode}
                    name="name"
                    className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                    value={updatedData.name}
                />
            </div>

            <div className={containerStyle}>
                <p className="px-1">Kapasitas Kelas: </p>
                <Input
                    onChange={handleInputChange}
                    disabled={!updateMode}
                    name="classCapacity"
                    className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                    value={updatedData.classCapacity}
                />
            </div>

            <div className={containerStyle}>
                <p>Tampilkan informasi pengajar: </p>
                <select
                    onChange={handleInputChange}
                    name="isHiddenLecturer"
                    disabled={!updateMode}
                    value={updatedData.isHiddenLecturer ? "true" : "false"}
                    className="h-[40px] shadow-md border-1 border-t border-card-foreground/20 rounded-md px-2 disabled:cursor-not-allowed">
                    <option className="bg-card" value="false">Ya</option>
                    <option className="bg-card" value="true">Tidak</option>
                </select>
            </div>
        </>
    )
}