import
{
  // createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import assets from "../../assets/assets";
// import { InfinityIcon, Info, InfoIcon } from "lucide-react";
// import { messagesDummyData } from '../../assets' ;
// import {messagesDummyData} from '../../assets/assets'
import { formatMessageTime } from "@/lib/time";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
// import data from '../../assets/'

const ChatContainer = ({ setShowDetails }) => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [text, setText] = useState("");

  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd?.current) {
      scrollEnd.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  // Handle sending an text message.
  const handleSendMessages = async (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    await sendMessage({ text: text.trim() });
    setText("");

    // First convert image to base64 then use.
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedImg);
    // reader.onload = async () => {
    //   const base64Image = reader.result;
    //   await updateProfile({
    //     profilePic: base64Image,
    //     fullName: userDetails?.fullName,
    //     bio: userDetails.bio,
    //   });
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grow p-2">
      {selectedUser ? (
        <div className="relative">
          <div className=" h-[70px] sticky top-0 w-full flex items-center justify-between py-3 border-b-2 border-[#ffffff51]">
            <div className="flex items-center gap-2">
              <img
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt="user-img"
                className="w-[40px] h-[40px] rounded-full shrink-0 aspect-square "
              />
              <h2 className="text-white leading-3">{selectedUser?.fullName}</h2>

              {onlineUsers.includes(selectedUser?._id) && (
                <div className="w-3 h-3 bg-green-600 rounded-full" />
              )}
            </div>

            {/* <Info className="text-white" /> */}
            <img
              onClick={() => {
                setShowDetails(true);
              }}
              src={assets?.help_icon}
              className="max-w-5 cursor-pointer"
            />
          </div>

          {/* Chat area */}
          <div className="flex flex-col h-[calc(100vh-100px)] overflow-y-scroll p-3  pb-18">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 justify-end 
                  ${msg.senderId !== authUser?._id && "flex-row-reverse"}`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white
                        ${
                          msg?.senderId === authUser?._id
                            ? "rounded-br-none"
                            : "rounded-bl-none"
                        }
                        `}
                  >
                    {msg?.text}
                  </p>
                )}

                <div>
                  <img
                    src={
                      msg?.senderId === authUser?._id
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                      // assets?.avatar_icon : assets?.profile_martin
                    }
                    alt="user-img"
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg?.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            <div ref={scrollEnd}></div>
          </div>

          {/* Bottom area */}
          <div
            // className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3"
            className="absolute bottom-0 inset-x-0 z-30
               flex items-center gap-3 p-3
               bg-transparent backdrop-blur-sm"
          >
            <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
              <input
                type="text"
                placeholder="Send a message"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleSendMessages(e) : null
                }
                className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
              />
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                //  onChange={handleSendImage}
                onChange={(e) => {
                  handleSendImage(e);
                }}
                hidden
              />
              <label htmlFor="image">
                <img
                  src={assets.gallery_icon}
                  alt=""
                  className="w-5 mr-2 cursor-pointer"
                />
              </label>
            </div>
            <img
              onClick={handleSendMessages}
              src={assets?.send_button}
              alt=""
              className="w-7 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-white/10 items-center justify-center h-full">
          <img src={assets?.logo_icon} className="max-w-16" />
          <h2 className="font-medium text-white text-xl">
            Chat anytime, anywhare
          </h2>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
