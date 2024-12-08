export interface Project {
    id: string;
    title: string;
    description: string;
    url: string;
    technologies: { id: string, technologiesId: string, proyectId: string, created_at: Date }[];
    images: { url: string, external_id: string, id: string }[];
    created_at: Date
}

export interface Course {
    id: string;
    course: string;
    description: string;
    certificate: string;
    date: string;
    images: { url: string, external_id: string, id: string }[];
}

export interface Experience {
    id: string
    title: string
    job: string
    description: string
    start_date: string
    end_date: string
    technologies: { id: string, technologiesId: string, experienceId: string, created_at: Date }[]
}


export interface Technologies {
    id: string
    name: string,
    created_at: Date
}

interface Techs_experience { 
    id: string, 
    technologiesId: string, 
    experienceId: string, 
    created_at: Date 
}[]