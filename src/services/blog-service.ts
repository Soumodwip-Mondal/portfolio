import { Blog } from '../types/blog';

/**
 * Get all blogs from the public JSON file
 */
export async function getBlogs(): Promise<Blog[]> {
    try {
        const response = await fetch('/data/blogs.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading blogs:', error);
        return [];
    }
}
