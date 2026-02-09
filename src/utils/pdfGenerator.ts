import html2pdf from "html2pdf.js";

// Function to check if content exceeds one page
const checkContentOverflow = (): boolean => {
  const element = document.getElementById("resume-page");
  if (!element) return false;
  
  // A4 page height at 96dpi is approximately 1123px
  const maxHeight = 1123;
  const actualHeight = element.scrollHeight;
  
  return actualHeight > maxHeight;
};

// Function to show/hide overflow warning
const toggleOverflowWarning = (show: boolean) => {
  const warning = document.getElementById("content-overflow-warning");
  if (warning) {
    if (show) {
      warning.classList.remove("hidden");
    } else {
      warning.classList.add("hidden");
    }
  }
};

export const generatePDF = () => {
  const element = document.getElementById("resume-page");

  if (!element) {
    console.error("Resume element not found");
    return;
  }

  const options = {
    margin: 0,
    filename: `Shashank_Mahajan_Resume_${new Date().getFullYear()}.pdf`,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: { 
      scale: 3, // Increased scale for better quality
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: { 
      unit: "mm", 
      format: "a4",
      orientation: "portrait" 
    }
  };

  html2pdf().set(options).from(element).save();
};

// Export function to check overflow for external use
export const checkResumeOverflow = checkContentOverflow;
