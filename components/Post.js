import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userimg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.email) !== -1
      ),
    [likes]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  const likepost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      useIamge: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* {header} */}
      <div className="flex items-center justify-between w-full p-5">
        <div className="flex items-center gap-3 flex-1">
          <img
            className="h-12 w-12 rounded-full border p-1 object-contain"
            src={userimg}
            alt="userimg"
          />
          <p className="font-bold">{username}</p>
        </div>

        <DotsHorizontalIcon className="h-5 w-5 cursor-pointer" />
      </div>

      {/* {img} */}
      <img src={img} className=" object-cover w-full" />

      {/* {buttons} */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likepost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likepost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* {caption} */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username}</span>

        <span>{caption}</span>
      </p>

      {/* {comment} */}

      {comments.length > 0 && (
        <div
          className="ml-10 h-20 overflow-y-scroll 
        scrollbar-thin scrollbar-thumb-black"
        >
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-3 space-x-2">
              <img className="h-7 rounded-full" src={comment.data().useIamge} />
              <p className=" text-sm flex-1">
                <span className=" font-bold">{comment.data().username}</span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* {input box} */}
      {session && (
        <form onSubmit={sendComment} className="flex item-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment.."
            className="border-none flex-1 focus: ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
