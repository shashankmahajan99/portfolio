import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "public", "resume.md");
const outputPath = path.join(__dirname, "public", "resume.pdf");
const templatePath = path.join(__dirname, "resume-template.html");
const cssPath = path.join(__dirname, "resume-style.css");

async function convert() {
    try {
        const markdown = fs.readFileSync(inputPath, 'utf-8');
        const template = fs.readFileSync(templatePath, 'utf-8');
        const css = fs.readFileSync(cssPath, 'utf-8');

        // Simple parser for the specific resume structure
        const sections = {};
        
        // Extract Name (H1)
        const nameMatch = markdown.match(/^# (.*)/m);
        sections.name = nameMatch ? nameMatch[1] : '';

        // Extract Subtitle (Bold text right after H1)
        const subtitleMatch = markdown.match(/^\*\*([^*]*)\*\*/m);
        sections.subtitle = subtitleMatch ? subtitleMatch[1] : '';

        // Extract Contact Info (Line with links/phone)
        const contactMatch = markdown.match(/\[.*\]\(mailto:.*\).*/);
        sections.contact = contactMatch ? marked.parseInline(contactMatch[0]) : '';

        // Extract H3 sections
        const h3Sections = markdown.split(/^### /m);
        h3Sections.forEach(section => {
            const lines = section.split('\n');
            const title = lines[0].trim().toLowerCase();
            const content = lines.slice(1).join('\n').trim();

            let htmlContent = marked.parse(content);

            // Post-process Experience and Projects to add nice headers
            if (title.includes('experience') || title.includes('projects')) {
                // Look for patterns like **Company** | Title | *Date*
                // or **Project Name** | *Date*
                htmlContent = htmlContent.replace(/<p><strong>(.*?)<\/strong> \| (.*?) \| <em>(.*?)<\/em><\/p>/g, 
                    '<div class="experience-item"><div class="item-header"><span class="item-title">$1 | $2</span><span class="item-meta">$3</span></div>');
                htmlContent = htmlContent.replace(/<p><strong>(.*?)<\/strong> \| <em>(.*?)<\/em><\/p>/g, 
                    '<div class="project-item"><div class="item-header"><span class="item-title">$1</span><span class="item-meta">$2</span></div>');
                
                // Close divs before the next one or at the end
                // This is a bit hacky but works for simple lists
                htmlContent = htmlContent.replace(/<\/ul>\s*<div/g, '</ul></div><div');
                if (htmlContent.includes('<div class="')) {
                    htmlContent += '</div>';
                }
            }

            if (title.includes('summary')) sections.summary = htmlContent;
            if (title.includes('competencies')) sections.skills = htmlContent;
            if (title.includes('experience')) sections.experience = htmlContent;
            if (title.includes('portfolio') || title.includes('projects')) sections.projects = htmlContent;
            if (title.includes('awards')) sections.awards = htmlContent;
            if (title.includes('education')) sections.education = htmlContent;
        });

        // Fill template
        let html = template;
        Object.keys(sections).forEach(key => {
            html = html.replace(`{{${key}}}`, sections[key]);
        });

        // Inject CSS directly for Puppeteer
        html = html.replace('<link rel="stylesheet" href="resume-style.css">', `<style>${css}</style>`);

        // Launch puppeteer
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        await page.setContent(html, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        await browser.close();
        console.log("PDF created successfully at:", outputPath);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}

convert();
