import AppSidebar from "@/components/dashboard/AppSidebar"
import ChatContainer from "@/components/dashboard/ChatContainer"
import RightSidebar from "@/components/dashboard/RightSidebar"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"



const HomePage = () => {

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div
    className="h-screen "
    >
       <SidebarProvider>
      <AppSidebar 
      selectedUser = {selectedUser}
      setSelectedUser = {setSelectedUser}
      />
      <ChatContainer />
      <RightSidebar />

       </SidebarProvider>


    </div>
  )
}

export default HomePage