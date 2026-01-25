import { useState } from 'react';
import { Project } from '../../types/project';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Edit, Trash2, ExternalLink, Star } from 'lucide-react';

interface ProjectListProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: number) => void;
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
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
            {projects.length === 0 ? (
                <Card className="p-8 text-center text-gray-500">
                    No projects yet. Add your first project!
                </Card>
            ) : (
                projects.map((project) => (
                    <Card key={project.id} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4">
                            {project.imageUrl && (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{project.title}</h3>
                                            {project.featured && (
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {project.category} • {project.date}
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(project)}
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant={deleteConfirm === project.id ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {deleteConfirm === project.id ? 'Confirm?' : 'Delete'}
                                        </Button>
                                    </div>
                                </div>

                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                >
                                    View Project
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
