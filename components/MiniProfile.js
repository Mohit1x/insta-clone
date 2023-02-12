import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="h-16 w-16 border p-[1.5] rounded-full"
        src={session ? session?.user?.image : "https://links.papareact.com/3ke"}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
