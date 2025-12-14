import { Icons } from '../components/icons';
import Button from '../components/ui/Button';

export default function Contact() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Contact <span className="text-blue-600">Us</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Have a project in mind or need assistance? Our team is here to help you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Whether you're looking for consultancy, development services, or training solutions, reach out to us. We serve clients across industries with tailored IT solutions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icons.Home size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Our Office</h4>
                                <p className="text-gray-600">
                                    123 Tech Park, Innovation Street<br />
                                    Bangalore, Karnataka, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icons.Verify size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Email Us</h4>
                                <p className="text-gray-600">contact@edinztech.com</p>
                                <p className="text-gray-600">support@edinztech.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icons.Rocket size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Call Us</h4>
                                <p className="text-gray-600">+91 999 888 7777</p>
                                <p className="text-gray-600">Mon - Fri, 9am - 6pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <Button className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
