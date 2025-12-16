import logo from '../assets/logo.svg';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-text-light">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <img src={logo} alt="EdinzTech" className="h-10" />
                </div>
                <p>© 2024 EdinzTech. All rights reserved.</p>
            </div>
        </footer>
    );
}
