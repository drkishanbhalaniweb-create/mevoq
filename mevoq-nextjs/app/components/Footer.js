export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-navy text-white pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                            </div>
                            <span className="text-xl font-bold">Mevoq.</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Accelerating regulatory success through expert strategy and compliance solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary-teal transition-colors">Regulatory Strategy</a></li>
                            <li><a href="#" className="hover:text-primary-teal transition-colors">IND/NDA Submissions</a></li>
                            <li><a href="#" className="hover:text-primary-teal transition-colors">Compliance Audits</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/about" className="hover:text-primary-teal transition-colors">About Us</a></li>
                            <li><a href="/blog" className="hover:text-primary-teal transition-colors">Insights</a></li>
                            <li><a href="/contact" className="hover:text-primary-teal transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Contact</h4>
                        <p className="text-sm text-gray-400 mb-2">contact@mevoq.com</p>
                        <p className="text-sm text-gray-400 mb-4">+1 (555) 123-4567</p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-primary transition-colors"></div>
                            <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-primary transition-colors"></div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {currentYear} Mevoq Pharmaceutical Consulting. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
