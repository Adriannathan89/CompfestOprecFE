import { toast } from "sonner"
import { useFetchClasses } from "../hooks/useClassService"
import OpenClassDisplayCard from "../../../components/specificComponent/openClassDisplayCard"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function OpenClassChild() {
    const { classes, loading, error } = useFetchClasses()
    const router = useNavigate()

    if(error) {
        toast.error(error)
    }
    if(loading) return <p className="px-12 py-4">Loading...</p>
    
    return (
        <div className="px-12 py-8">
            <div className="flex justify-end">
                <Button
                onClick={() => router("/lecturer/class/new")}
                className="bg-primary h-[44px] text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl">Buka Kelas Baru</Button>
            </div>
            <p className="text-lg font-medium text-card-foreground">Daftar Kelas Terbuka Saya</p>
            <div className="flex flex-wrap gap-[12px] py-6">

                {classes.map((classData) => (
                    <OpenClassDisplayCard key={classData.id} classData={classData} />
                ))}
            </div>
        </div>
    )
}