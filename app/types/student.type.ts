import { DepartmantCode } from "../enum/departmant.enum"

export interface Student {

    masv: string,

    name: string,

    birthDate: string,

    address: string,

    position: DepartmantCode,

    gender: string, 
    
    department: string
}

export interface StudentList extends Student {
    id: number
}