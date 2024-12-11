import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ReportPage(props) {
  const {} = props;

  const [showPDF, setShowPDF] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/book/report`,
        {
          headers: {
            "Content-Type": "application/pdf",
            "User-Agent":
              "Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version",
          },
          responseType: "blob",
          withCredentials: true,
        }
      );

      console.log(res);

      const contentDisposition = res.headers.get("content-disposition");

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

  //   useEffect(() => {
  //     setLoading(true);
  //   }, []);

  const handleDownloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = pdfFile;
      link.setAttribute("download", `Laporan.pdf`);
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

  return (
    <PageLayout pageTitle="Reports Page">
      <div className="flex space-x-2 mb-3">
        <Button disabled={loading} onClick={handleGenerateReport}>
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
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default ReportPage;
