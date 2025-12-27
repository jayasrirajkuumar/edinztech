import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icons } from './icons';
import logo from '../assets/logo.svg';
import inspire from '../assets/inspire.svg';

const NavItem = ({ to, children, icon: Icon }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-text hover:border-primary hover:text-primary'
            }`
        }
    >
        {Icon && <Icon size={18} className="text-secondary" />}
        {children}
    </NavLink>
);

export default function Navbar({ hideNavigation = false }) {
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // ... (keep existing useEffects)

    // Scroll to top when mobile menu opens
    useEffect(() => {
        if (isMobileMenuOpen) {
            window.scrollTo(0, 0);
        }
    }, [isMobileMenuOpen]);


    useEffect(() => {
        const checkUser = () => {
            const userInfoString = localStorage.getItem('userInfo');
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                setUser(userInfo?.user || userInfo);
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsProfileOpen(false);
        navigate('/login');
    };

    const handleMouseEnter = (name) => {
        setActiveDropdown(name);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between h-20">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="EdinzTech" className="h-16" />
                        </Link>
                        {hideNavigation && (
                            <span className="hidden lg:block text-xl font-bold text-gray-700">
                                Welcome to Student Dashboard
                            </span>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden gap-4">
                        <div className="border-l border-gray-200 h-8 flex items-center pl-4">
                            <img src={inspire} alt="Inspire" className="h-10" />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-500 hover:text-primary focus:outline-none"
                        >
                            <Icons.Menu size={24} />
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex gap-5 items-center">
                        {!hideNavigation && (
                            <>
                                <NavItem to="/" icon={Icons.Home}>Home</NavItem>
                                <NavItem to="/internships" icon={Icons.Internships}>Internships</NavItem>

                                {/* Learning Programs Dropdown */}
                                <div
                                    className="relative group h-full flex items-center"
                                    onMouseEnter={() => handleMouseEnter('learning')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text hover:text-primary border-b-2 border-transparent transition-all duration-200">
                                        <Icons.Learning size={18} className="text-secondary" />
                                        Learning Programs
                                        <Icons.ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'learning' ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-full left-0 w-48 bg-white rounded-b-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 transform origin-top ${activeDropdown === 'learning' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 invisible'}`}>
                                        <Link to="/workshops" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                                            Workshops
                                        </Link>
                                        <Link to="/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                                            Courses
                                        </Link>
                                    </div>
                                </div>

                                <NavItem to="/projects" icon={Icons.Project}>Projects</NavItem>

                                {/* About Us Dropdown */}
                                <div
                                    className="relative group h-full flex items-center"
                                    onMouseEnter={() => handleMouseEnter('about')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text hover:text-primary border-b-2 border-transparent transition-all duration-200">
                                        <Icons.Users size={18} className="text-secondary" />
                                        About Us
                                        <Icons.ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-full left-0 w-48 bg-white rounded-b-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 transform origin-top ${activeDropdown === 'about' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 invisible'}`}>
                                        <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                                            About Company
                                        </Link>
                                        <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                                            Services
                                        </Link>
                                        <Link to="/process" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                                            Our Process
                                        </Link>
                                    </div>
                                </div>

                                <NavItem to="/contact" icon={Icons.Contact}>Contact</NavItem>
                            </>
                        )}

                        <div className={`relative ${!hideNavigation ? 'ml-4 pl-4 border-l border-gray-200' : ''}`} ref={dropdownRef}>
                            {user ? (
                                <div>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text hover:text-primary transition-colors focus:outline-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Icons.User size={18} />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="leading-none">{user.name || 'User'}</span>
                                        </div>
                                        <Icons.ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">ID: {user._id?.slice(-6).toUpperCase()}</p>
                                            </div>

                                            <div className="py-1">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <Icons.Dashboard size={16} />
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    to="/dashboard/courses"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <Icons.Courses size={16} />
                                                    My Courses
                                                </Link>
                                            </div>

                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <Icons.LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm font-medium">
                                        <Icons.Login size={18} className="text-white" />
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>

                        {hideNavigation && (
                            <div className="ml-4 pl-4 border-l border-gray-200">
                                <button
                                    onClick={() => {
                                        if (window.confirm('If you go back to the website, your account will be logged out. Are you sure?')) {
                                            localStorage.removeItem('userInfo');
                                            setUser(null);
                                            navigate('/');
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                                >
                                    <Icons.ArrowLeft size={16} />
                                    Back to Website
                                </button>
                            </div>
                        )}
                        <div className="ml-4 pl-4 border-l border-gray-200 h-10 flex items-center">
                            <img src={inspire} alt="Inspire" className="h-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
                        {!hideNavigation ? (
                            <>
                                <NavItem to="/" icon={Icons.Home}>Home</NavItem>
                                <NavItem to="/internships" icon={Icons.Internships}>Internships</NavItem>

                                {/* Learning Programs Dropdown Mobile */}
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === 'learning' ? null : 'learning')}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icons.Learning size={18} className="text-secondary" />
                                            Learning Programs
                                        </div>
                                        <Icons.ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform duration-200 ${activeDropdown === 'learning' ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-200 ${activeDropdown === 'learning' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-8 space-y-1 border-l-2 border-gray-100 ml-4 py-1">
                                            <Link
                                                to="/workshops"
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Workshops
                                            </Link>
                                            <Link
                                                to="/courses"
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Courses
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <NavItem to="/projects" icon={Icons.Project}>Projects</NavItem>

                                {/* Mobile About Dropdown */}
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icons.Users size={18} className="text-secondary" />
                                            About Us
                                        </div>
                                        <Icons.ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform duration-200 ${isMobileAboutOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Collapsible Content */}
                                    <div className={`overflow-hidden transition-all duration-200 ${isMobileAboutOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-8 space-y-1 border-l-2 border-gray-100 ml-4 py-1">
                                            <Link
                                                to="/about"
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                About Company
                                            </Link>
                                            <Link
                                                to="/services"
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Services
                                            </Link>
                                            <Link
                                                to="/process"
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Our Process
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <NavItem to="/contact" icon={Icons.Contact}>Contact</NavItem>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    if (window.confirm('If you go back to the website, your account will be logged out. Are you sure?')) {
                                        localStorage.removeItem('userInfo');
                                        setUser(null);
                                        navigate('/');
                                    }
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg mb-2"
                            >
                                <Icons.ArrowLeft size={18} />
                                Back to Website
                            </button>
                        )}

                        <div className="border-t border-gray-100 mt-2 pt-2 pb-10">
                            {user ? (
                                <>
                                    <div className="px-3 py-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Icons.User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link to="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary">Dashboard</Link>
                                        <Link to="/dashboard/courses" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary">My Courses</Link>
                                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:text-red-700">Logout</button>
                                    </div>
                                </>
                            ) : (
                                <div className="px-3 py-2">
                                    <Link to="/login">
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm font-medium">
                                            <Icons.Login size={18} className="text-white" />
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
