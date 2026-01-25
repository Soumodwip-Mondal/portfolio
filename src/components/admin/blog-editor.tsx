import { useState } from 'react';
import { Blog } from '../../types/blog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { X } from 'lucide-react';

interface BlogEditorProps {
    blog?: Blog | null;
    onSave: (blog: Blog) => Promise<void>;
    onCancel: () => void;
}

export function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
    const [formData, setFormData] = useState<Partial<Blog>>({
        id: blog?.id || 0,
        title: blog?.title || '',
        excerpt: blog?.excerpt || '',
        date: blog?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        imageUrl: blog?.imageUrl || '',
        categories: blog?.categories || [],
        readTime: blog?.readTime || '',
        mediumUrl: blog?.mediumUrl || '',
    });

    const [categoryInput, setCategoryInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await onSave(formData as Blog);
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const addCategory = () => {
        if (categoryInput.trim() && !formData.categories?.includes(categoryInput.trim())) {
            setFormData({
                ...formData,
                categories: [...(formData.categories || []), categoryInput.trim()],
            });
            setCategoryInput('');
        }
    };

    const removeCategory = (category: string) => {
        setFormData({
            ...formData,
            categories: formData.categories?.filter(c => c !== category),
        });
    };

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {blog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <label className="block text-sm font-medium mb-2">Excerpt *</label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        rows={3}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Medium URL *</label>
                        <input
                            type="url"
                            value={formData.mediumUrl}
                            onChange={(e) => setFormData({ ...formData, mediumUrl: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="https://medium.com/@username/article"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">When clicked, readers will be redirected to this Medium article</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="https://..."
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
                            placeholder="June 15, 2025"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Read Time</label>
                        <input
                            type="text"
                            value={formData.readTime}
                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="5 min read"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Categories</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                            placeholder="Add a category..."
                        />
                        <Button type="button" onClick={addCategory} variant="outline">
                            Add Category
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.categories?.map((category, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {category}
                                <button
                                    type="button"
                                    onClick={() => removeCategory(category)}
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
                        {isSaving ? 'Saving...' : 'Save Blog Post'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
