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

        // Extract Contact Info (Line after Name)
        const contactMatch = markdown.match(/^# .*\n\n([\s\S]*?)\n\n###/);
        sections.contact = contactMatch ? marked.parse(contactMatch[1]).replace(/<\/?p>/g, '') : '';

        // Extract H3 sections
        const h3Sections = markdown.split(/^### /m);
        h3Sections.forEach(section => {
            const lines = section.split('\n');
            const title = lines[0].trim().toLowerCase();
            const content = lines.slice(1).join('\n').trim();

            let htmlContent = marked.parse(content);

            // Post-process Experience
            if (title.includes('history')) {
                // Match *Job Title, Company, State* *Date Range*
                htmlContent = htmlContent.replace(/<p><em>(.*?)<\/em>\s+<em>(.*?)<\/em><\/p>/g, 
                    '<div class="experience-item"><div class="item-header"><span class="item-title">$1</span><span class="item-meta">$2</span></div>');
                
                // Close divs before the next one or at the end
                htmlContent = htmlContent.replace(/<\/ul>\s*<div/g, '</ul></div><div');
                if (htmlContent.includes('<div class="')) {
                    htmlContent += '</div>';
                }
            }

            // Post-process Projects
            if (title.includes('projects')) {
                // Match *Project Name*
                htmlContent = htmlContent.replace(/<p><em>(.*?)<\/em><\/p>/g, 
                    '<div class="project-item"><div class="item-header"><span class="item-title">$1</span></div>');
                
                htmlContent = htmlContent.replace(/<\/ul>\s*<div/g, '</ul></div><div');
                if (htmlContent.includes('<div class="')) {
                    htmlContent += '</div>';
                }
            }

            if (title.includes('summary')) sections.summary = htmlContent;
            if (title.includes('competencies')) sections.skills = htmlContent;
            if (title.includes('history')) sections.experience = htmlContent;
            if (title.includes('projects')) sections.projects = htmlContent;
            if (title.includes('patents')) sections.patents = htmlContent;
            if (title.includes('awards')) sections.awards = htmlContent;
            if (title.includes('education')) sections.education = htmlContent;
        });

        // Fill template
        let html = template;
        html = html.replace('{{name}}', sections.name || '');
        html = html.replace('{{contact}}', sections.contact || '');
        html = html.replace('{{summary}}', sections.summary || '');
        html = html.replace('{{education}}', sections.education || '');
        html = html.replace('{{experience}}', sections.experience || '');
        html = html.replace('{{projects}}', sections.projects || '');
        html = html.replace('{{patents}}', sections.patents || '');
        html = html.replace('{{awards}}', sections.awards || '');
        html = html.replace('{{skills}}', sections.skills || '');

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
            scale: 0.98,
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
