import React, { useEffect, useRef } from "react";
import assets from "../../assets/assets";
import { InfinityIcon, Info, InfoIcon } from "lucide-react";
// import { messagesDummyData } from '../../assets' ;
import {messagesDummyData} from '../../assets/assets'
import { formatMessageTime } from "@/lib/time";
// import data from '../../assets/'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {


  const scrollEnd = useRef();

  useEffect(()=>{
    if(scrollEnd?.current){
      scrollEnd.current.scrollIntoView({
        behavior : "smooth"
      })
    }
  })


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

              <div className="w-3 h-3 bg-green-600 rounded-full" />
            </div>

            {/* <Info className="text-white" /> */}
            <img src={assets?.help_icon} className="max-w-5 cursor-pointer" />
          </div>


          {/* Chat area */}
          <div
          className="flex flex-col h-[calc(100vh-100px)] overflow-y-scroll p-3  pb-18"
          >
            {
              messagesDummyData.map((msg, index) => (
                <div key={msg?._id} 
                className={`flex items-end gap-2 justify-end 
                  ${msg.senderId !== "680f50e4f10f3cd28382ecf9" && 'flex-row-reverse'}`
                }
                >
                  {
                    msg.image ? (
                      <img src={msg.image} alt="" 
                      className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"/>
                    ):
                    (
                      <p
                      className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white
                        ${msg?.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none':  'rounded-bl-none'}
                        `}
                      >
                        {msg?.text}
                      </p>
                    )
                  }

                  <div>
                    <img src={msg?.senderId === '680f50e4f10f3cd28382ecf9' ? assets?.avatar_icon : assets?.profile_martin} 
                    alt="user-img"
                    className="w-7 rounded-full"
                     />
                     <p className="text-gray-500" >{formatMessageTime(msg?.createdAt)}</p>
                  </div>



                </div>
              ))
            }

            <div ref={scrollEnd} ></div>

          </div>




          {/* Bottom area */}
          <div
          // className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3"
          className="absolute bottom-0 inset-x-0 z-30
               flex items-center gap-3 p-3
               bg-transparent backdrop-blur-sm"
          >
            <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full" >

            <input type="text" placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
             />
             <input type="file" id="image" accept="image/png, image/jpeg"  hidden/>
             <label htmlFor="image">
              <img src={assets.gallery_icon}  alt="" className="w-5 mr-2 cursor-pointer"  />
             </label>
            </div>
            <img src={assets?.send_button} alt="" className="w-7 cursor-pointer"  />

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
