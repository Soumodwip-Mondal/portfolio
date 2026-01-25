import { useState } from 'react';
import { Project } from '../../types/project';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { X } from 'lucide-react';

interface ProjectEditorProps {
    project?: Project | null;
    onSave: (project: Project) => Promise<void>;
    onCancel: () => void;
}

export function ProjectEditor({ project, onSave, onCancel }: ProjectEditorProps) {
    const [formData, setFormData] = useState<Partial<Project>>({
        id: project?.id || 0,
        title: project?.title || '',
        description: project?.description || '',
        category: project?.category || 'web',
        tags: project?.tags || [],
        image: project?.image || '',
        imageUrl: project?.imageUrl || '',
        url: project?.url || '',
        date: project?.date || new Date().getFullYear().toString(),
        featured: project?.featured || false,
    });

    const [tagInput, setTagInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await onSave(formData as Project);
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...(formData.tags || []), tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags?.filter(t => t !== tag),
        });
    };

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {project ? 'Edit Project' : 'Add New Project'}
                </h2>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            required
                        >
                            <option value="web">Web</option>
                            <option value="data analysis">Data Analysis</option>
                            <option value="database">Database</option>
                            <option value="python">Python</option>
                            <option value="ml">Machine Learning</option>
                            <option value="customer segmentation">Customer Segmentation</option>
                            <option value="trend analysis">Trend Analysis</option>
                            <option value="group">Group Project</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Project URL *</label>
                        <input
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, image: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="/src/assets/image.png"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="2025"
                        />
                    </div>

                    <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Featured Project</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="Add a tag..."
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                            Add Tag
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-red-600"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Project'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
