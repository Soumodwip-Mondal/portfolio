export interface Project {
    id: number;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    image: string;
    imageUrl?: string;
    url: string;
    featured?: boolean;
    date?: string;
}