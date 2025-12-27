import { useState, useEffect, useMemo } from 'react';
import ProgramCard from '../components/ProgramCard';
import { Icons } from '../components/icons';
import { getProgramsByType } from '../lib/api';
import { getProgramStatus, getRegistrationStatus } from '../lib/programUtils';

export default function Courses() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    // Filters
    const [regStatus, setRegStatus] = useState('All');
    const [startTime, setStartTime] = useState('All');
    const [duration, setDuration] = useState('All');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await getProgramsByType('Course');
                setPrograms(data);
            } catch (err) {
                console.error("Failed to load courses", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    // Filter Logic
    const filteredPrograms = useMemo(() => {
        return programs.filter(program => {
            // 1. Tab Filter
            const status = getProgramStatus(program);
            if (activeTab !== 'All' && status !== activeTab) return false;

            // 2. Registration Status Filter
            if (regStatus !== 'All') {
                const pRegStatus = getRegistrationStatus(program);
                if (pRegStatus !== regStatus) return false;
            }

            // 3. Start Time Filter
            if (startTime !== 'All') {
                const start = new Date(program.startDate);
                const now = new Date();
                const weekFromNow = new Date();
                weekFromNow.setDate(now.getDate() + 7);
                const monthFromNow = new Date();
                monthFromNow.setMonth(now.getMonth() + 1);

                if (startTime === 'thisWeek' && (start < now || start > weekFromNow)) return false;
                if (startTime === 'thisMonth' && (start < now || start > monthFromNow)) return false;
                if (startTime === 'later' && start <= monthFromNow) return false;
            }

            // 4. Duration Filter
            if (duration !== 'All') {
                let days = 0;
                if (program.durationDays) days = program.durationDays;
                else if (program.startDate && program.endDate) {
                    const s = new Date(program.startDate);
                    const e = new Date(program.endDate);
                    days = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
                }

                if (duration === 'short' && days > 14) return false;
                if (duration === 'medium' && (days <= 14 || days > 45)) return false;
                if (duration === 'long' && days <= 45) return false;
            }

            return true;
        });
    }, [programs, activeTab, regStatus, startTime, duration]);

    const tabs = [
        { id: 'All', label: 'All Courses' },
        { id: 'Ongoing', label: 'Ongoing' },
        { id: 'Upcoming', label: 'Upcoming' },
        { id: 'Completed', label: 'Closed / Past' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-blue-900 rounded-2xl p-8 mb-8 text-white relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-blue-800 rounded-full text-sm font-semibold mb-4 border border-blue-700">
                            Learning Paths
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Master New Skills</h1>
                        <p className="text-blue-100 text-lg">
                            Comprehensive courses designed to take you from beginner to expert.
                        </p>
                    </div>
                    <Icons.Courses className="absolute right-0 bottom-0 text-white/10 w-64 h-64 translate-x-12 translate-y-12 rotate-[-15deg]" />
                </div>

                {/* Controls Section */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Tabs */}
                    <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto max-w-full">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                        <select
                            value={regStatus}
                            onChange={(e) => setRegStatus(e.target.value)}
                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="All">Registration: All</option>
                            <option value="Open">Open</option>
                            <option value="Closing Soon">Closing Soon</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <select
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="All">Start Time: Any</option>
                            <option value="thisWeek">Starting This Week</option>
                            <option value="thisMonth">Starting This Month</option>
                            <option value="later">Starting Later</option>
                        </select>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="All">Duration: Any</option>
                            <option value="short">Short (1-2 Weeks)</option>
                            <option value="medium">Medium (~1 Month)</option>
                            <option value="long">Long {`>`} 1 Month</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredPrograms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.map((program) => (
                            <ProgramCard key={program._id || program.id} program={program} showStatus={true} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                            <Icons.Search size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                        <p className="text-gray-500">Try adjusting your filters or tabs to see more results.</p>
                        <button
                            onClick={() => { setActiveTab('All'); setRegStatus('All'); setStartTime('All'); setDuration('All'); }}
                            className="mt-4 text-blue-600 font-medium hover:text-blue-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}