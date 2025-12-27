import profile1 from '../assets/profile01.jpg';
import profile2 from '../assets/profile02.PNG';
import profile3 from '../assets/profile03.jpg';
import profile4 from '../assets/profile04.jpg';

export default function Team() {
    const team = [
        {
            name: "Dr. Karthiya Banu",
            role: "Founder",
            image: profile1,
            desc: "A computer science professional with 17 years of teaching experience and 14 years' experience in the field of soft skills and technical training."
        },
        {
            name: "Dr. RAVANAN R",
            role: "Mentor",
            image: profile2,
            desc: "Dr.R.RAVANAN joined Tamil Nadu Government Collegiate Service as Assistant Professor in Statistics.He serviced as a faculty in Government Arts College Tirutani and Presidency College, Chennai. He organized several workshops and conferences at Presidency College inviting Eminent Scholars like Professor S.R.S.Varadhan Abel Prize Awardee (Equivalent to Nobel Price) in Mathematics."
        },
        {
            name: "Dr. UMARANI S",
            role: "Technical Consultant",
            image: profile3,
            desc: "Encouraged students to participate and explore their talents in various inter and intra technical events (Over all Performance award received from Loyola Institute of Technology ,Chennai - 2010).Guided students in carrying out Industry Projects(Like Mobishare, Tamil Calendar, Cricket Score Board, Website Creation) , IEEE Based Research Projects and Applications Projects."
        },
        {
            name: "Sundaram N K",
            role: "Principal Consultant",
            image: profile4,
            desc: "He is a presenter of Training Programs in various Soft skills and also a Specialist Consultant in Human Resources, delivering programs and undertaking HR projects for major corporations on a range of Organisational and Human Resource issues. He is just 66 years young with 49 years experience."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-2">TEAM</h3>
                    <h2 className="text-4xl font-bold text-gray-900">CHECK OUR TEAM</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-blue-500 font-medium mb-4">{member.role}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {member.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
