'use client'
import { Grid } from 'lucide-react'
import React, { useState } from 'react'

const Sidebar = () => {

  const [isPanelCollapsed,setIspannelcollapsed] = useState(false)
  const [activeSidebar,setActiveSidebar] = useState(null)

  const sidebarItems = [

    {
      id:"elements",
      icons:Grid,
      labal:"Elements",
      panel:
    }
  ]


  return (
    <div className='flex h-full'>
      <div className="sidebar">

      </div>
    </div>
  )
}

export default Sidebar