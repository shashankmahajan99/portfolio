import markdownpdf from "markdown-pdf";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputPath = path.join(__dirname, "public", "resume.md");
const outputPath = path.join(__dirname, "public", "resume.pdf");

// Configure PDF options for single page with smaller fonts and margins
const options = {
  paperFormat: "A4",
  paperOrientation: "portrait",
  paperBorder: "0",
  renderDelay: 1000,
  cssPath: path.join(__dirname, "resume-style.css")
};

markdownpdf(options)
  .from(inputPath)
  .to(outputPath, function () {
    console.log("PDF created successfully at:", outputPath);
  });