import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import ModalBox from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #ffffff",
  borderRadius: 3,
  outline: "none",
  boxShadow: 24,
  p: 4,
};

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const { data: session } = useSession();

  const filePickerRef = useRef(null);
  const captionRef = useRef(null);

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.name,
      caption: captionRef?.current?.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with id >>>", docRef?.id);

    const imgRef = ref(storage, `/posts/${docRef?.id}/image`);

    await uploadString(imgRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "posts", docRef?.id), {
          image: downloadUrl,
        });
      }
    );
    setLoading(false);
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ModalBox
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-center">
              {selectedFile ? (
                <img
                  src={selectedFile}
                  alt=""
                  className="w-full object-contain cursor-pointer mb-4 rounded-md"
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <div
                  className="bg-red-200 w-fit p-2 rounded-full mx-auto mb-4 cursor-pointer hover:bg-red-100"
                  onClick={() => filePickerRef?.current.click()}
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/FA5353/camera--v1.png"
                    alt=""
                  />
                </div>
              )}

              <p className=" font-semibold mb-2">Upload a photo</p>

              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
              />

              <input
                type="text"
                ref={captionRef}
                placeholder="Please enter a caption..."
                className="my-3 mb-5 outline-none border-b border-black text-center"
              />

              <button
                className="bg-orange-600 text-white font-semibold p-2 rounded-md w-full border disabled:bg-gray-300 border-orange-800 hover:bg-gray-400 disabled:cursor-not-allowed"
                onClick={uploadPost}
                disabled={!selectedFile}
              >
                {loading ? "Uploading..." : "Upload Post"}
              </button>
            </div>
          </Box>
        </ModalBox>
      )}
    </>
  );
}

export default Modal;
