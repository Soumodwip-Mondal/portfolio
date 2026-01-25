import { Project } from '../types/project';
import { syncToGitHub } from './github-service';

const PROJECTS_FILE = 'projects.json';

/**
 * Get all projects from JSON file
 */
export async function getProjects(): Promise<Project[]> {
    try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

/**
 * Save a project (add or update)
 */
export async function saveProject(project: Project): Promise<void> {
    const projects = await getProjects();

    const existingIndex = projects.findIndex(p => p.id === project.id);

    if (existingIndex >= 0) {
        // Update existing project
        projects[existingIndex] = project;
    } else {
        // Add new project
        const maxId = Math.max(...projects.map(p => p.id), 0);
        project.id = maxId + 1;
        projects.push(project);
    }

    // Sync to GitHub
    await syncToGitHub(projects, PROJECTS_FILE);

    // Update local cache
    localStorage.setItem('projects_cache', JSON.stringify(projects));
}

/**
 * Delete a project
 */
export async function deleteProject(id: number): Promise<void> {
    const projects = await getProjects();
    const filtered = projects.filter(p => p.id !== id);

    // Sync to GitHub
    await syncToGitHub(filtered, PROJECTS_FILE);

    // Update local cache
    localStorage.setItem('projects_cache', JSON.stringify(filtered));
}

/**
 * Get project by ID
 */
export async function getProjectById(id: number): Promise<Project | null> {
    const projects = await getProjects();
    return projects.find(p => p.id === id) || null;
}
