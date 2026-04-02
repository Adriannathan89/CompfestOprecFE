import type { StudentTakingClassForm,  StudentTakingClassFormDetailed } from "@/core/types/studentTakingClassForm.type"

export async function createStudentTakingClassForm(classId: string) {
    const connection = import.meta.env.VITE_ENROLL_CLASS_ENDPOINT
    const reqBody = {
        classId: classId
    }

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to enroll in class")
    }

    const json = await res.json()

    return {message: "Enrolled in class successfully", data: json.data}
}

export async function deleteStudentTakingClassForm(formId: string) {
    const connection = `${import.meta.env.VITE_UNENROLL_CLASS_ENDPOINT}/${formId}`

    const res = await fetch(connection, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to unenroll from class")
    }

    const json = await res.json()

    return {message: "Unenrolled from class successfully", data: json.data}
}

export async function getEnrollmentForm() {
    const connection = import.meta.env.VITE_GET_ENROLLMENT_FORM_ENDPOINT
    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    const json = await res.json()

    if(!res.ok) {
        throw new Error(json.message || "Failed to get enrollment form")
    }

    const data: StudentTakingClassForm[] = json.data.map((formData: any) => ({
        id: formData.id,
        classId: formData.classId,
        studentId: formData.studentId,
        takingPosition: formData.takingPosition,
        isFinalized: formData.isFinalized,
        createdAt: new Date(formData.createdAt),
        class: {
            id: formData.class.id,
            name: formData.class.name,
            subjectId: formData.class.subjectId,
            isHiddenLecturer: formData.class.isHiddenLecturer,
            classCapacity: formData.class.classCapacity,
            currentCapacity: formData.class.currentCapacity,
            lecturerName: formData.class.lecturerName,
            subject: {
                id: formData.class.subject.id,
                name: formData.class.subject.name,
                sks: formData.class.subject.sks,
                code: formData.class.subject.code,
            }
        }
    }))
    return {message: "Enrollment form retrieved successfully", data: data}
}

export async function getEnrollmentFormDetail(formId: string) {
    const connection = `${import.meta.env.VITE_GET_ENROLLMENT_FORM_DETAIL_ENDPOINT}/${formId}`

    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get enrollment form detail")
    }

    const json = await res.json()

    const formData = json.data

    const enrollmentFormDetail: StudentTakingClassFormDetailed = {
        id: formData.id,
        classId: formData.classId,
        studentId: formData.studentId,
        takingPosition: formData.takingPosition,
        isFinalized: formData.isFinalized,
        createdAt: new Date(formData.createdAt),
        class: {
            name: formData.class.name,
        },
        student: {
            username: formData.student.username
        },
    }
    return {message: "Enrollment form detail retrieved successfully", data: enrollmentFormDetail}
}

