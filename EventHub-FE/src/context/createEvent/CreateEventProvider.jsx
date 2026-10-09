import { useState } from "react";
import CreateEventContext from "./CreateEventContex";
export default function CreateEventProvider({ children }) {
    const [eventData, setEventData] = useState({
        eventTitle: "",
        description: "",
        category: [],
        community: "",
        coverImage: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        eventFormat: "",
        location: "",
        capacity: "",
        speakers: []
    });

    return (
        <CreateEventContext.Provider 
        value={{ 
            eventData, 
            setEventData 
        }}>
            {children}
        </CreateEventContext.Provider>
    );
}