import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    Finance Tracker
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="px-4 py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/transactions"
                        className="px-4 py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    >
                        Transactions
                    </Link>
                    <Link
                        to="/budget"
                        className="px-4 py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    >
                        Budget Goals
                    </Link>
                </div>

                <button
                    className="md:hidden text-white focus:outline-none transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div
                className={`absolute right-4 top-16 bg-blue-600 w-40 p-3 rounded-lg shadow-md space-y-3 transition-all ${
                    isOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 hidden"
                }`}
            >
                <Link
                    to="/"
                    className="block text-center py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                >
                    Dashboard
                </Link>
                <Link
                    to="/transactions"
                    className="block text-center py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                >
                    Transactions
                </Link>
                <Link
                    to="/budget"
                    className="block text-center py-2 font-medium hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                >
                    Budget Goals
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
