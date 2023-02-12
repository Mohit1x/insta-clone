import React, { useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();

  return (
    <div className=" shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex items-center  justify-between max-w-6xl mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid h-28 w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            objectFit="contain"
            layout="fill"
            alt=""
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden h-10 w-8"
        >
          <Image
            src="https://links.papareact.com/jjm"
            objectFit="contain"
            layout="fill"
            alt=""
          />
        </div>
        <div className="flex items-center border rounded-md p-2">
          <SearchIcon className="h-5 cursor-pointer" />
          <input
            placeholder=" Search Here"
            className=" border-none outline-none pl-2"
          />
        </div>
        <div className="flex items-center space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon
            className="h-10 w-8 md:hidden cursor-pointer"
            onClick={() => setShowAdd(!showAdd)}
          />
          {session ? (
            <>
              <div className="relative navBtn">
                <p className=" absolute text-xs -top-2 -right-2 bg-red-500 h-5 flex items-center justify-center text-white w-5 animate-pulse  rounded-full">
                  3
                </p>
                <PaperAirplaneIcon className="navBtn rotate-45" />
              </div>
              {showAdd && (
                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="h-5 w-5 cursor-pointer hover:scale-125 transition-all duration-150 ease-out "
                />
              )}
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              {/* <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              /> */}
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                src={session.user.image}
                onClick={signOut}
                className="h-8 w-8 cursor-pointer object-contain  rounded-full "
                alt=""
              ></img>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
