import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Icons } from '../components/icons';

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar hideNavigation={true} />
            <div className="flex flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 relative">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden absolute top-8 left-4 z-0 p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-500 hover:text-primary"
                >
                    <Icons.Menu size={24} />
                </button>

                <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-grow w-full lg:min-w-0 mt-12 lg:mt-0">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}
