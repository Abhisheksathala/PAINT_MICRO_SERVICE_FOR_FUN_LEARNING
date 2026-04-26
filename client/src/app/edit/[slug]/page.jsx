import MainEditor from '@/components/editor'
import React from 'react'
import { getSubscription } from '@/services/Subscribtionservice';
import { getuserDesigns } from '@/services/DesignService';
import { useEditorStore } from '@/store/store';
import { useEffect } from 'react';

const page = () => {
  const { setUserSubscription, setUserDesigns } = useEditorStore()


  const featchsubscription = async () => {
    const response = await getSubscription()
    if (response?.success) {
      setUserSubscription(response?.data)
    }
  }

  async function FeatchuserDesigns() {
    const results = await getuserDesigns();
    setUserDesigns(results.data);
  }

  useEffect(() => {
    FeatchuserDesigns();
    featchsubscription();
  }, []);


  return (
    <MainEditor />
  )
}

export default page