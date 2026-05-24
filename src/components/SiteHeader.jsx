import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../siteData";
import { useAuth } from "../context/AuthContext";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Om Laminates Pvt. Ltd."
        >
          <img
            src="/logo.png"
            alt="Om Laminates logo"
            className="h-12 w-auto object-contain sm:h-16"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => {
            const isActive = location.pathname === href || (href !== '/' && location.pathname.startsWith(href)) || (href === '/products' && location.pathname.startsWith('/product/'));
            
            if (label === "Login" && isAuthenticated) {
              return (
                <Link
                  key="Dashboard"
                  to="/dashboard"
                  className={`text-sm font-semibold transition-colors hover:text-orange ${location.pathname.startsWith('/dashboard') ? 'text-orange border-b-2 border-orange pb-1' : 'text-navy'}`}
                >
                  Dashboard
                </Link>
              );
            }
            return (
              <Link
                key={label}
                to={href}
                className={`text-sm font-semibold transition-colors hover:text-orange ${isActive ? 'text-orange border-b-2 border-orange pb-1' : 'text-navy'}`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="rounded bg-orange px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-orange-light shadow-md"
          >
            Request Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-navy hover:bg-gray-100 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white px-4 py-4 md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map(([label, href]) => {
                const isActive = location.pathname === href || (href !== '/' && location.pathname.startsWith(href)) || (href === '/products' && location.pathname.startsWith('/product/'));
                
                if (label === "Login" && isAuthenticated) {
                  return (
                    <Link
                      key="Dashboard"
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className={`text-base font-medium hover:text-orange ${location.pathname.startsWith('/dashboard') ? 'text-orange font-bold' : 'text-navy'}`}
                    >
                      Dashboard
                    </Link>
                  );
                }
                return (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-medium hover:text-orange ${isActive ? 'text-orange font-bold' : 'text-navy'}`}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-block text-center rounded bg-orange px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SiteHeader;
