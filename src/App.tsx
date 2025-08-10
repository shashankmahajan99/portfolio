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
  Award
} from "lucide-react";
import profilePhoto from "./assets/profilePhoto.png";

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

  const skills = [
    { name: "GoLang", level: "Expert", icon: <Code className="w-5 h-5" />, category: "Backend", experience: "4+ years" },
    { name: "React.js", level: "Expert", icon: <Monitor className="w-5 h-5" />, category: "Frontend", experience: "4+ years" },
    { name: "Angular", level: "Advanced", icon: <Monitor className="w-5 h-5" />, category: "Frontend", experience: "1+ years" },
    { name: "Cybersecurity", level: "Intermediate", icon: <Shield className="w-5 h-5" />, category: "Security", experience: "CTF Expert" },
    { name: "Google Cloud Platform", level: "Advanced", icon: <Cloud className="w-5 h-5" />, category: "Cloud", experience: "3+ years" },
    { name: "Docker/Podman", level: "Advanced", icon: <Zap className="w-5 h-5" />, category: "DevOps", experience: "4+ years" },
    { name: "MySQL", level: "Advanced", icon: <Database className="w-5 h-5" />, category: "Database", experience: "3+ years" },
    { name: "MongoDB", level: "Intermediate", icon: <Database className="w-5 h-5" />, category: "Database", experience: "2+ years" },
  ];

  const projects = [
    {
      title: "HSMs Manager",
      subtitle: "HSM Fleet Management Platform",
      description: "Enterprise-grade centralized management platform for Thales HSM devices with real-time monitoring, OAuth2 security, and 90% operational overhead reduction.",
      tech: ["React.js", "GoLang", "OAuth2", "GCP", "REST APIs"],
      metrics: ["90% reduction in management overhead", "80% faster client onboarding", "OAuth2 compliance implementation"],
      status: "In Development",
      type: "Enterprise Solution",
      year: "2024-2025",
    },
    {
      title: "Gambit Service Broker",
      subtitle: "Cloud-Native HSM Provisioning",
      description: "OSB-compliant microservice enabling automated HSM provisioning in cloud environments, adopted by enterprise clients with 70% setup time reduction.",
      tech: ["GoLang", "Microservices", "Docker", "OSB", "AWS", "Azure", "GCP"],
      metrics: ["enterprise client adoption", "70% reduction in manual setup time", "Multi-cloud platform support"],
      status: "Live",
      type: "Microservice Platform",
      year: "2021-2023",
    },
    {
      title: "Gambit Web Application",
      subtitle: "HSM Management Interface",
      description: "Full-stack React application providing intuitive interface for HSM provisioning, reducing manual setup time by 80% with improved user experience.",
      tech: ["React.js", "REST APIs", "OSB APIs", "Docker"],
      metrics: ["80% reduction in manual setup time", "Improved user experience", "Intuitive provisioning interface"],
      status: "Production",
      type: "Web Application",
      year: "2021-2023",
    },
    {
      title: "DISCREET Platform",
      subtitle: "Cryptocurrency Web3 Platform",
      description: "Web3-enabled cryptocurrency platform for Danish startup that helped raise $10 Million via IOU tokens, serving 100,000+ users with secure wallet integration.",
      tech: ["React.js", "Web3.js", "Blockchain", "Crypto Wallets"],
      metrics: ["Helped raise $10M in funding", "100,000+ active users", "Secure crypto transaction gateway"],
      status: "Live",
      type: "Blockchain Platform",
      year: "2022",
    },
  ];

  const achievements = [
    { title: "Technical Leadership", subtitle: "Leading HSMs Manager development", year: "2024-2025", icon: <Users className="w-5 h-5" /> },
    { title: "CTF Competition - 4th Place", subtitle: "Thales DIS Cybersecurity Challenge", year: "2024", icon: <Shield className="w-5 h-5" /> },
    { title: "CTF Competition - 3rd Place", subtitle: "Thales DIS Cybersecurity Challenge", year: "2023", icon: <Shield className="w-5 h-5" /> },
    { title: "Thales Spot Award", subtitle: "Xtra Miler Award for Creative Problem-Solving", year: "2023", icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-stone-50/95 backdrop-blur-sm border-b border-stone-200" : "bg-transparent"}`}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-xl font-medium text-stone-900 tracking-wide">
              Shashank Mahajan
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12">
              {["Work", "About", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-stone-600 hover:text-stone-900 transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              className="hidden md:flex bg-stone-900 text-stone-50 px-6 py-2 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-all duration-200"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Resume
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-stone-600">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-stone-200 bg-stone-50">
              <div className="px-6 py-8 space-y-6">
                {["Work", "About", "Skills", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-stone-600 hover:text-stone-900 transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full bg-stone-900 text-stone-50 px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-all duration-200">
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image Placeholder */}
          <div className="relative mx-auto w-48 h-48 mb-12">
            <div className="w-full h-full bg-stone-200 rounded-full flex items-center justify-center">
              <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-stone-900 rounded-full flex items-center justify-center">
              <span className="text-stone-50 text-xs font-medium">SM</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-light text-stone-900 tracking-tight">
                Senior Full-Stack
                <br />
                Developer
              </h1>
              <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Building enterprise solutions with modern technologies. 
                4+ years experience in payments, cybersecurity & CTF competitions.
              </p>
            </div>

            {/* Simple stats */}
            <div className="flex justify-center space-x-12 text-sm text-stone-500 uppercase tracking-wider">
              <div>4+ Years</div>
              <div>Enterprise</div>
              <div>CTF Expert</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                className="bg-stone-900 text-stone-50 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-all duration-200"
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Work
              </button>
              <button
                className="border border-stone-300 text-stone-600 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-200"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">Selected Work</h2>
            <p className="text-stone-600 text-lg max-w-2xl">
              Enterprise-grade solutions that drive business value and improve operational efficiency.
            </p>
          </div>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <div key={index} className="border-b border-stone-200 pb-20 last:border-b-0 last:pb-0">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      <div className="text-sm text-stone-500 uppercase tracking-wider">
                        {project.year} • {project.type}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light text-stone-900">{project.title}</h3>
                      <p className="text-stone-600 font-medium">{project.subtitle}</p>
                      <div className="inline-block">
                        <span className={`px-3 py-1 text-xs uppercase tracking-wider font-medium ${
                          project.status === "Live" ? "bg-green-100 text-green-800" : 
                          project.status === "Production" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8">
                    <div className="space-y-6">
                      <p className="text-stone-600 leading-relaxed">{project.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm text-stone-500 uppercase tracking-wider mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span key={tech} className="text-xs text-stone-600 border border-stone-200 px-3 py-1">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-stone-500 uppercase tracking-wider mb-3">Impact</h4>
                          <div className="space-y-2">
                            {project.metrics.map((metric, metricIndex) => (
                              <div key={metricIndex} className="flex items-start gap-3">
                                <div className="w-1 h-1 bg-stone-400 rounded-full mt-3 flex-shrink-0"></div>
                                <span className="text-stone-600 text-sm leading-relaxed">{metric}</span>
                              </div>
                            ))}
                          </div>
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
      <section id="about" className="py-24 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-stone-900">About</h2>
                <p className="text-stone-600 leading-relaxed">
                  Senior Full-Stack Developer with 4+ years of experience building enterprise-grade solutions. 
                  Currently at Thales DIS, leading the development of HSMs Manager for next-generation payment products.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  Passionate about cybersecurity, having achieved 3rd and 4th place in Thales DIS CTF competitions. 
                  I specialize in React, GoLang, and cloud architecture, with a track record of reducing operational 
                  overhead by 90% through automation and innovation.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm text-stone-500 uppercase tracking-wider mb-4">Experience</h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-stone-300 pl-6">
                      <div className="text-stone-900 font-medium">Senior Software Engineer</div>
                      <div className="text-stone-600">Thales DIS • 2024 - Present</div>
                    </div>
                    <div className="border-l-2 border-stone-300 pl-6">
                      <div className="text-stone-900 font-medium">Software Engineer</div>
                      <div className="text-stone-600">Thales DIS • 2021 - 2023</div>
                    </div>
                    <div className="border-l-2 border-stone-300 pl-6">
                      <div className="text-stone-900 font-medium">B.Tech Information Technology</div>
                      <div className="text-stone-600">Amity University • 2017 - 2021</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-stone-500 uppercase tracking-wider mb-4">Recognition</h3>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-stone-400 rounded-full flex-shrink-0"></div>
                        <div className="text-stone-600 text-sm">
                          {achievement.title} • {achievement.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">Technical Skills</h2>
            <p className="text-stone-600 text-lg max-w-2xl">
              Expertise in modern full-stack technologies with focus on enterprise solutions and cloud architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-stone-400">{skill.icon}</div>
                  <div>
                    <h3 className="text-stone-900 font-medium">{skill.name}</h3>
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{skill.category}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className={`inline-block px-2 py-1 text-xs uppercase tracking-wider font-medium ${
                    skill.level === "Expert" ? "bg-stone-900 text-stone-50" :
                    skill.level === "Advanced" ? "bg-stone-200 text-stone-800" : "bg-stone-100 text-stone-600"
                  }`}>
                    {skill.level}
                  </div>
                  <p className="text-stone-500 text-xs">{skill.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">Let's Work Together</h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Ready to discuss your next project or explore collaboration opportunities?
            </p>

            <div className="grid sm:grid-cols-3 gap-8 pt-8">
              <div className="space-y-2">
                <Mail className="w-6 h-6 text-stone-400 mx-auto" />
                <div className="text-stone-600 text-sm">shashankmahajan99@gmail.com</div>
              </div>
              <div className="space-y-2">
                <Phone className="w-6 h-6 text-stone-400 mx-auto" />
                <div className="text-stone-600 text-sm">+91 8178528246</div>
              </div>
              <div className="space-y-2">
                <Linkedin className="w-6 h-6 text-stone-400 mx-auto" />
                <div className="text-stone-600 text-sm">
                  <a href="https://www.linkedin.com/in/shashank-mahajan-7baa1979" className="hover:text-stone-900 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="mailto:shashankmahajan99@gmail.com"
                className="bg-stone-900 text-stone-50 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-all duration-200"
              >
                Get In Touch
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-mahajan-7baa1979"
                className="border border-stone-300 text-stone-600 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-stone-500 text-sm">Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}