import logo from '../assets/logo.png'

const Footer = () => {

    const year = new Date().getFullYear();
    return (
      <footer className="border-t border-slate-800/70 bg-[#050711]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top CTA + Logo Row */}
          <div className="flex flex-col gap-8 border-b border-slate-800/60 py-10 md:flex-row md:items-center md:justify-between">
            {/* Brand / Copy */}
            <div className="max-w-md space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-xs font-medium tracking-tight text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-600"></span>
                <span>Hygienic Food, delivered at lightspeed</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={logo} className="w-8 h-8" alt="" />
                <a className="text-xl font-bold text-orange-600">
                  HomeDish
                  <span className="text-white">-Hub</span>
                </a>
              </div>
              <p className="text-sm text-slate-400">
                Hygienic, Delicious and Home-made food inside your country!!
                Track every parcel in real time.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-400 text-lg mb-2">Working Hours</h3>
              <p>Everyday: 10 AM – 10 PM</p>
            </div>
          </div>

          {/* Middle Links */}
          <div className="grid gap-8 py-8 md:grid-cols-4">
            {/* tracking */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Tracking
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-orange-600"
                  >
                    Live tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-orange-600"
                  >
                    Smart routes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-orange-600"
                  >
                    Delivery ETA
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-orange-600"
                  >
                    Insurance
                  </a>
                </li>
              </ul>
            </div>

            {/* social */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Social
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Thread
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                company
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    About HomeDish-Hub
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Email: support@homedish.com
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-orange-600">
                    Phone: +880 1234-567890
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-4 border-t border-slate-800/70 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span>© {year} homedish-hub. All rights reserved.</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 text-slate-300 transition hover:border-orange-800 hover:text-orange-600"
              >
                {/* lucide:twitter */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3L8 22h3L18 2Z" />
                  <path d="M5 2h3l7 20h-3L5 2Z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 text-slate-300 transition hover:border-orange-800 hover:text-orange-600 "
              >
                {/* lucide:github */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 5.77 5.07 5.07 0 0 0 19.91 2S18.73 1.65 16 3.48a13.38 13.38 0 0 0-7 0C6.27 1.65 5.09 2 5.09 2A5.07 5.07 0 0 0 5 5.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 text-slate-300 transition hover:border-orange-800 hover:text-orange-600 "
              >
                {/* lucide:linkedin */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;