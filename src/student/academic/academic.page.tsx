export default function AcademicPage() {
    return (
        <div className="p-6 flex flex-col gap-6">
            <p className="flex justify-center text-2xl font-medium text-card-foreground">Selamat datang di menu utama Akademik</p>
            <div className="px-60 py-3">
                <div className="flex flex-col gap-4 justify-center border-1 border-card-foreground/20 shadow-md rounded-xl text-card-foreground p-4">
                    <p className="flex justify-start text-lg">Berita/Pengumuman</p>
                </div>
            </div>
        </div>
    )
}