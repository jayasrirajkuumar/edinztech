import { Icons } from '../components/icons';

export default function Services() {
    const services = [
        {
            title: "Web Development",
            desc: "Custom websites and web applications built with modern frameworks like React and Node.js. We ensure high performance, responsiveness, and SEO optimization.",
            icon: Icons.Courses // Placeholder icon
        },
        {
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile apps for iOS and Android. We create seamless user experiences that engage your audience on the go.",
            icon: Icons.Rocket
        },
        {
            title: "Cloud Solutions",
            desc: "Scalable cloud infrastructure design, migration, and management on AWS, Azure, and Google Cloud. Enhance security and reduce operational costs.",
            icon: Icons.Internships
        },
        {
            title: "AI & Automation",
            desc: "Leverage Artificial Intelligence and Machine Learning to automate processes, analyze data, and gain predictive insights for your business.",
            icon: Icons.Workshops
        },
        {
            title: "Digital Marketing",
            desc: "Data-driven marketing strategies including SEO, SEM, and social media management to increase your brand visibility and drive conversions.",
            icon: Icons.Verify
        },
        {
            title: "Enterprise Solutions",
            desc: "Robust ERP, CRM, and custom software solutions tailored to streamline complex business workflows and improve organizational efficiency.",
            icon: Icons.Home
        }
    ];

    return (
        <div className="space-y-16 py-12">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    Our <span className="text-blue-600">Services</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive technology services designed to help your business innovate, scale, and succeed in a digital-first world.
                </p>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <service.icon size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-16 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-gray-300 text-lg mb-8">
                        Let's discuss how our technology solutions can address your unique challenges and drive growth.
                    </p>
                    {/* Link to Contact page theoretically */}
                    <a href="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
}
