import React from "react";
import { portfolioData } from "../data/portfolio";

const ResumeBuilder = () => {
  return (
    <div className="hidden">
      <div
        id="resume-page"
        className="font-sans text-[10px] leading-[1.2] text-black bg-white m-0 p-8 w-[794px] h-[1123px] box-border relative overflow-hidden"
        style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-stone-900 pb-4 mb-4">
          <h1 className="text-2xl font-bold m-0 mb-1 uppercase tracking-tighter text-black">{portfolioData.name}</h1>
          <p className="text-xs font-bold m-0 mb-2 text-stone-700 uppercase tracking-widest">
            {portfolioData.title}
          </p>
          <p className="text-[9px] m-0 text-stone-600 tracking-wide font-medium">
            {portfolioData.email} | {portfolioData.phone} | {portfolioData.location}
          </p>
          <p className="text-[9px] m-0 mt-1 text-stone-500 italic">
            LinkedIn: shashank-mahajan-7baa1979 | Portfolio: shashankmahajan.netlify.app
          </p>
        </div>

        {/* Professional Summary */}
        <div className="mb-4">
          <h2 className="text-[11px] font-bold text-stone-900 mb-1.5 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Executive Summary</h2>
          <p className="text-[9.5px] text-stone-700 leading-relaxed text-justify">
            {portfolioData.summary}
          </p>
        </div>

        {/* Technical Skills - Compact Grid */}
        <div className="mb-4">
          <h2 className="text-[11px] font-bold text-stone-900 mb-1.5 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px]">
            {["Backend", "Cloud", "Security", "Algorithms"].map(cat => (
              <div key={cat} className="flex gap-1.5">
                <span className="font-bold text-stone-900 min-w-[65px]">{cat}:</span>
                <span className="text-stone-700">
                  {portfolioData.skills.filter(s => s.category === cat).map(s => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-4">
          <h2 className="text-[11px] font-bold text-stone-900 mb-1.5 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Selected Experience</h2>
          
          {portfolioData.experience.slice(0, 3).map((exp, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-[10.5px] font-bold text-stone-800">{exp.role}</h3>
                <span className="text-[9px] font-bold text-stone-500 italic">{exp.period}</span>
              </div>
              <p className="text-[9.5px] font-bold text-stone-600 mb-1 uppercase tracking-tight">{exp.company}</p>
              <ul className="mt-0 mb-1 ml-4 text-[9px] text-stone-700 list-disc space-y-0.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="leading-tight">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Projects with Impact focus */}
        <div className="mb-4">
          <h2 className="text-[11px] font-bold text-stone-900 mb-1.5 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Key Engineering Projects</h2>
          <div className="grid grid-cols-1 gap-y-2">
            {portfolioData.projects.slice(0, 2).map((proj, i) => (
              <div key={i} className="bg-stone-50 p-2 rounded-sm border-l-2 border-stone-300">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="text-[10px] font-bold text-stone-800">{proj.title}</h3>
                  <span className="text-[8px] font-bold text-stone-500 uppercase">{proj.tech.slice(0, 3).join(" | ")}</span>
                </div>
                <p className="text-[8.5px] text-stone-700 leading-tight mb-1">{proj.description}</p>
                <div className="flex gap-4">
                  <div className="text-[8px] text-stone-600 italic"><strong>DSA:</strong> {proj.dsa}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Education & Awards */}
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <h2 className="text-[10px] font-bold text-stone-900 mb-1 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Education</h2>
            {portfolioData.education.slice(0, 1).map((edu, i) => (
              <div key={i}>
                <h3 className="text-[9px] font-bold text-stone-800">{edu.degree}</h3>
                <p className="text-[8.5px] text-stone-600">{edu.institution} | {edu.period}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-[10px] font-bold text-stone-900 mb-1 pb-0.5 border-b border-stone-200 uppercase tracking-widest">Awards & Recognition</h2>
            <ul className="ml-3 text-[8.5px] text-stone-700 list-disc space-y-0">
              {portfolioData.achievements.slice(0, 3).map((ach, i) => (
                <li key={i}>{ach.title} ({ach.year})</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content overflow warning */}
        <div id="content-overflow-warning" className="hidden absolute bottom-2 left-2 right-2 bg-red-50 border border-red-200 text-red-700 px-2 py-1 text-[7px] text-center uppercase font-bold">
          ⚠️ Content exceeds single page limit.
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
