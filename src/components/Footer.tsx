import React from 'react';
import { Link } from 'umi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#0c192d] via-hn-primary to-[#163154] text-white py-12 md:py-8 mt-16 md:mt-10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 md:gap-6 mb-8 md:mb-6">
          <div className="motion-fade-up">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">HeatNexis</h3>
            <p className="mb-2 text-gray-300 text-base md:text-sm">
              We design floor heating thermostats, wiring centers, gateways and accessories for distributors, private-label brands and HVAC projects.
            </p>
          </div>
          <div className="motion-fade-up animation-delay-100">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">Contact Info</h3>
            <p className="mb-2 text-gray-300 text-base md:text-sm">sales@heatnexis.com</p>
            <p className="mb-2 text-gray-300 text-base md:text-sm">+86 138 0010 2400</p>
          </div>
          <div className="motion-fade-up animation-delay-200">
            <h3 className="mb-4 md:mb-3 text-lg md:text-base font-semibold">Follow Us</h3>
            <div className="flex gap-4 md:gap-3">
              <a href="#" className="text-white no-underline transition-all duration-300 text-base md:text-sm hover:text-hn-accent hover:-translate-y-0.5">Facebook</a>
              <a href="#" className="text-white no-underline transition-all duration-300 text-base md:text-sm hover:text-hn-accent hover:-translate-y-0.5">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="motion-fade-up animation-delay-300 text-center pt-8 md:pt-6 border-t border-white/10">
          <p className="text-gray-400 text-base md:text-sm">
            &copy; {currentYear} HeatNexis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
