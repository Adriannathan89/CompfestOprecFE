import { Input } from "@/components/ui/input"
import type { ScoringComponent } from "@/core/types/scoringComponent.type"

interface ScoringComponentDisplayCardProps {
    scoringComponent: ScoringComponent
    handleInputChange: (componentId: string, e: React.ChangeEvent<HTMLInputElement>) => void
    handleDeleteComponent: (componentId: string) => void
    isEdit: boolean
}

export default function ScoringComponentDisplayCard({ scoringComponent, isEdit, handleInputChange, handleDeleteComponent }: ScoringComponentDisplayCardProps) {
    return (
        <div className="w-full flex justify-between items-center px-4 py-2 rounded-lg gap-2">
            <div className="w-full items-center flex flex-col gap-2 md:flex-row md:gap-4">
                <Input
                    value={scoringComponent.name}
                    name="name"
                    disabled={!isEdit}
                    className="bg-transparent border-1 border-card-foreground/20"
                    onChange={(e) => handleInputChange(scoringComponent.id, e)}
                />
                <div className="relative w-full">
                    <Input
                        value={scoringComponent.weight}
                        name="weight"
                        disabled={!isEdit}
                        className="bg-transparent border-1 border-card-foreground/20"
                        onChange={(e) => handleInputChange(scoringComponent.id, e)}
                    />
                    <span className="absolute right-0 top-0 h-full flex items-center pr-3 text-sm text-muted-foreground">%</span>
                </div>
            </div>
            {isEdit && (
                <button
                    onClick={() => handleDeleteComponent(scoringComponent.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            )}
        </div>
    )
}