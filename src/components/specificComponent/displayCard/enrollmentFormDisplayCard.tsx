import { type StudentTakingClassForm } from "@/core/types/studentTakingClassForm.type";

export default function EnrollmentFormDisplayCard({ enrollmentForm }: { enrollmentForm: StudentTakingClassForm }) {
    const className = enrollmentForm.class.name
    const dateOfFill = new Date(enrollmentForm.createdAt)
    const subjectCode = enrollmentForm.class.subject.code
    const sks = enrollmentForm.class.subject.sks
    const subjectName = enrollmentForm.class.subject.name

    const formattedDate = dateOfFill.toLocaleString("id-ID").split(", ")[0] + " " + dateOfFill.toLocaleString("id-ID").split(", ")[1].slice(0, 5)

    return (
        <div className="flex justify-center">
            <div className="flex w-[904px] bg-card h-[48px] px-4">
                <div className="flex items-center w-[20%] justify-center">
                    {subjectCode}
                </div>
                <div className="flex items-center w-[20%] justify-center">
                    {subjectName}
                </div>
                <div className="flex items-center w-[20%] justify-center">
                    {sks}
                </div>
                <div className="flex items-center w-[20%] justify-center">
                    {className}
                </div>
                <div className="ml-4 flex items-center w-[20%] justify-center">
                    {formattedDate}
                </div>
            </div>
        </div>
    )
}