import { useState, useEffect } from 'react';
import ProgramGrid from '../components/dashboard/ProgramGrid';
import { getMyEnrollments } from '../lib/api';
import { getProgramStatus } from '../lib/programUtils';

export default function DashboardInternships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const enrollments = await getMyEnrollments();
                const myInternships = enrollments
                    .filter(e => {
                        const type = e.programType || e.program?.type;
                        return type === 'Internship';
                    })
                    .map(e => ({
                        ...(e.program || {}),
                        enrollmentStatus: e.status, // rename to avoid conflict with derived status
                        status: e.status, // Keep for legacy
                        derivedStatus: getProgramStatus(e.program), // 'Upcoming', 'Ongoing', 'Completed'
                        progress: e.progressPercent
                    }));
                setInternships(myInternships);
            } catch (err) {
                console.error("Failed to load internships", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    // Grouping
    const ongoing = internships.filter(i => i.derivedStatus === 'Ongoing');
    const upcoming = internships.filter(i => i.derivedStatus === 'Upcoming');
    const completed = internships.filter(i => i.derivedStatus === 'Completed');

    // If no internships at all
    if (internships.length === 0) {
        return (
            <ProgramGrid
                title="My Internships"
                programs={[]}
                type="internships"
                emptyMessage="You haven't enrolled in any internships yet."
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {ongoing.length > 0 && (
                <ProgramGrid
                    title="Ongoing Internships"
                    programs={ongoing}
                    type="internships"
                />
            )}

            {upcoming.length > 0 && (
                <ProgramGrid
                    title="Upcoming Internships"
                    programs={upcoming}
                    type="internships"
                />
            )}

            {completed.length > 0 && (
                <ProgramGrid
                    title="Completed Internships"
                    programs={completed}
                    type="internships"
                />
            )}
        </div>
    );
}