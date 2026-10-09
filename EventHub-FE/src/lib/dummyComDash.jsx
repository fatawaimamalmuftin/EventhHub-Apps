import { CiCalendar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

const ComDashCardHead = [
    {
        iconCom: <CiCalendar />,
        title: "Total Events",
        value: "2",
        desk: "All time"
    },
    {
        iconCom: <FiUsers />,
        title: "Total Attendees",
        value: "103",
        desk: "Across all events"
    },
    {
        iconCom: <FaRegEye />,
        title: "Avg Fill Rate",
        value: "57%",
        desk: "Capacity utilization"
    },
    {
        iconCom: <FiTrendingUp />,
        title: "Event Views",
        value: "3,241",
        desk: "Last 30 days"
    },
]
export default ComDashCardHead