import { useState } from "react"
import SelectedContext from "./selectedContext"
export default function SelectedProvider({children}) {

    const [selected, setSelected] = useState(()=>({
      urlImages: null,
      title: null,
      categories: null,
      date: null,
      time: null,
      location: null,
      attendees:null,
      capacity: null
    }))

  return (
    <SelectedContext.Provider
      value={{
        selected,
        setSelected
      }}
    >
      {children}
    </SelectedContext.Provider>
  )
}
