import AppSidebar from "@/components/dashboard/AppSidebar";
import ChatContainer from "@/components/dashboard/ChatContainer";
import RightSidebar from "@/components/dashboard/RightSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex">
      <SidebarProvider>
        <div className="w-[400px]">
          {/* <h1>Take is later form but now here we are here hereere ere</h1> */}
          <AppSidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
        {/* <AppSidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        /> */}

        <div className="flex flex-1 ">
          <ChatContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          {
            selectedUser &&
          <RightSidebar
          selectedUser ={selectedUser}
           />
}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default HomePage;
