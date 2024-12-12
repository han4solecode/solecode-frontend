import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ReportPage(props) {
  const {} = props;

  const [showPDF, setShowPDF] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedReport, setSelectedReport] = useState("");

  const availableReports = [
    "Leave Request Report",
    "Project Report",
    "Employee Report",
  ];

  const handleSelectReport = (e) => {
    const { value } = e.target;
    setSelectedReport(value);
    setShowPDF(false);
    setNumPages(null);
    setPageNumber(1);
    setPdfFile(null);
    setDepartment("");
    setStartDate("");
    setEndDate("");
  };

  const handleResetClick = () => {
    setShowPDF(false);
    setNumPages(null);
    setPageNumber(1);
    setPdfFile(null);
    setDepartment("");
    setSelectedReport("");
    setStartDate("");
    setEndDate("");
  };

  const handleGenerateTotalLeavesPerTypeReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/dashboard/leaves/total-per-type/report`,
        {
          headers: {
            "Content-Type": "application/pdf",
            // "User-Agent":
            //   "Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version",
          },
          responseType: "blob",
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        }
      );

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfFile(pdfUrl);
      setShowPDF(true);
    } catch (error) {
      setError("Error fetching PDF: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateProjectReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard/project/report`,
        {
          headers: {
            "Content-Type": "application/pdf",
            // "User-Agent":
            //   "Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version",
          },
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfFile(pdfUrl);
      setShowPDF(true);
    } catch (error) {
      setError("Error fetching PDF: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEmployeeByDeprtmentReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard/employee/report`,
        {
          headers: {
            "Content-Type": "application/pdf",
            // "User-Agent":
            //   "Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version",
          },
          responseType: "blob",
          params: {
            department: department,
          },
        }
      );

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfFile(pdfUrl);
      setShowPDF(true);
    } catch (error) {
      setError("Error fetching PDF: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = pdfFile;
      link.setAttribute("download", `Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    setError("Error loading PDF: " + error.message);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const renderReportSwitch = (key) => {
    switch (key) {
      case availableReports[0]:
        return (
          <>
            <div className="grid grid-cols-4 gap-4">
              <FormInput
                name="startDate"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              >
                Start Date
              </FormInput>
              <FormInput
                name="endDate"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              >
                End Date
              </FormInput>
            </div>
            <div className="flex space-x-2 mb-3">
              <Button
                disabled={loading}
                onClick={handleGenerateTotalLeavesPerTypeReport}
              >
                {loading ? "Loading..." : "Display Report"}
              </Button>
              {pdfFile && (
                <Button styleName="bg-blue-700" onClick={handleDownloadPDF}>
                  Download Report PDF
                </Button>
              )}
            </div>
            <div className="w-full">
              {showPDF && (
                <div className="border rounded border-gray-600 bg-gray-200 p-2">
                  {loading && (
                    <div className="text-center">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {error && <div className="text-red-600">{error}</div>}
                  {pdfFile && (
                    <>
                      <div className="flex items-center justify-center">
                        <Document
                          file={pdfFile}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={onDocumentLoadError}
                          loading="Loading..."
                        >
                          <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="mx-auto"
                            width={Math.min(window.innerWidth * 0.9, 800)}
                          ></Page>
                        </Document>
                      </div>
                    </>
                  )}
                  {numPages && (
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <Button
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <p className="mb-0">
                        Page {pageNumber} of {numPages}
                      </p>
                      <Button
                        onClick={goToNextPage}
                        disabled={pageNumber <= numPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        );
      case availableReports[1]:
        return (
          <>
            <div className="flex space-x-2 mb-3">
              <Button disabled={loading} onClick={handleGenerateProjectReport}>
                {loading ? "Loading..." : "Display Report"}
              </Button>
              {pdfFile && (
                <Button styleName="bg-blue-700" onClick={handleDownloadPDF}>
                  Download Report PDF
                </Button>
              )}
            </div>
            <div className="w-full">
              {showPDF && (
                <div className="border rounded border-gray-600 bg-gray-200 p-2">
                  {loading && (
                    <div className="text-center">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {error && <div className="text-red-600">{error}</div>}
                  {pdfFile && (
                    <>
                      <div className="flex items-center justify-center">
                        <Document
                          file={pdfFile}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={onDocumentLoadError}
                          loading="Loading..."
                        >
                          <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="mx-auto"
                            width={Math.min(window.innerWidth * 0.9, 800)}
                          ></Page>
                        </Document>
                      </div>
                    </>
                  )}
                  {numPages && (
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <Button
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <p className="mb-0">
                        Page {pageNumber} of {numPages}
                      </p>
                      <Button
                        onClick={goToNextPage}
                        disabled={pageNumber <= numPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        );
      case availableReports[2]:
        return (
          <>
            <div className="grid grid-cols-4 gap-4">
              <FormInput
                name="department"
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              >
                Department
              </FormInput>
            </div>
            <div className="flex space-x-2 mb-3">
              <Button
                disabled={loading}
                onClick={handleGenerateEmployeeByDeprtmentReport}
              >
                {loading ? "Loading..." : "Display Report"}
              </Button>
              {pdfFile && (
                <Button styleName="bg-blue-700" onClick={handleDownloadPDF}>
                  Download Report PDF
                </Button>
              )}
            </div>
            <div className="w-full">
              {showPDF && (
                <div className="border rounded border-gray-600 bg-gray-200 p-2">
                  {loading && (
                    <div className="text-center">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {error && <div className="text-red-600">{error}</div>}
                  {pdfFile && (
                    <>
                      <div className="flex items-center justify-center">
                        <Document
                          file={pdfFile}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={onDocumentLoadError}
                          loading="Loading..."
                        >
                          <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="mx-auto"
                            width={Math.min(window.innerWidth * 0.9, 800)}
                          ></Page>
                        </Document>
                      </div>
                    </>
                  )}
                  {numPages && (
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <Button
                        onClick={goToPreviousPage}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <p className="mb-0">
                        Page {pageNumber} of {numPages}
                      </p>
                      <Button
                        onClick={goToNextPage}
                        disabled={pageNumber <= numPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        );

      default:
        return <span>No Report Selected</span>;
    }
  };

  return (
    <PageLayout pageTitle="Reports Page">
      <div className="mb-3 flex items-center gap-4">
        <select
          name="report"
          id="report"
          className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
          value={selectedReport}
          onChange={(e) => handleSelectReport(e)}
        >
          <option value="" disabled hidden>
            Select Report
          </option>
          {availableReports.map((report, index) => (
            <option value={report} key={index}>
              {report}
            </option>
          ))}
        </select>
        <Button onClick={handleResetClick}>Reset</Button>
      </div>
      {renderReportSwitch(selectedReport)}
    </PageLayout>
  );
}

export default ReportPage;
