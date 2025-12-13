import React from 'react';
import assets from "../../assets/assets";

import { imagesDummyData } from '../../assets/assets';
import { Button } from '../ui/button';

const RightSidebar = ({selectedUser}) => {
  return (
    <div className='w-[400px] relative bg-[#8185B2]/10 rounded-2xl m-2 overflow-y-auto' >

      <div className='flex flex-col gap-2 items-center border-b-3 mt-24 pb-10 border-[#ffffff65]' >
        <img src={selectedUser?.profilePic || assets?.avatar_icon } alt="profile-img" 
        className='max-w-28 rounded-full'
        />

        <div className='flex items-center gap-2' >
          <div className='w-4 h-4 bg-green-400 rounded-full' />
          <h1 className='text-2xl text-white font-medium' >{selectedUser?.fullName}</h1>
        </div>

        <h1 className='text-base text-white font-medium' >{selectedUser?.bio}</h1>

      </div>

      <div className='px-4 my-4 space-y-6' >
        <h2  className='text-white font-normal text-base' >Media</h2>

        <div className='grid grid-cols-2 gap-4' >

         {
          imagesDummyData.map((img, index) => {
            return(
              <img src={img} alt={img} 
              className='rounded-md'
              />
            )
          } )
         }

        </div>
      </div>


<div 
className='absolute bottom-0 p-4 w-full text-center'
>
  <Button
      className='w-full rounded-full bg-purple-600 hover:bg-purple-500 cursor-pointer'
      >
        Logout
      </Button>

</div>

    </div>
  )
}

export default RightSidebar