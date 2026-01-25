import { useState, useEffect } from 'react';
import { AuthGuard } from './auth-guard';
import { ProjectEditor } from './project-editor';
import { ProjectList } from './project-list';
import { BlogEditor } from './blog-editor';
import { BlogList } from './blog-list';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Plus, RefreshCw, FolderKanban, BookOpen } from 'lucide-react';
import { Project } from '../../types/project';
import { Blog } from '../../types/blog';
import { getProjects, saveProject, deleteProject } from '../../services/data-service';
import { getBlogs, saveBlog, deleteBlog } from '../../services/blog-service';

type TabType = 'projects' | 'blogs';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState<TabType>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [projectsData, blogsData] = await Promise.all([
                getProjects(),
                getBlogs()
            ]);
            setProjects(projectsData);
            setBlogs(blogsData);
        } catch (error) {
            console.error('Error loading data:', error);
            showMessage('error', 'Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    // Project handlers
    const handleSaveProject = async (project: Project) => {
        setIsSyncing(true);
        try {
            await saveProject(project);
            await loadData();
            setEditingProject(null);
            setIsAdding(false);
            showMessage('success', 'Project saved and synced to GitHub!');
        } catch (error) {
            console.error('Error saving project:', error);
            showMessage('error', 'Failed to save project. Please check your GitHub token.');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleDeleteProject = async (id: number) => {
        setIsSyncing(true);
        try {
            await deleteProject(id);
            await loadData();
            showMessage('success', 'Project deleted and synced to GitHub!');
        } catch (error) {
            console.error('Error deleting project:', error);
            showMessage('error', 'Failed to delete project');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setEditingBlog(null);
        setIsAdding(false);
    };

    // Blog handlers
    const handleSaveBlog = async (blog: Blog) => {
        setIsSyncing(true);
        try {
            await saveBlog(blog);
            await loadData();
            setEditingBlog(null);
            setIsAdding(false);
            showMessage('success', 'Blog post saved and synced to GitHub!');
        } catch (error) {
            console.error('Error saving blog:', error);
            showMessage('error', 'Failed to save blog post.');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleDeleteBlog = async (id: number) => {
        setIsSyncing(true);
        try {
            await deleteBlog(id);
            await loadData();
            showMessage('success', 'Blog post deleted and synced to GitHub!');
        } catch (error) {
            console.error('Error deleting blog:', error);
            showMessage('error', 'Failed to delete blog post');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleEditBlog = (blog: Blog) => {
        setEditingBlog(blog);
        setEditingProject(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingProject(null);
        setEditingBlog(null);
        setIsAdding(false);
    };

    const handleAddNew = () => {
        setIsAdding(true);
        setEditingProject(null);
        setEditingBlog(null);
    };

    const currentCount = activeTab === 'projects' ? projects.length : blogs.length;
    const isEditing = activeTab === 'projects' ? (isAdding || editingProject) : (isAdding || editingBlog);

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Portfolio Content Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your projects and blog posts. Changes are automatically synced to GitHub.
                        </p>
                    </div>

                    {/* Notifications */}
                    {message && (
                        <Card className={`p-4 mb-6 ${message.type === 'success'
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            }`}>
                            <p className={message.type === 'success' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}>
                                {message.text}
                            </p>
                        </Card>
                    )}

                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setActiveTab('projects');
                                    handleCancel();
                                }}
                                className={`pb-3 px-4 flex items-center gap-2 font-medium transition-colors border-b-2 ${activeTab === 'projects'
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                <FolderKanban className="w-4 h-4" />
                                Projects ({projects.length})
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('blogs');
                                    handleCancel();
                                }}
                                className={`pb-3 px-4 flex items-center gap-2 font-medium transition-colors border-b-2 ${activeTab === 'blogs'
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                <BookOpen className="w-4 h-4" />
                                Blog Posts ({blogs.length})
                            </button>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Total {activeTab === 'projects' ? 'Projects' : 'Blog Posts'}: <strong>{currentCount}</strong>
                            </span>
                            {isSyncing && (
                                <span className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Syncing to GitHub...
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={loadData}
                                variant="outline"
                                disabled={isLoading || isSyncing}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>

                            {!isEditing && (
                                <Button
                                    onClick={handleAddNew}
                                    disabled={isSyncing}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add New {activeTab === 'projects' ? 'Project' : 'Blog Post'}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <>
                            {activeTab === 'projects' ? (
                                <>
                                    {(isAdding || editingProject) && (
                                        <div className="mb-8">
                                            <ProjectEditor
                                                project={editingProject}
                                                onSave={handleSaveProject}
                                                onCancel={handleCancel}
                                            />
                                        </div>
                                    )}

                                    {!isAdding && !editingProject && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
                                            <ProjectList
                                                projects={projects}
                                                onEdit={handleEditProject}
                                                onDelete={handleDeleteProject}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {(isAdding || editingBlog) && (
                                        <div className="mb-8">
                                            <BlogEditor
                                                blog={editingBlog}
                                                onSave={handleSaveBlog}
                                                onCancel={handleCancel}
                                            />
                                        </div>
                                    )}

                                    {!isAdding && !editingBlog && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Your Blog Posts</h2>
                                            <BlogList
                                                blogs={blogs}
                                                onEdit={handleEditBlog}
                                                onDelete={handleDeleteBlog}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Footer Info */}
                    <Card className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold mb-2">ℹ️ How it works</h3>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <li>• All changes are immediately synced to your GitHub repository</li>
                            <li>• Projects are stored in <code className="bg-white dark:bg-gray-800 px-1 rounded">public/data/projects.json</code></li>
                            <li>• Blog posts are stored in <code className="bg-white dark:bg-gray-800 px-1 rounded">public/data/blogs.json</code></li>
                            <li>• Blog posts redirect to your Medium articles when clicked</li>
                            <li>• Make sure your GitHub token has repository write permissions</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </AuthGuard>
    );
}
