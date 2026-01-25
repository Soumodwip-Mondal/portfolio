import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if already authenticated
        const authStatus = sessionStorage.getItem('admin_auth');
        if (authStatus === 'authenticated') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'authenticated');
            setError('');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <Card className="w-full max-w-md p-8">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Enter password to access admin features
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                            ← Back to Portfolio
                        </a>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            {children}
        </div>
    );
}
