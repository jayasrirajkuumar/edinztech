import { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Icons } from '../components/icons';
import { getAdminDashboardStats } from '../lib/api';

export default function Admin() {
    const [stats, setStats] = useState({
        students: { total: 0, invited: 0, enrolled: 0, internshipActive: 0 },
        programs: {
            totalActive: 0,
            courses: 0,
            workshops: 0,
            internships: { total: 0, active: 0, upcoming: 0, completed: 0 }
        },
        engagement: { pendingVerifications: 0, feedbacksReceived: 0, quizzesCreated: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminDashboardStats();
                // Ensure data structure matches expected state to avoid crashes
                if (data && data.students) {
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to load admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-secondary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => window.location.href = '/admin/programs/new'} className="p-4 rounded-lg border border-dashed border-gray-300 hover:border-primary hover:bg-orange-50 group flex flex-col items-center justify-center gap-2 transition-all">
                        <div className="p-2 bg-orange-100 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icons.Plus size={24} />
                        </div>
                        <span className="text-sm font-medium text-secondary">New Program</span>
                    </button>
                    <button onClick={() => window.location.href = '/admin/quizzes/new'} className="p-4 rounded-lg border border-dashed border-gray-300 hover:border-secondary hover:bg-blue-50 group flex flex-col items-center justify-center gap-2 transition-all">
                        <div className="p-2 bg-blue-100 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                            <Icons.Quiz size={24} />
                        </div>
                        <span className="text-sm font-medium text-secondary">Create Quiz</span>
                    </button>
                    <button onClick={() => window.location.href = '/admin/enrollments'} className="p-4 rounded-lg border border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 group flex flex-col items-center justify-center gap-2 transition-all">
                        <div className="p-2 bg-green-100 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Icons.Verify size={24} />
                        </div>
                        <span className="text-sm font-medium text-secondary">Verify Student</span>
                    </button>
                    <button onClick={() => window.location.href = '/admin/invite'} className="p-4 rounded-lg border border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 group flex flex-col items-center justify-center gap-2 transition-all">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Icons.UserPlus size={24} />
                        </div>
                        <span className="text-sm font-medium text-secondary">Invite Student</span>
                    </button>
                </div>
            </div>

            {/* Row 1: Student Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Total Students" value={stats.students?.total} icon={Icons.Users} color="text-blue-600 bg-blue-50" />
                <DashboardCard title="Invited Students" value={stats.students?.invited} icon={Icons.Mail} color="text-purple-600 bg-purple-50" />
                <DashboardCard title="Active Enrollments" value={stats.students?.enrolled} icon={Icons.CheckCircle} color="text-green-600 bg-green-50" />
            </div>

            {/* Row 2: Program Metrics */}
            <h2 className="text-lg font-bold text-gray-700 mt-8">Program Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Active Programs (Total)" value={stats.programs?.totalActive} icon={Icons.BookOpen} color="text-orange-600 bg-orange-50" />
                <DashboardCard title="Courses" value={stats.programs?.courses} icon={Icons.Courses} color="text-indigo-600 bg-indigo-50" />
                <DashboardCard title="Workshops" value={stats.programs?.workshops} icon={Icons.Workshops} color="text-pink-600 bg-pink-50" />
            </div>

            {/* Internship Specific Breakdown */}
            <h2 className="text-lg font-bold text-gray-700 mt-8">Internship Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Internships" value={stats.programs?.internships?.total || 0} icon={Icons.Internships} color="text-teal-600 bg-teal-50" />
                <DashboardCard title="Active & Upcoming" value={stats.programs?.internships?.active || 0} icon={Icons.CheckCircle} color="text-green-600 bg-green-50" />
                <DashboardCard title="Completed" value={stats.programs?.internships?.completed || 0} icon={Icons.Verify} color="text-gray-600 bg-gray-100" />
                <DashboardCard title="Active Students" value={stats.students?.internshipActive || 0} icon={Icons.Users} color="text-blue-600 bg-blue-50" />
            </div>

            {/* Row 3: Engagement Metrics */}
            <h2 className="text-lg font-bold text-gray-700 mt-8">System Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Pending Verifications" value={stats.engagement?.pendingVerifications} icon={Icons.Verify} color="text-red-600 bg-red-50" />
                <DashboardCard title="Quizzes Created" value={stats.engagement?.quizzesCreated} icon={Icons.Quiz} color="text-yellow-600 bg-yellow-50" />
                <DashboardCard title="Feedbacks" value={stats.engagement?.feedbacksReceived} icon={Icons.MessageSquare} color="text-cyan-600 bg-cyan-50" />
            </div>
        </div>
    );
}