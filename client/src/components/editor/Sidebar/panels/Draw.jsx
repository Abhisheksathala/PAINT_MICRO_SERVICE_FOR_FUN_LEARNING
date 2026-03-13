'use client'

import { useEditorStore } from "@/store/store"
import { useState } from "react"

const Drawpannel = () => {

  const {canvas} = useEditorStore()
  const [isdrwaing,setIsdrawing] = useState(false)
  const [isErasing,setIsErasing] = useState(false)
  const [drewingColor,setDrewingColor] = useState('#000000')
  const [brushwidth,setBrushwidth] = useState(5)
  const [drawingOpacity,setDrawingOpacity] = useState(100)
  const [Activetab,setActivetab] = useState('colors')
  

  return (
    <div>Draw</div>
  )
}

export default Drawpannel