import { type Class } from "../types/Class.type"

export async function createClass(req: Class) {
    const connection = import.meta.env.VITE_CREATE_CLASS_ENDPOINT

    const reqBody = {
        name: req.name,
        subjectId: req.subjectId,
        isHiddenLecturer: req.isHiddenLecturer,
        classCapacity: req.classCapacity
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
        throw new Error("Failed to create class")
    }

    return {message: "Class created successfully"}
}

export async function updateClass(req: Partial<Class>, classId: string) {
    const connection = import.meta.env.VITE_UPDATE_CLASS_ENDPOINT
    const reqBody = {
        name: req.name,
        subjectId: req.subjectId,
        isHiddenLecturer: req.isHiddenLecturer,
        classCapacity: req.classCapacity
    }

    const res = await fetch(connection + `/${classId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if(!res.ok) {
        throw new Error("Failed to update class")
    }

    return {message: "Class updated successfully"}
}

export async function deleteClass(classId: string) {
    const connection = import.meta.env.VITE_DELETE_CLASS_ENDPOINT
    const res = await fetch(connection + `/${classId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error("Failed to delete class")
    }

    return {message: "Class deleted successfully"}
}

export async function getLecturerClasses() {
    const connnection = import.meta.env.VITE_LECTURER_GET_OWN_CLASS_ENDPOINT

    const res = await fetch(connnection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error("Failed to get lecturer classes")
    }

    const json = await res.json()
    const data: Class[] = json.data.map((classData: any) => ({
        id: classData.id,
        name: classData.name,
        subjectId: classData.subjectId,
        lecturerName: classData.lecturerName,
        isHiddenLecturer: classData.isHiddenLecturer,
        classCapacity: classData.classCapacity,
        currentCapacity: classData.currentCapacity
    }))

    return data
}