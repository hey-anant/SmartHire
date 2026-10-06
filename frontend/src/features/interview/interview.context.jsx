import { useState } from "react";
import { InterviewContext } from "./interview.context.js";

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [resumeLoading, setResumeLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <InterviewContext.Provider value={{ loading, setLoading, resumeLoading, setResumeLoading, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}