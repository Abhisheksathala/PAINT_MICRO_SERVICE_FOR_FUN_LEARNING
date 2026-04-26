'use client'
import React from 'react'
import Dialog, { DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useEditorStore } from '@/store/store';


const SubscriptionModal = ({ isopen, onClose }) => {

  const { usersubscription } = useEditorStore()

  const handleUpgrade =  async() => {
  }


  return (
    <Dialog open={isopen} onOpenChange={onClose}>

      <DialogContent className='max-w-[900px] p-0 gap-0 overflow-hidden rounded-lg '>
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            {
              usersubscription?.isPremium ? (

                <DialogTitle className={"text-2xl font-bold mb-4 flex items-center justify-center"}>
                  <span className="text-green-600 mr-2">&#9733;</span>
                  You are a Premium Member {usersubscription?.premimumSince}
                </DialogTitle>
              ) : (
                <>
                  <DialogTitle className={"text-2xl font-bold mb-4 flex items-center justify-center"}>
                    <span className="text-green-600 mr-2">&#9733;</span>
                    Unlock Premium Features
                  </DialogTitle>
                  <DialogDescription>
                    <p>This feature is only available for premium members. Please upgrade to a premium plan to access this feature.</p>
                    <Button onClick={handleUpgrade}>Upgrade</Button>
                  </DialogDescription>
                </>
              )
            }
          </div>
        </div>
      </DialogContent>

    </Dialog>
  )
}

export default SubscriptionModal