import { Icons } from '../components/icons';

export default function Process() {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-primary/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Our Process</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        How we deliver excellence from start to finish.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Placeholder Steps */}
                    {[
                        { title: 'Discovery', icon: Icons.Search, desc: 'We analyze your requirements and goals.' },
                        { title: 'Development', icon: Icons.Code, desc: 'We build robust and scalable solutions.' },
                        { title: 'Delivery', icon: Icons.Rocket, desc: 'We launch and support your product.' }
                    ].map((step, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
