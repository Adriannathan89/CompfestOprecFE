import { toast } from "sonner"
import { useFetchClasses } from "@/core/hooks/useClassService"
import OpenClassDisplayCard from "@/components/specificComponent/openClassDisplayCard"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

export default function OpenClassChild() {
    const { classes, loading, error } = useFetchClasses()
    const router = useNavigate()

    if(error) {
        toast.error(error)
    }
    if(loading) return <p className="px-12 py-4">Loading...</p>
    
    return (
        <div className="w-full px-12 max-md:px-0 py-8">
            <div className="flex justify-end">
                <Button
                onClick={() => router("/lecturer/class/new")}
                className="bg-primary h-[44px] text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl max-sm:hidden">Buka Kelas Baru
                </Button>
                <button
                onClick={() => router("/lecturer/class/new")} 
                className="sm:hidden border-1 rounded-full h-[52px] w-[52px] flex justify-center items-center text-white bg-green-600 hover:bg-green-700">
                    <Plus size={32} />
                </button>
            </div>
            <p className="text-lg max-md:text-sm font-medium text-card-foreground">Daftar Kelas Terbuka Saya</p>
            <div className="flex flex-wrap gap-[12px] py-6">

                {classes.map((classData) => (
                    <OpenClassDisplayCard key={classData.id} classData={classData} />
                ))}
            </div>
        </div>
    )
}