import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-2">
      <div className="flex justify-between">
        <div>
          <ul className="flex space-x-8">
            <li>
              <a href="/privacy" className="hover:text-white duration-500 ">
                Privacy Policies
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white duration-500">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white duration-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
