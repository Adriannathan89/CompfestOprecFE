export type Subject = {
    id?: string,
    name: string,
    code: string,
    sks: number,
    semesterTaken: number,
}

export async function createSubject(subject: Subject) {
    const connection = import.meta.env.VITE_CREATE_SUBJECT_ENDPOINT

    const reqBody = {
        name: subject.name,
        code: subject.code,
        sks: subject.sks,
        semesterTaken: subject.semesterTaken
    }

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error("Failed to create subject")
    }

    return {message: "Subject created successfully"}
}

export async function updateSubject(subject: Partial<Subject>, subjectId: string) {
    const connection = import.meta.env.VITE_UPDATE_SUBJECT_ENDPOINT

    const reqBody = {
        name: subject.name,
        code: subject.code,
        sks: subject.sks,
        semesterTaken: subject.semesterTaken
    }

    const res = await fetch(connection + `/${subjectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error("Failed to update subject")
    }

    return {message: "Subject updated successfully"}
}

export async function getSubjects() {
    const connection = import.meta.env.VITE_GET_SUBJECT_ENDPOINT

    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to fetch subjects")
    }
    const json = await res.json()
    const subjects: Subject[] = json.data.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        sks: subject.sks,
        semesterTaken: subject.semesterTaken
    }))

    return subjects
}

export async function deleteSubject(subjectId: string) {
    const connection = import.meta.env.VITE_DELETE_SUBJECT_ENDPOINT

    const res = await fetch(connection + `/${subjectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to delete subject")
    }

    return {message: "Subject deleted successfully"}
}