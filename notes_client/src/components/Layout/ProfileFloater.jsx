import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { LogOut } from "lucide-react";

const ProfileFloater = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="fixed right-5 top-20 w-56 border border-border shadow-md bg-background text-foreground rounded-md p-4">
      <h1 className="font-semibold mb-3">{user?.userName}</h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-medium px-2 py-1 rounded hover:bg-muted transition"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
};

export default ProfileFloater;
