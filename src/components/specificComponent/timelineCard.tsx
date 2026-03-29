import { CalendarDaysIcon, Clock } from "lucide-react"

interface TimelineCardProps {
    title: string,
    dateRange: string,
    timeRange: string
}

export default function TimelineCard({ title, dateRange, timeRange }: TimelineCardProps) {
    return (
        <div className="flex flex-col w-full gap-4 bg-card/80 border-1 border-card-foreground/20 shadow-md rounded-xl p-4 max-md:text-sm">
            <p>{title}</p>
            <div className="flex">
                <CalendarDaysIcon className="text-muted-foreground" />
                <p className="ml-2 text-muted-foreground">{dateRange}</p>
            </div>
            <div className="flex">
                <Clock className="text-muted-foreground" />
                <p className="ml-2 text-muted-foreground">{timeRange}</p>
            </div>
        </div>
    )
}