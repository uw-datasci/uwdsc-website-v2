import { getAllAppsByTerm, getAllTerms } from "@/utils/apiCalls";
import { Check, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface question {
  id: string;
  question: string;
}

interface TermData {
  id: string;
  termName: string;
  questions: question[];
}

interface ExecApp {
  _id: string;
  status: string;
  resumeUrl: string;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  termApplyingFor: {
    termName: string;
  };
  academicInfo: {
    program: string;
    academicTerm: string;
    location: string;
  };
  clubExperience: {
    previousMember: boolean;
    previousExperience: string;
  };
  personalInfo: {
    uwEmail: string;
    personalEmail: string;
    fullName: string;
  };
  questionAnswers: any;
}

export default function ExecAppView() {
  const [currentTerm, setCurrentTerm] = useState<TermData | null>(null);
  const [termApps, setTermApps] = useState<ExecApp[] | null>(null);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchCurrentTerm = async () => {
      try {
        const response = await getAllTerms();
        const term = response.data[0];
        const { _id, termName, questions } = term;
        setCurrentTerm({ id: _id, termName: termName, questions: questions });
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchCurrentTerm();
  }, []);

  useEffect(() => {
    const fetchTermApps = async () => {
      try {
        if (currentTerm) {
          const response = await getAllAppsByTerm(currentTerm.id);
          const sorted = response.data.sort((a: ExecApp, b: ExecApp) => {
            // Sort submitted first
            const a_status = a.status === "submitted" ? 0 : 1;
            const b_status = b.status === "submitted" ? 0 : 1;
            if (a_status - b_status !== 0) {
              return a_status - b_status;
            }
            return (
              new Date(a.updatedAt || a.createdAt).getTime() -
              new Date(b.updatedAt || b.createdAt).getTime()
            );
          });
          setTermApps(sorted);
        }
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchTermApps();
    setPageNumber(0);
  }, [currentTerm]);

  const calculateCompletionRate = () => {
    if (termApps) {
      const submittedCount = termApps.filter(
        (app) => app.status === "submitted",
      ).length;
      return Math.round((submittedCount / termApps.length) * 100);
    }
    return 0;
  };

  const exportToCSV = () => {
    if (!termApps || !currentTerm) {
      console.log("Current term or term applications are undefined");
      return null;
    }
    const headers = [
      "Application ID",
      "Full Name",
      "UW Email",
      "Personal Email",
      "Program",
      "Academic Term",
      "Location",
      "Status",
      "Resume URL",
      "Previous Member",
      "Previous Experience",
    ];
    // add each question as header
    currentTerm.questions.forEach((q) => {
      headers.push(q.question);
    });
    const csvData = termApps.map((app) => {
      const row = [
        app._id,
        app.personalInfo.fullName,
        app.personalInfo.uwEmail,
        app.personalInfo.personalEmail,
        app.academicInfo.program,
        app.academicInfo.academicTerm,
        app.academicInfo.location,
        app.status,
        app.resumeUrl,
        app.clubExperience.previousMember,
        app.clubExperience.previousExperience,
      ];
      // add answers to term questions if they exist
      currentTerm.questions.forEach((q) => {
        const answer = app.questionAnswers[q.id] || "";
        row.push(answer);
      });
      return row;
    });

    const csvContent = [headers, ...csvData]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${currentTerm.termName}_applications.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  if (!currentTerm || !termApps) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // pagination
  const appsPerPage = 8;
  const pagesVisited = pageNumber * appsPerPage;
  const pageCount = Math.ceil(termApps.length / appsPerPage);
  const displayedApplications =
    termApps.length > appsPerPage
      ? termApps?.slice(pagesVisited, pagesVisited + appsPerPage)
      : termApps;

  const goToNextPage = () => {
    if (pageNumber + 1 < pageCount) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber !== 0) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`${poppins.className} min-h-screen w-full bg-[#E1EAF8] py-5 md:py-10`}
    >
      <div className="flex flex-col items-center justify-center gap-1 p-5 md:p-10">
        <p className="text-center text-3xl font-semibold">
          DSC Exec Application Form
        </p>
        {/* replace with term name after */}
        <div className="relative inline-block px-10 align-middle">
          <div className="rounded absolute inset-x-0 top-4 z-0 bg-[#7CA3DE33]/20 py-3"></div>
          <p className="z-10 m-0 text-2xl font-semibold text-[#5D84D4]">
            {currentTerm.termName}
          </p>
        </div>
      </div>

      {/* Application Table with Stats*/}
      <div className="px-2 md:px-[10%]">
        {/* Stats + CSV */}
        <div className="flex flex-col items-center gap-5 py-8 sm:flex-row sm:justify-start">
          {/* Total Applications Card */}
          <div className="flex w-fit items-center gap-4 rounded-lg border-[1px] border-[#7CA3DE] bg-[#CADAF3] px-4 py-2 sm:px-6 sm:py-4">
            <div className="rounded-sm bg-[#5c7fe1] p-3">
              <img src="/execAppView/checklist_icon.svg" alt="checklist icon" />
            </div>
            <div className="font-medium text-[#314077]">
              <div className="text-xl sm:text-lg lg:text-xl">
                {termApps.length}
              </div>
              <div className="text-md text-[#222949B2]/70 sm:text-sm lg:text-md">
                Total Applications
              </div>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="flex w-fit items-center gap-4 rounded-lg border-[1px] border-[#7CA3DE] bg-[#CADAF3] px-4 py-2 sm:px-6 sm:py-4">
            <div className="rounded-sm bg-[#4ADE80] p-3">
              <Check className="h-6 w-6 text-white" strokeWidth={3} />
            </div>
            <div className="font-medium text-[#314077]">
              <div className="text-xl sm:text-lg lg:text-xl">
                {calculateCompletionRate()}%
              </div>
              <div className="text-md sm:text-sm lg:text-md">
                Completion Rate
              </div>
            </div>
          </div>

          {/* Export to CSV Button */}
          <button
            className="mt-auto flex w-fit items-center gap-3 rounded-md bg-gradient-to-b from-[#314077] to-[#496AC7] px-4 py-3 text-md font-medium text-white hover:opacity-90 sm:ml-auto sm:px-6 sm:py-4"
            onClick={exportToCSV}
          >
            <Download className="h-5 w-5" strokeWidth={2.75} />
            Export to CSV
          </button>
        </div>
        {/* Table */}
        <div
          className={`rounded-xl border-[1px] border-[#CADAF3] bg-[#F2F6FC] text-[#030712] ${
            termApps.length > appsPerPage
              ? "px-5 pt-5 sm:px-10 sm:pt-10"
              : "p-6 sm:p-10"
          }`}
        >
          <p className="text-xl font-semibold sm:text-2xl xl:text-4xl">
            Applications
          </p>
          <div className="grid grid-cols-4 justify-between gap-3 pb-3 pt-5 text-sm font-medium sm:gap-8 sm:text-md">
            <p className="col-span-1 text-left">Application ID</p>
            <p className="col-span-1">Applicant</p>
            <p className="col-span-1">Program</p>
            <p className="col-span-1">Submitted</p>
          </div>
          <div className="h-[1px] w-full bg-[#A6C3EA]" />
          {displayedApplications.map((app, i) => (
            <div key={app._id}>
              <div className="grid grid-cols-4 gap-8 pb-3 pt-5 text-xs sm:text-md">
                <p className="col-span-1 flex items-center break-all">
                  {app._id}
                </p>
                <div className="col-span-1 flex flex-col items-start break-all">
                  <span>{app.personalInfo.fullName}</span>
                  <span className="text-black/70">
                    {app.personalInfo.uwEmail}
                  </span>
                </div>
                <p className="col-span-1 flex items-center break-all">
                  {app.academicInfo.program}
                </p>
                <p className="col-span-1 flex items-center break-all">
                  {app.submittedAt ? formatDate(app.submittedAt) : app.status}
                </p>
              </div>
              {i !== displayedApplications.length - 1 && (
                <div className="h-[1px] w-full bg-[#A6C3EA]" />
              )}
            </div>
          ))}
          <div
            className={`${
              termApps.length > appsPerPage ? "flex" : "hidden"
            } flex-row items-center justify-between py-4 sm:justify-center sm:gap-8 sm:p-7`}
          >
            <div>
              <button
                className="mr-2 cursor-pointer rounded-sm bg-[#496AC7] px-2 py-1 hover:bg-[#314077] sm:px-3 sm:py-2"
                onClick={goToPrevPage}
                disabled={pageNumber === 0}
              >
                <ChevronLeft
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              </button>
              <button
                className="cursor-pointer rounded-sm bg-[#496AC7] px-2 py-1 hover:bg-[#314077] sm:px-3 sm:py-2"
                onClick={goToNextPage}
                disabled={pageNumber + 1 >= pageCount}
              >
                <ChevronRight
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              </button>
            </div>
            <p className="text-center text-xs sm:text-md">
              Page {pageNumber + 1} out of {pageCount}
            </p>
            <div className="flex flex-row items-center gap-2 text-xs sm:text-md">
              <p> Go to: </p>
              {/* check for integer input if time */}
              <input
                type="number"
                defaultValue={pageNumber + 1}
                min={1}
                max={pageCount}
                onChange={(e) => {
                  let page = Number(e.target.value);
                  if (isNaN(page)) page = 1;
                  if (page < 1) page = 1;
                  if (page > pageCount) page = pageCount;
                  setPageNumber(page - 1);
                }}
                className="w-16 rounded-sm border py-0.5 text-center text-xs sm:text-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
