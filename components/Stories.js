import React, { useEffect } from "react";
import { suggestions } from "../suggestionsData";
import Story from "./Story";
import { useSession, signIn, signOut } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();
  return (
    <div
      className="flex space-x-2 p-6  overflow-x-scroll mt-8 bg-white
       border-gray-200 border rounded-sms
       scrollbar-thin scrollbar-thumb-black
    "
    >
      {session && (
        <Story img={session?.user?.image} name={session?.user?.name} />
      )}

      {suggestions.map((profile) => (
        <Story img={profile.avatar} name={profile.username} key={profile.id} />
      ))}
    </div>
  );
}

export default Stories;
