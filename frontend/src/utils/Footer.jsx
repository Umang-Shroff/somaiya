import React from 'react';

const navigation = {
  connect: [
    { name: 'Book Meeting', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Github', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ],
  company: [
    { name: 'Blogs', href: '/' },
    { name: 'Pricing', href: '/' },
    { name: 'Affiliate Partner', href: '/' },
    { name: 'AI For Enterprise', href: '/' },
  ],
};

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter w-full bg-black text-white"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
          {/* Logo and Description */}
          <div className="space-y-8">
            
            
            <span
              className="px-1 py-1 rounded-lg bg-black/50 border border-gray-400/60 text-white text-lg"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Elon Flask
            </span>


            <p className="text-md text-gray-300 max-w-xs mt-3 leading-6">
              Not your average company - build faster, launch sooner.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <div>Made by team Elon Flask.</div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16 mt-8 lg:mt-0">
            {/* Connect Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300">
                Connect
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-gray-300 hover:text-gray-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300">
                Company
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-gray-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-16 border-t border-gray-200/60 pt-8">
          <p className="text-xs text-gray-400">
            &copy; 2025 Elon Flask. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
