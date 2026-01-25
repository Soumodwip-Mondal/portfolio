import { Blog } from '../types/blog';
import { syncToGitHub } from './github-service';

const BLOGS_FILE = 'blogs.json';

/**
 * Get all blogs from JSON file
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

/**
 * Save a blog (add or update)
 */
export async function saveBlog(blog: Blog): Promise<void> {
    const blogs = await getBlogs();

    const existingIndex = blogs.findIndex(b => b.id === blog.id);

    if (existingIndex >= 0) {
        // Update existing blog
        blogs[existingIndex] = blog;
    } else {
        // Add new blog
        const maxId = Math.max(...blogs.map(b => b.id), 0);
        blog.id = maxId + 1;
        blogs.push(blog);
    }

    // Sync to GitHub
    await syncToGitHub(blogs, BLOGS_FILE);

    // Update local cache
    localStorage.setItem('blogs_cache', JSON.stringify(blogs));
}

/**
 * Delete a blog
 */
export async function deleteBlog(id: number): Promise<void> {
    const blogs = await getBlogs();
    const filtered = blogs.filter(b => b.id !== id);

    // Sync to GitHub
    await syncToGitHub(filtered, BLOGS_FILE);

    // Update local cache
    localStorage.setItem('blogs_cache', JSON.stringify(filtered));
}

/**
 * Get blog by ID
 */
export async function getBlogById(id: number): Promise<Blog | null> {
    const blogs = await getBlogs();
    return blogs.find(b => b.id === id) || null;
}
