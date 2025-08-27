import React from 'react'
import { Outlet , useNavigate } from 'react-router-dom'

const Header = ({profileActive , setProfileActive , sidebarActive , setSidebarActive}) => {
    const navigate = useNavigate();
    return (
      <header className='sticky top-0 bg-background'> 
        
        <div className='relative flex flex-row gap-20 pt-4 border border-border shadow-md pb-5 justify-center items-center'>

            <div className='mr-auto pl-24'>
                <button 
                className='font-bold text-lg' 
                onClick={() => setSidebarActive(!sidebarActive)}
                >
                    Inotes
                </button>
            </div>
            
            


            <div className='flex flex-row gap-20 pr-20'>
                <button onClick={() => navigate ('/shop/home', {replace: true})}> Home</button>
                <button onClick={() => navigate ('/shop/support' , {replace: true})}> Support</button>
                <button onClick={() => setProfileActive(!profileActive)}>Profile</button>
            </div>
            
        </div> 
      </header>
    )
}

export default Header
