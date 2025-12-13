import { useEffect } from "react";
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
import {userDummyData} from '../../assets/assets'
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
// import proig from '../../assets/asets'

const AppSidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

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
            <img src={assets.logo} alt="logo" className="max-w-40 h-fit" />
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
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div 
        className="bg-[#282142] flex items-center px-4 py-2  rounded-full"
         >

            <Search className="text-white size-5" />
            <Input
            className="outline-none border-none text-white focus-visible:border-none"
            placeholder="Search..."
            />

        </div>
        
        <div className="flex flex-col  gap-1" >
            {userDummyData?.map((user, index)=> {
               return(
                <div
                key={user?._id}
                className={`flex gap-2
                  p-2 pl-4 rounded cursor-pointer
                   ${selectedUser?._id === user?._id && 'bg-[#282142]/50'}`}
                onClick={()=>{setSelectedUser(user)}}
                >
                    <img src={user?.profilePic || assets.avatar_icon} alt="user-img" 
                    className="w-[40px] h-[40px] rounded-full shrink-0 aspect-square "
                    />

                    <div className="text-white grow">
                        <h2 className="text-white leading-3" >{user?.fullName}</h2>

                        {
                          index < 3 ?
                          <span className="text-green-400 text-xs">Online</span>
                          :
                          <span className="text-neutral-400 text-xs" >Offline</span>
                        }


                    </div>

                    {
                      index > 2 &&
                      <Badge className="h-fit w-fit" >{index}</Badge>
                    }

                </div>
               )
            })}
        </div>



      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
