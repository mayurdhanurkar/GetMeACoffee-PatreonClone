"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowdropdown(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setShowdropdown(false);
      }
    };

    document.addEventListener("pointerdown", closeDropdown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeDropdown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white md:p-4 p-3 flex justify-between items-center md:h-16 sticky top-0 z-50">
      <div className="md:text-xl text-sm font-bold">
        <Link href={"/"}>
        <span className="flex items-center gap-2">
          <img src="coffee.gif" className="w-9 md:w-10 " alt="" />
          Get Me a Coffee
        </span>
        </Link>
      </div>
      <div className="flex">
        {session && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              aria-controls="dropdown"
              aria-expanded={showdropdown}
              className="ml-3 inline-flex min-w-0 max-w-[55vw] items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-2 py-1.5 text-center text-sm font-medium leading-5 text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 md:px-4 md:py-2.5"
              type="button"
            >
              <span className="min-w-0 truncate max-w-[40vw]">Welcome {session.user.name}</span>
              <svg
                className="ml-1.5 h-4 w-4 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`${showdropdown ? "" : "hidden"} absolute right-0 left-auto top-12 z-10 w-44 rounded-base border border-default-medium bg-neutral-primary-medium shadow-lg`}
            >
              <ul
                className="p-2 bg-slate-800 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowdropdown(false)}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${encodeURIComponent(session.user.name)}`}
                    onClick={() => setShowdropdown(false)}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setShowdropdown(false);
                      signOut();
                    }}
                    className="inline-flex w-full items-center rounded p-2 text-left hover:bg-neutral-tertiary-medium hover:text-heading"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
        {!session && (
          <Link
            href="/login"
            className="ml-3 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2.5 text-center text-sm font-medium leading-5 text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
