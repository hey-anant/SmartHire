import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useCallback, useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, resumeLoading, setResumeLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            if (response && response.interviewReport) {
                setReport(response.interviewReport)
            }
        } catch (error) {
            console.error("Generate report hook error:", error.response?.data || error.message || error)
        } finally {
            setLoading(false)
        }

        return response ? response.interviewReport : null
    }

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return null
    }, [setLoading, setReport])

    const getReports = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return []
    }, [setLoading, setReports])

    const getResumePdf = async (interviewReportId) => {
        setResumeLoading(true)
        try {
            const response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setResumeLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId, getReportById, getReports ])

    return { loading, resumeLoading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}