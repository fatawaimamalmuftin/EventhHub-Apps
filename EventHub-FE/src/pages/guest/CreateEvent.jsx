import { FaArrowLeft } from "react-icons/fa6";
import FormCreateStep1 from "../../components/FormCreateStep1";
import FormCreateStep2 from "../../components/FormCreateStep2";
import FormCreateStep3 from "../../components/FormCreateStep3";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../Redux/slice/eventSlice";
import createEventContext from "../../context/createEvent/CreateEventContex.js";

export default function CreateEvent() {
    const { eventData, setEventData } = useContext(createEventContext)

    const dispatch = useDispatch()

    const events = useSelector((state)=> state.eventState.events)

    const {
        handleSubmit,
        register,
        formState: {errors},
        trigger,
        setError,
        getValues
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    const navigate = useNavigate()
    const [page1,setPage1] = useState(true)
    const [page2,setPage2] = useState(false)
    const [page3,setPage3] = useState(false)
    const [coverImage,setCoverImage] = useState("")

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },[page1,page2,page3])

    function undo(e) {
        e.preventDefault()
        if(page1){
            navigate("/comunitiesDash")
            return 
        }
        if(page2){
            setPage1(true)
            setPage2(false)
            return
        }
        if(page3){
            setPage3(false)
            setPage2(true)
            return
        }
    }

    async function redo(e) {
        e.preventDefault()
        if(page1){
            const valid = await trigger([
                "eventTitle",
                "description",
                "category"
            ])

            if (!coverImage) {
                setError("coverImage", {
                    type: "manual",
                    message: "Cover image is required"
                })

                return
            }

            if(!valid) return

            const data = getValues()

            setEventData({
                ...eventData,
                eventTitle: data.eventTitle,
                description: data.description,
                category: [data.category],
                community: data.community,
                coverImage: coverImage
            })

            setPage1(false)
            setPage2(true)

            return
        }

        if (page2) {
            const valid = await trigger([
                "eventDate",
                "startTime",
                "endTime",
                "eventFormat",
                "location",
                "capacity"
            ])

            if (!valid) return

            const data = getValues()

            setEventData({
                ...eventData,
                eventDate: data.eventDate,
                startTime: data.startTime,
                endTime: data.endTime,
                eventFormat: data.eventFormat,
                location: data.location,
                capacity: data.capacity
            })

            setPage2(false)
            setPage3(true)

            return
        }

        if(page3){
            const newEvent = {
                ...eventData,
                id: events.length + 1
            }

            dispatch(addEvent(newEvent))

            navigate("/comunitiesDash")

            return
        }
    }
  return (
    <>
    <header className="veryCenter justify-between px-18 py-2 border-b-2 border-gray-300">
        <div className="veryCenter gap-2">
            <div className="veryCenter gap-2 text-gray-500 hover:hover px-4 py-2"
            onClick={()=>navigate("/comunitiesDash")}>
                <FaArrowLeft />
                Back
            </div>
            <div>
                Create Event
            </div>
        </div>

        <div className="veryCenter">
            <div className="w-11 h-11 rounded-full bg-orangeFigma text-white veryCenter">
                {page1 ? "1" : <FaCheck />}
            </div>

            <div className="border-2 w-10 border-orangeFigma veryCenter" />

            <div className="w-11 h-11 rounded-full bg-orangeFigma text-white veryCenter">
                {page2 ? "2" : <FaCheck />}
            </div>

            <div className="border-2 w-10 border-orangeFigma veryCenter" />

            <div className="w-11 h-11 rounded-full bg-orangeFigma text-white veryCenter">
                {page3 ? "3" : <FaCheck />}
            </div>
        </div>
    </header>

        <form
            className="veryCenter flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >

        <FormCreateStep1 
            page1={page1}
            register={register}
            errors={errors}
            setCoverImage={setCoverImage}
        />

        <FormCreateStep2 
        page2={page2}
        register={register}
        errors={errors}/>

        <FormCreateStep3 
        page3={page3}
        register={register}/>

        <div className="veryCenter justify-between px-18 py-2 border-t-2 border-gray-300 w-full">
            <button className={`veryCenter gap-2 text-gray-500 hover:hover px-4 py-2 ${page1 && "text-red-500"}`}
            onClick={undo}
            type="button">
                {page1 ? "Cancel" : "Back"}
            </button>
                
            <button className={`veryCenter btnBordColor hover:hover gap-2 ${page3 && "bg-green-500"}`}
            onClick={redo}
            type="button">
                {page3 ? <><FaCheck /> Publish Event</> : "Continue →" }
            </button>
        </div>
    </form>

    </>
  )
}