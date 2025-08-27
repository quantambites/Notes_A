import React , {useState} from 'react'
import { Outlet , useNavigate } from 'react-router-dom'
import Header from '@/components/Layout/Header'
import ProfileFloater from '@/components/Layout/ProfileFloater'

const Layout = () => {
    const [profileActive , setProfileActive] = useState(false)
    const [sidebarActive , setSidebarActive] = useState(false)

  return (
    <>
      <Header 
      profileActive = {profileActive}
      setProfileActive = {setProfileActive}
      sidebarActive = {sidebarActive}
      setSidebarActive = {setSidebarActive}
      />

      {profileActive&&(
       <ProfileFloater />
      )}
    </>
  )
}

export default Layout
