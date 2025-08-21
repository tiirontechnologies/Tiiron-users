interface ICreateCourse {
    title: string;
    description: string;
    tags?: string[];
    image?: File;
    price: string;
}


interface ICourse {
    id: number;
    title: string;
    description: string;
    permaLink: string;
    tags?: string[];
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


interface ICourseCardProps {
    thumbnailSrc?: string;
    tags?: string[];
    title: string;
    chapters?: number;
    rating?: number;
    id: number;

}
export type { ICreateCourse, ICourse,ICourseCardProps }