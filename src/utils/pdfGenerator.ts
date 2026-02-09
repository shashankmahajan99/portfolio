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

  // Temporarily make the resume visible
  const parentElement = element?.parentElement;
  if (parentElement?.classList.contains("hidden")) {
    parentElement.classList.remove("hidden");
  }

  if (!element) {
    console.error("Resume element not found");
    return;
  }

  // Check for content overflow
  const hasOverflow = checkContentOverflow();
  if (hasOverflow) {
    console.warn("Content may exceed single page. Consider reducing content for optimal formatting.");
    // Show warning for 3 seconds
    toggleOverflowWarning(true);
    setTimeout(() => toggleOverflowWarning(false), 3000);
  }

  const options = {
    margin: 0,
    filename: "Shashank_Mahajan_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      height: 1123, // Force single page height
      width: 794    // A4 width
    },
    jsPDF: { 
      unit: "px", 
      format: [794, 1123], // Exact A4 dimensions at 96dpi
      orientation: "portrait" 
    },
    pagebreak: { mode: 'avoid-all' } // Prevent page breaks
  };

  html2pdf().set(options).from(element).save();

  // Restore the hidden class
  if (parentElement && !parentElement.classList.contains("hidden")) {
    parentElement.classList.add("hidden");
  }
};

// Export function to check overflow for external use
export const checkResumeOverflow = checkContentOverflow;
