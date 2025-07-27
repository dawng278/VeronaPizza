// frontend/src/components/Layout/Footer.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlay, FaApple } from 'react-icons/fa';
import {Link} from "react-router-dom";

// Constants for footer links (improves maintainability)
const NEED_HELP_LINKS = [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Privacy Policy', href: '#' },
];

const SUPPORT_LINKS = [
    { name: 'Account', href: '#' },
    { name: 'Order Tracking', href: '#' },
    { name: 'Wishlist', href: '#' }, // Corrected spelling
    { name: 'Locations', href: '#' },
];

// Sub-component for a list of links
const FooterLinkColumn = React.memo(({ title, links }) => (
    <div className="md:col-span-1">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <ul className="space-y-2" aria-label={`${title} links`}> {/* A11y: aria-label for list */}
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.href} className="hover:text-orange-500 transition duration-300" aria-label={link.name}>
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
));

FooterLinkColumn.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// Sub-component for App Download links
const AppDownloadLink = React.memo(({ icon: Icon, storeName, platformText, href }) => (
    <a
        href={href}
        className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 transition duration-300"
        target="_blank" // Open in new tab for external links
        rel="noopener noreferrer" // Security best practice for target="_blank"
        aria-label={`Download on ${storeName}`}
    >
        <Icon className="text-white text-2xl mr-3" />
        <div>
            <span className="text-xs">{platformText}</span>
            <p className="font-semibold text-lg">{storeName}</p>
        </div>
    </a>
));

AppDownloadLink.propTypes = {
    icon: PropTypes.elementType.isRequired, // React component type
    storeName: PropTypes.string.isRequired,
    platformText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};


const Footer = React.memo(() => { // Wrap Footer in React.memo
    return (
        <footer className="bg-gray-900 text-gray-300 py-12" role="contentinfo"> {/* A11y: role for footer */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                {/* Logo and Newsletter */}
                <div className="flex flex-col items-start md:col-span-1">
                    <Link to="/" className="text-3xl font-extrabold items-center" aria-label="Verona Pizza Home">
                        <span className="text-[#FFC107]">VERO</span>
                        <span className="text-[#F44336]">NA</span> <br/>
                        <span className="text-white ml-1">PIZZA</span>
                    </Link>
                    <p className="text-sm mb-4">
                        A new dish that directly hits your palate with a delightful taste of the original pizza and selected beverages. Order now and enjoy!
                    </p>
                    <p className="font-semibold mb-2">Subscribe to our newsletter</p>
                    <form className="flex w-full" aria-label="Newsletter subscription"> {/* A11y: form for newsletter */}
                        <label htmlFor="newsletter-email" className="sr-only">Enter your email for newsletter</label> {/* A11y: hidden label */}
                        <input
                            id="newsletter-email" // Connect label to input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
                            aria-required="true" // Indicate required field
                        />
                        <button
                            type="submit" // Specify button type
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md"
                            aria-label="Send newsletter subscription"
                        >
                            <i className="fas fa-arrow-right sr-only">Send</i> {/* A11y: add text for icon */}
                            {/* If you use Font Awesome without a dedicated React component,
                                ensure 'fas fa-arrow-right' is properly rendered.
                                For react-icons, you'd typically import like FaArrowRight.
                                For simplicity, I'll assume this is from a global stylesheet for now.
                            */}
                            Send {/* If not using a separate arrow icon, keep this text */}
                        </button>
                    </form>
                </div>

                {/* Need Help */}
                <FooterLinkColumn title="Need Help" links={NEED_HELP_LINKS} />

                {/* Support */}
                <FooterLinkColumn title="Support" links={SUPPORT_LINKS} /> {/* Corrected to SUPPORT_LINKS */}

                {/* Connect With Us */}
                <div className="md:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
                    <div className="flex space-x-4 mb-6" aria-label="Social media links">
                        <a href="#" className="text-gray-400 hover:text-orange-500 transition duration-300 text-2xl" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 transition duration-300 text-2xl" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 transition duration-300 text-2xl" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                    <p className="text-lg font-semibold mb-2">Download Our App</p>
                    <div className="flex flex-col space-y-3">
                        <AppDownloadLink
                            icon={FaApple}
                            storeName="App Store"
                            platformText="Download on the"
                            href="#"
                        />
                        <AppDownloadLink
                            icon={FaGooglePlay}
                            storeName="Google Play"
                            platformText="GET IT ON"
                            href="#"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-8 text-sm">
                &copy; {new Date().getFullYear()} Verona Pizza. All Rights Reserved. Designed by You!
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer'; // For React DevTools

export default Footer;