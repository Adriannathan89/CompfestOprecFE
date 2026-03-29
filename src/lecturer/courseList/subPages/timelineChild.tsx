import TimelineCard from "@/components/specificComponent/timelineCard";


export default function TimelineChild() {
    return (
        <div className="w-full max-md:px-5 max-xl:px-5 px-20 py-12">
            <div className="flex justify-center w-full">
                <div className="flex flex-col gap-[40px] w-full xl:min-w-[800px]">
                    <p className="flex justify-center text-2xl max-sm:text-md max-xl:text-lg">Timeline Perkuliahan Semester Ganjil 2024/2025</p>
                    <TimelineCard title="Penempatan Tugas Mengajar" dateRange="1 Juni 2025 - 15 Juni 2025" timeRange="08.00 - 16.00" />
                    <TimelineCard title="Kegiatan Belajar Mengajar" dateRange="1 Agustus 2025 - 31 Oktober 2025" timeRange="08.00 - 17.10" />
                    <TimelineCard title="Ujian Tengah Semester" dateRange="1 September 2025 - 12 September 2025" timeRange="08.00 - 15.00" />
                    <TimelineCard title="Ujian Akhir Semester" dateRange="1 Desember 2025 - 12 Desember 2025" timeRange="08.00 - 15.00" />
                    <TimelineCard title="Pengisian Nilai" dateRange="16 Desember 2025 - 31 Desember 2025" timeRange="-" />
                </div>
            </div>
        </div>
    )
}