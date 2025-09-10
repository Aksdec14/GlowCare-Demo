import React from 'react';
import logo from '../assets/images/logo-svg.svg'

const Footer = () => {
    return (
        <div id="contact">
            <footer className="bg-white text-gray-700 border-t border-gray-200">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <a href="/" className="flex items-center">
                                <img src={logo} className="h-8 mr-3" alt="SkinCare Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap">GlowCare</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
                                <ul className="font-medium space-y-4">
                                    <li>
                                        <a href="/guides" className="hover:underline">Skin Care Guides</a>
                                    </li>
                                    <li>
                                        <a href="/products" className="hover:underline">Recommended Products</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
                                <ul className="font-medium space-y-4">
                                    <li>
                                        <a href="https://instagram.com/yourhandle" className="hover:underline">Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://facebook.com/yourhandle" className="hover:underline">Facebook</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                                <ul className="font-medium space-y-4">
                                    <li>
                                        <a href="/privacy" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="/terms" className="hover:underline">Terms & Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center">
                            © 2025 <a href="/" className="hover:underline font-medium">GlowCare™</a>. All rights reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
                            <a href="https://facebook.com/yourhandle" className="text-gray-500 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/yourhandle" className="text-gray-500 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.316.975.976 1.253 2.243 1.316 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.34 2.633-1.316 3.608-.976.975-2.243 1.253-3.608 1.316-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.34-3.608-1.316-.975-.976-1.253-2.243-1.316-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.34-2.633 1.316-3.608.976-.975 2.243-1.253 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.642.443 3.678 1.407 2.713 2.372 2.4 3.505 2.342 4.782 2.284 6.062 2.27 6.471 2.27 12c0 5.529.014 5.938.072 7.218.058 1.277.371 2.41 1.336 3.375.965.965 2.098 1.278 3.375 1.336 1.28.058 1.689.072 7.218.072s5.938-.014 7.218-.072c1.277-.058 2.41-.371 3.375-1.336.965-.965 1.278-2.098 1.336-3.375.058-1.28.072-1.689.072-7.218s-.014-5.938-.072-7.218c-.058-1.277-.371-2.41-1.336-3.375-.965-.965-2.098-1.278-3.375-1.336C15.938.014 15.529 0 12 0z" />
                                    <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.164A4.002 4.002 0 1 1 16 12a4.006 4.006 0 0 1-4 4z" />
                                    <circle cx="18.406" cy="5.594" r="1.44" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/yourhandle" className="text-gray-500 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-3.179 0-5.515 3.042-4.797 6.045C7.728 8.088 4.1 6.128 1.671 3.149c-.35.602-.554 1.303-.554 2.041 0 1.411.72 2.655 1.813 3.384-.668-.021-1.297-.204-1.847-.508v.051c0 1.97 1.402 3.606 3.263 3.978-.342.092-.703.141-1.076.141-.263 0-.515-.026-.763-.074.516 1.607 2.013 2.774 3.792 2.806-1.39 1.088-3.148 1.737-5.056 1.737-.328 0-.651-.019-.971-.057 1.797 1.153 3.927 1.825 6.215 1.825 7.457 0 11.54-6.172 11.54-11.52 0-.175-.004-.349-.012-.522.793-.573 1.48-1.29 2.023-2.106z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
