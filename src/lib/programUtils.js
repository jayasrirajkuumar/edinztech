export const getProgramStatus = (program) => {
    if (!program || !program.startDate || !program.endDate) return 'Unknown';

    const now = new Date();
    const startDate = new Date(program.startDate);
    const endDate = new Date(program.endDate);

    if (now < startDate) {
        return 'Upcoming';
    } else if (now >= startDate && now <= endDate) {
        return 'Ongoing';
    } else {
        return 'Completed';
    }
};

export const getRegistrationStatus = (program) => {
    if (!program || !program.startDate) return 'Closed';

    const now = new Date();
    const startDate = new Date(program.startDate);

    // Assumption: Registration closes on start date
    // We can also check if a specific registrationEndDate exists in future schema updates
    const registrationEndDate = program.registrationEndDate ? new Date(program.registrationEndDate) : startDate;

    if (now > registrationEndDate) {
        return 'Closed';
    }

    // Check if closing soon (within 7 days of deadline)
    const sevenDaysBefore = new Date(registrationEndDate);
    sevenDaysBefore.setDate(registrationEndDate.getDate() - 7);

    if (now >= sevenDaysBefore) {
        return 'Closing Soon';
    }

    return 'Open';
};

export const isRegistrationOpen = (program) => {
    return getRegistrationStatus(program) !== 'Closed';
};

export const getDurationString = (program) => {
    if (program.duration) return program.duration;

    if (program.startDate && program.endDate) {
        const start = new Date(program.startDate);
        const end = new Date(program.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} Days`;
        const months = Math.round(diffDays / 30);
        return `${months} Month${months > 1 ? 's' : ''}`;
    }

    return 'Self-paced';
};
