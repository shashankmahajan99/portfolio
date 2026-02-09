import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Menu, 
  X,
  Code,
  Monitor,
  Shield,
  Cloud,
  Zap,
  Database,
  Users,
  Award,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import profilePhoto from "./assets/profilePhoto.png";
import { portfolioData } from "./data/portfolio";
import ResumeBuilder from "./components/ResumeBuilder";
import { generatePDF } from "./utils/pdfGenerator";

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case "Backend": return <Code className="w-5 h-5" />;
      case "Frontend": return <Monitor className="w-5 h-5" />;
      case "Security": return <Shield className="w-5 h-5" />;
      case "Cloud": return <Cloud className="w-5 h-5" />;
      case "DevOps": return <Zap className="w-5 h-5" />;
      case "Database": return <Database className="w-5 h-5" />;
      case "Algorithms": return <Zap className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-stone-200 selection:text-stone-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-stone-50/95 backdrop-blur-sm border-b border-stone-200 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-stone-900 tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 bg-stone-900 text-stone-50 flex items-center justify-center rounded text-sm font-bold">SM</span>
              {portfolioData.name}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-stone-600 hover:text-stone-900 transition-colors duration-200 text-sm uppercase tracking-widest font-semibold"
                >
                  {item}
                </a>
              ))}
              <button
                className="bg-stone-900 text-stone-50 px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-all duration-200 rounded-sm"
                onClick={generatePDF}
              >
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-stone-600">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-stone-50 border-t border-stone-200 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="px-6 py-8 space-y-6">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-stone-600 hover:text-stone-900 transition-colors duration-200 text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className="w-full bg-stone-900 text-stone-50 px-6 py-4 text-sm uppercase tracking-widest font-bold hover:bg-stone-800 transition-all duration-200"
                onClick={generatePDF}
              >
                View Resume
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-12 inline-block relative">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-stone-200 rounded-full p-1 border-2 border-stone-200 overflow-hidden shadow-2xl">
              <img src={profilePhoto} alt={portfolioData.name} className="w-full h-full rounded-full object-cover transition-all duration-700" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-stone-900 text-white p-3 rounded-full shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight leading-tight">
                {portfolioData.name}
              </h1>
              <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
                Architecting secure, scalable backend systems with <span className="text-stone-900 font-medium italic underline decoration-stone-300 underline-offset-4">GoLang & Cloud-Native</span> technologies.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-500 uppercase tracking-[0.2em] font-bold">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-900 rounded-full"></div> Senior Engineer</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-400 rounded-full"></div> 5+ Years Exp</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-400 rounded-full"></div> Security Expert</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
              <button
                className="group bg-stone-900 text-stone-50 px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-stone-800 transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="border-2 border-stone-200 text-stone-600 px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-300 rounded-sm"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">Case Studies</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-stone-900">Featured Engineering Work</h3>
            </div>
            <p className="text-stone-500 text-lg font-light md:text-right max-w-sm">
              Battle-tested infrastructure for security-first enterprise organizations.
            </p>
          </div>

          <div className="grid gap-24">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="group relative">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-400">
                      <span>{project.year}</span>
                      <span className="w-8 h-[1px] bg-stone-200"></span>
                      <span>{project.type}</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold text-stone-900 group-hover:text-stone-600 transition-colors">{project.title}</h4>
                    <p className="text-xl text-stone-500 font-light italic">{project.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-stone-50 text-stone-600 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border border-stone-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-7 bg-stone-50 p-8 md:p-12 rounded-sm border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-8">
                      <div>
                        <h5 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-4 flex items-center gap-2">
                          <Code className="w-4 h-4" /> Technical Overview
                        </h5>
                        <p className="text-stone-600 leading-relaxed text-lg font-light">{project.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Architecture & DSA
                          </h5>
                          <p className="text-stone-500 text-sm leading-relaxed mb-2 font-medium">{project.architecture}</p>
                          <p className="text-stone-500 text-sm leading-relaxed italic">{project.dsa}</p>
                        </div>
                        <div>
                          <h5 className="text-xs uppercase tracking-widest font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4" /> Key Impact
                          </h5>
                          <ul className="space-y-3">
                            {project.metrics.map((metric, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-3 text-stone-600 text-sm">
                                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full mt-1.5 flex-shrink-0"></span>
                                {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-stone-900 text-stone-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500 font-bold">The Narrative</h2>
                <h3 className="text-4xl md:text-5xl font-bold">Engineering for Scale, Security, & Systems Thinking</h3>
              </div>
              
              <div className="space-y-6 text-stone-400 text-lg md:text-xl font-light leading-relaxed">
                <p>
                  With over 5 years in the trenches of backend engineering, I've specialized in the evolution of distributed cloud-native Go microservices. My approach is rooted in <span className="text-stone-50 font-medium">first-principles thinking</span> and a rigorous application of Data Structures & Algorithms.
                </p>
                <p>
                  Currently, I lead architectural initiatives at Thales DIS, where I specialize in Hardware Security Modules (HSM) and cloud provisioning. I believe in <span className="text-stone-50 font-medium">balancing technical debt with rapid innovation</span> while building secure, resilient infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 pt-8 border-t border-stone-800">
                <div>
                  <div className="text-4xl font-bold text-stone-50 mb-1">5+</div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-stone-50 mb-1">50+</div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Enterprise Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-stone-50 mb-1">3x</div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">System Throughput</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h4 className="text-sm uppercase tracking-[0.2em] text-stone-500 font-bold mb-8">Career Trajectory</h4>
                  <div className="space-y-10">
                    <div className="group relative pl-8 border-l border-stone-800">
                      <div className="absolute top-0 left-[-4.5px] w-2 h-2 bg-stone-50 rounded-full group-hover:scale-150 transition-transform"></div>
                      <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-2">Jan 2024 - Present</div>
                      <div className="text-xl font-bold text-stone-50 mb-1">Senior Software Engineer</div>
                      <div className="text-stone-400 font-medium">Thales DIS</div>
                    </div>
                    <div className="group relative pl-8 border-l border-stone-800">
                      <div className="absolute top-0 left-[-4.5px] w-2 h-2 bg-stone-50 rounded-full group-hover:scale-150 transition-transform"></div>
                      <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-2">Feb 2021 - Dec 2023</div>
                      <div className="text-xl font-bold text-stone-50 mb-1">Software Engineer</div>
                      <div className="text-stone-400 font-medium">Thales DIS</div>
                    </div>
                  </div>
              </div>

              <div className="bg-stone-800/50 p-8 rounded-sm border border-stone-800">
                <h4 className="text-sm uppercase tracking-[0.2em] text-stone-500 font-bold mb-6">Recognition</h4>
                <div className="space-y-6">
                  {portfolioData.achievements.map((ach, i) => (
                    <div key={i} className="flex gap-4">
                      <Award className="w-5 h-5 text-stone-500 flex-shrink-0" />
                      <div>
                        <div className="text-stone-50 font-bold text-sm">{ach.title}</div>
                        <div className="text-stone-500 text-xs mt-1">{ach.subtitle} • {ach.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">Technical Stack</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-stone-900">Expertise & Core Competencies</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="bg-white p-8 rounded-sm border border-stone-200 shadow-sm hover:border-stone-900 transition-all duration-300 group">
                <div className="text-stone-300 group-hover:text-stone-900 transition-colors mb-6">
                  {getIcon(skill.category)}
                </div>
                <h4 className="text-stone-900 font-bold text-lg mb-1">{skill.name}</h4>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-4">{skill.category}</div>
                <div className="inline-block px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest">
                  {skill.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold">Contact</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-stone-900">Let's Connect.</h3>
            <p className="text-stone-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Available for senior architectural roles, strategic consulting, or discussing high-scale system design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 pt-10">
            <a href={`mailto:${portfolioData.email}`} className="group p-8 border border-stone-100 rounded-sm hover:border-stone-900 transition-all">
              <Mail className="w-8 h-8 text-stone-300 mx-auto mb-4 group-hover:text-stone-900 transition-colors" />
              <div className="text-stone-900 font-bold text-sm truncate">{portfolioData.email}</div>
              <div className="text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">Email</div>
            </a>
            <div className="group p-8 border border-stone-100 rounded-sm hover:border-stone-900 transition-all">
              <Phone className="w-8 h-8 text-stone-300 mx-auto mb-4 group-hover:text-stone-900 transition-colors" />
              <div className="text-stone-900 font-bold text-sm">{portfolioData.phone}</div>
              <div className="text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">Phone</div>
            </div>
            <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="group p-8 border border-stone-100 rounded-sm hover:border-stone-900 transition-all">
              <Linkedin className="w-8 h-8 text-stone-300 mx-auto mb-4 group-hover:text-stone-900 transition-colors" />
              <div className="text-stone-900 font-bold text-sm">LinkedIn Profile</div>
              <div className="text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">Connect</div>
            </a>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`mailto:${portfolioData.email}`}
              className="bg-stone-900 text-stone-50 px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-stone-800 transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
            >
              Start a Conversation <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-stone-400 text-xs font-bold uppercase tracking-widest">
            © 2026 {portfolioData.name}. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
            <a href="#" className="hover:text-stone-900 transition-colors">Back to Top</a>
            <a href={portfolioData.linkedin} className="hover:text-stone-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
      <ResumeBuilder />
    </div>
  );
}
