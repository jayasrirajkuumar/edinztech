import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen flex bg-gray-50">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-grow w-full overflow-y-auto h-screen flex flex-col">
                <AdminNavbar onToggleSidebar={toggleSidebar} />
                <div className="p-4 sm:p-8 flex-grow">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
