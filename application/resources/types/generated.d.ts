declare namespace App.DataTransferObjects {
    export type AuthUserData = {
        id: number;
        name: string;
        email: string;
        role?: string;
        role_label?: string;
        department_id?: number;
        student_number?: string;
        department?: App.DataTransferObjects.DepartmentData;
        is_admin: boolean;
        is_student?: boolean;
        is_technical_mentor?: boolean;
        is_department_head?: boolean;
        is_super_admin?: boolean;
    };
    export type CohortData = {
        id: number;
        title: string;
        cohort_number: string;
        duration_weeks: number;
        max_students: number;
        current_students: number;
        department_id: number;
        course_id: number;
        start_date: string;
        end_date: string;
        status: string;
        is_active: boolean;
        available_spots?: number;
        completion_percentage?: number;
        is_currently_active?: boolean;
        created_at?: string;
        updated_at?: string;
    };
    export type CourseData = {
        id: number;
        name: string;
        description?: string;
        department_id: number;
        duration_weeks?: number;
        price?: number;
        is_active: boolean;
        created_at?: string;
        updated_at?: string;
    };
    export type DepartmentData = {
        id: number;
        name: string;
        description?: string;
        department_head_id?: number;
        is_active: boolean;
        created_at?: string;
        updated_at?: string;
    };
    export type RoleOptionData = {
        value: string;
        label: string;
    };
    export type UserData = {
        id: number;
        name: string;
        email: string;
        role?: string;
        role_label?: string;
        department_id?: number;
        cohort_id?: number;
        student_number?: string;
        phone_number?: string;
        profile_image?: string;
        date_of_birth?: string;
        bio?: string;
        status?: string;
        last_login?: string;
        email_verified_at?: string;
        is_admin: boolean;
        is_student?: boolean;
        is_technical_mentor?: boolean;
        is_department_head?: boolean;
        is_super_admin?: boolean;
        created_at?: string;
        updated_at?: string;
    };
}
