interface ICreateCourse {
    title: string;
    description: string;
    tags?: string[];
    image?: File;
    price:string;
}


interface ICourse {
    id: number;
    title: string;
    description: string;
    permaLink: string;
    tags?:string[];
    image: string;
    duration: number;
    createdAt: string; // or Date if you're parsing it
    updatedAt: string; // or Date
    orgCode: string;
    _count: {
        chapters: number;
    };
    createdBy: string;
    totalChapters: number;
}


export type { ICreateCourse, ICourse }