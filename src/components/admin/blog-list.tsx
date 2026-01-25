import { useState } from 'react';
import { Blog } from '../../types/blog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

interface BlogListProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: number) => void;
}

export function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (deleteConfirm === id) {
            onDelete(id);
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(id);
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    return (
        <div className="space-y-4">
            {blogs.length === 0 ? (
                <Card className="p-8 text-center text-gray-500">
                    No blog posts yet. Add your first post!
                </Card>
            ) : (
                blogs.map((blog) => (
                    <Card key={blog.id} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4">
                            {blog.imageUrl && (
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {blog.date} • {blog.readTime}
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {blog.categories.map((category, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(blog)}
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant={deleteConfirm === blog.id ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => handleDelete(blog.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {deleteConfirm === blog.id ? 'Confirm?' : 'Delete'}
                                        </Button>
                                    </div>
                                </div>

                                <a
                                    href={blog.mediumUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                >
                                    View on Medium
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}
