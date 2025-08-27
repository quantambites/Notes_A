import { Outlet } from "react-router-dom";
import { StickyNote } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left branding section */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 
                      bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200
                      dark:from-yellow-500 dark:via-yellow-600 dark:to-yellow-700">
        <div className="max-w-md space-y-6 text-center text-neutral-900 dark:text-white">
          <StickyNote className="mx-auto h-12 w-12" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to I-Notes
          </h1>
          <p className="text-base opacity-100 text-md">
            Your personal space for organized thoughts.  
            Capture, edit, and never lose track of your ideas.
          </p>
        </div>
      </div>

      {/* Right auth section */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 
                      bg-yellow-50 dark:bg-neutral-900">
        <div className="w-full max-w-md space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
