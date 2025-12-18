import { useContext, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Search } from "lucide-react";
import assets from "../../assets/assets";
// import {userDummyData} from '../../assets/assets'
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
// import proig from '../../assets/asets'

const AppSidebar = () => {
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    users,
    unseenMessages,
    messages,
    selectedUser,
    setSelectedUser,
    getUsers,
    getMessages,
    setUnseenMessages
  } = useContext(ChatContext);

  useEffect(() => {
    async function getUserFun() {
      await getUsers();
    }

    getUserFun();
  }, [onlineUsers]);

  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = searchInput ? users.filter((val)=>(val?.fullName).toLowerCase().includes(searchInput.toLowerCase()) ) : users;


  return (
    <Sidebar
      variant="floating"
      className="[&>div]:bg-[#8185B2]/10 [&>div]:border-none w-[400px]"
    >
      <SidebarHeader />
      <SidebarContent className="px-4 space-y-4">
        <div className="flex flex-row justify-between items-center">
          {/* website logo */}
          <div
          //   className="flex items-center gap-2"
          >
            {/* <img src={assets.logo} alt="logo" className="max-w-40 h-fit" /> */}
            <h1 className="text-white font-bold uppercase">Chat</h1>
          </div>

          {/* dropdown to show profile and logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className="text-white size-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="cursor-pointer"
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-[#282142] flex items-center px-4 py-2  rounded-full">
          <Search className="text-white size-5" />
          <Input
          onChange={(e)=>setSearchInput(e.target.value)}
            className="outline-none border-none text-white focus-visible:border-none"
            placeholder="Search..."
          />
        </div>

        <div className="flex flex-col  gap-1">
          {filteredUsers?.map((user, index) => {
            return (
              <div
                key={user?._id}
                className={`flex gap-2
                  p-2 pl-4 rounded cursor-pointer
                   ${selectedUser?._id === user?._id && "bg-[#282142]/50"}`}
                onClick={() => {
                  setSelectedUser(user);
                  setUnseenMessages(prev => ({...prev, [user._id] : 0}))
                }}
              >
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt="user-img"
                  className="w-[40px] h-[40px] rounded-full shrink-0 aspect-square "
                />

                <div className="text-white grow">
                  <h2 className="text-white leading-3">{user?.fullName}</h2>

                  { onlineUsers.includes(user._id) ? (
                    <span className="text-green-400 text-xs">Online</span>
                  ) : (
                    <span className="text-neutral-400 text-xs">Offline</span>
                  )}
                </div>

                {unseenMessages[user._id] > 0 && (
                  <Badge className="h-fit w-fit">{unseenMessages[user._id]}</Badge>
                )}
              </div>
            );
          })}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
