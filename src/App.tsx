import React, { useEffect, useState } from "react";
import {
  Code,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Download,
  Award,
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Database,
  Cloud,
  Monitor,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import profilePhoto from "./assets/profilePhoto.png";

const App: React.FC = () => {
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
    {
      name: "GoLang",
      level: "Expert",
      icon: <Code className="w-4 h-4" />,
      category: "Backend",
      experience: "4+ years",
    },
    {
      name: "React.js",
      level: "Expert",
      icon: <Monitor className="w-4 h-4" />,
      category: "Frontend",
      experience: "4+ years",
    },
    {
      name: "Angular",
      level: "Advanced",
      icon: <Monitor className="w-4 h-4" />,
      category: "Frontend",
      experience: "1+ years",
    },
    {
      name: "Cybersecurity",
      level: "Intermediate",
      icon: <Shield className="w-4 h-4" />,
      category: "Security",
      experience: "CTF Expert",
    },
    {
      name: "Google Cloud Platform",
      level: "Advanced",
      icon: <Cloud className="w-4 h-4" />,
      category: "Cloud",
      experience: "3+ years",
    },
    {
      name: "Docker/Podman",
      level: "Advanced",
      icon: <Zap className="w-4 h-4" />,
      category: "DevOps",
      experience: "4+ years",
    },
    {
      name: "MySQL",
      level: "Advanced",
      icon: <Database className="w-4 h-4" />,
      category: "Database",
      experience: "3+ years",
    },
    {
      name: "MongoDB",
      level: "Intermediate",
      icon: <Database className="w-4 h-4" />,
      category: "Database",
      experience: "2+ years",
    },
  ] as const;

  const projects = [
    {
      title: "HSMs Manager",
      subtitle: "HSM Fleet Management Platform",
      description:
        "Enterprise-grade centralized management platform for Thales HSM devices with real-time monitoring, OAuth2 security, and 90% operational overhead reduction.",
      tech: ["React.js", "GoLang", "OAuth2", "GCP", "REST APIs"],
      metrics: [
        "90% reduction in management overhead",
        "80% faster client onboarding",
        "OAuth2 compliance implementation",
      ],
      status: "In Development",
      type: "Enterprise Solution",
      year: "2024-2025",
      role: "Lead Full-Stack Developer",
    },
    {
      title: "Gambit Service Broker",
      subtitle: "Cloud-Native HSM Provisioning",
      description:
        "OSB-compliant microservice enabling automated HSM provisioning in cloud environments, adopted by 50+ enterprise clients with 70% setup time reduction.",
      tech: ["GoLang", "Microservices", "Docker", "OSB", "AWS", "Azure", "GCP"],
      metrics: [
        "50+ enterprise client adoption",
        "70% reduction in manual setup time",
        "Multi-cloud platform support",
      ],
      status: "Live",
      type: "Microservice Platform",
      year: "2021-2023",
      role: "Backend Developer",
    },
    {
      title: "Gambit Web Application",
      subtitle: "HSM Management Interface",
      description:
        "Full-stack React application providing intuitive interface for HSM provisioning, reducing manual setup time by 80% with improved user experience.",
      tech: ["React.js", "REST APIs", "OSB APIs", "Docker"],
      metrics: [
        "80% reduction in manual setup time",
        "Improved user experience",
        "Intuitive provisioning interface",
      ],
      status: "Production",
      type: "Web Application",
      year: "2021-2023",
      role: "Full-Stack Developer",
    },
    {
      title: "DISCREET Platform",
      subtitle: "Cryptocurrency Web3 Platform",
      description:
        "Web3-enabled cryptocurrency platform for Danish startup that helped raise $10 Million via IOU tokens, serving 100,000+ users with secure wallet integration.",
      tech: ["React.js", "Web3.js", "Blockchain", "Crypto Wallets"],
      metrics: [
        "Helped raise $10M in funding",
        "100,000+ active users",
        "Secure crypto transaction gateway",
      ],
      status: "Live",
      type: "Blockchain Platform",
      year: "2022",
      role: "Frontend Developer",
    },
  ] as const;

  const achievements = [
    {
      title: "Technical Leadership",
      subtitle: "Leading HSMs Manager development",
      year: "2024-2025",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "CTF Competition - 4th Place",
      subtitle: "Thales DIS Cybersecurity Challenge",
      year: "2024",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "CTF Competition - 3rd Place",
      subtitle: "Thales DIS Cybersecurity Challenge",
      year: "2023",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Thales Spot Award",
      subtitle: "Xtra Miler Award for Creative Problem-Solving",
      year: "2023",
      icon: <Award className="w-5 h-5" />,
    },
  ] as const;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">
              Shashank<span className="text-blue-600">.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Projects", "Experience", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* Desktop CTA */}
            <button
              className="hidden md:flex bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 items-center gap-2"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="w-4 h-4" />
              Resume
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
              <div className="px-4 py-6 space-y-4">
                {["About", "Skills", "Projects", "Experience", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  )
                )}
                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Profile Image Placeholder */}
            <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
              <div className="relative w-full h-full bg-gray-100 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="text-blue-600 text-lg font-medium">
                Hello, I'm
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 mb-4">
                Shashank Mahajan
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-2">
                Senior Full-Stack Developer
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Building enterprise solutions with modern technologies. 4+ years
                experience in payments, cybersecurity & CTF competitions.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-blue-50 px-4 py-3 rounded-lg">
                <span className="text-blue-600 font-bold text-lg">4+</span>
                <span className="text-gray-600 text-sm block">
                  Years Experience
                </span>
              </div>
              <div className="bg-green-50 px-4 py-3 rounded-lg">
                <span className="text-green-600 font-bold text-lg">
                  Enterprise
                </span>
                <span className="text-gray-600 text-sm block">
                  HSM Solutions
                </span>
              </div>
              <div className="bg-purple-50 px-4 py-3 rounded-lg">
                <span className="text-purple-600 font-bold text-lg">CTF</span>
                <span className="text-gray-600 text-sm block">
                  Enthusiast
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center mb-8">
              <a
                href="mailto:shashankmahajan99@gmail.com"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-mahajan-7baa1979"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="tel:+918178528246"
                className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-gray-600" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Senior Full-Stack Developer with 4+ years of experience in
              building enterprise-grade solutions using modern technologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">My Journey</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm an enthusiastic full-stack developer currently working as a
                  Senior Software Engineer at Thales DIS, where I spearhead the
                  development of HSMs Manager, a centralized React/GoLang
                  solution for monitoring and managing next-generation Thales
                  HSM Payment products.
                </p>
                <p>
                  My expertise encompasses modern web technologies, cloud
                  platforms, enterprise architecture, and cybersecurity. I've
                  successfully delivered projects that reduced client onboarding
                  time by 80% and operational overhead by 90% through automation
                  and innovative development practices.
                </p>
                <p>
                  I'm also deeply involved in cybersecurity competitions, having
                  achieved 3rd and 4th place in Thales DIS CTF competitions,
                  showcasing advanced problem-solving and cybersecurity
                  proficiency alongside my development skills.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="text-gray-900 font-semibold">4+ Years</h4>
                  <p className="text-gray-500 text-sm">
                    Professional Experience
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="text-gray-900 font-semibold">Enterprise</h4>
                  <p className="text-gray-500 text-sm">B2B Solutions</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {achievement.subtitle}
                      </p>
                      <span className="text-blue-600 text-xs">
                        {achievement.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expertise in modern full-stack technologies with focus on
              enterprise solutions and cloud architecture
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600">{skill.icon}</div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base">
                      {skill.name}
                    </h3>
                    <span className="text-gray-500 text-xs">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === "Expert"
                        ? "bg-green-100 text-green-700"
                        : skill.level === "Advanced"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {skill.level}
                  </div>
                  <p className="text-gray-500 text-xs">{skill.experience}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Monitor className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">
                Frontend Development
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Modern, responsive web applications
              </p>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Angular", "HTML5", "CSS3", "Web3.js"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <Database className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">
                Backend Development
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Scalable server-side solutions
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "GoLang",
                  "Node.js",
                  "Python",
                  "REST APIs",
                  "Microservices",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <Shield className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">
                Cybersecurity & CTFs
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Security expertise & competitive achievements
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "CTF Competitions",
                  "OAuth2",
                  "Security Analysis",
                  "Pentesting",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <Cloud className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">
                Cloud & DevOps
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Cloud-native architecture & automation
              </p>
              <div className="flex flex-wrap gap-2">
                {["GCP", "Docker", "GitLab CI/CD", "Bamboo"].map((tech) => (
                  <span
                    key={tech}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade solutions that drive business value and improve
              operational efficiency
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {project.type}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {project.subtitle}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.role}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {project.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Professional Journey
            </h2>
            <p className="text-gray-600">
              Building enterprise solutions and leading technical innovations
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

            <div className="space-y-8 sm:space-y-12">
              <div className="relative flex items-start gap-6 sm:gap-8">
                <div className="absolute left-2 sm:left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm" />
                <div className="ml-8 sm:ml-16">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Senior Software Engineer
                      </h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mt-2 sm:mt-0 self-start">
                        Current
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">
                      Thales DIS • Jan 2024 - Present
                    </p>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      Leading HSMs Manager development for HSM fleet management.
                      Architecting OAuth2-compliant solutions and building
                      enterprise-grade React/GoLang applications for the
                      payments industry.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Team Leadership",
                        "Architecture Design",
                        "OAuth2 Implementation",
                        "Performance Optimization",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start gap-6 sm:gap-8">
                <div className="absolute left-2 sm:left-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-sm" />
                <div className="ml-8 sm:ml-16">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      Software Engineer
                    </h3>
                    <p className="text-purple-600 font-medium mb-2">
                      Thales DIS • Feb 2021 - Dec 2023
                    </p>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      Developed Gambit Service Broker and Web Application. Built
                      OSB-compliant microservices, implemented automation
                      frameworks, and mentored junior developers.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Microservices",
                        "Full-Stack Development",
                        "Mentoring",
                        "CI/CD Implementation",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start gap-6 sm:gap-8">
                <div className="absolute left-2 sm:left-6 w-4 h-4 bg-gray-400 rounded-full border-4 border-white shadow-sm" />
                <div className="ml-8 sm:ml-16">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      Amity University • 2017 - 2021
                    </p>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      Bachelor of Technology in Information Technology. CGPA:
                      7.72/10 (77.2%)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Computer Science",
                        "Data Structures",
                        "Algorithms",
                        "Software Engineering",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Ready to discuss your next project or explore collaboration
            opportunities?
          </p>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                shashankmahajan99@gmail.com
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+91 8178528246</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Linkedin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-600 text-sm"><a className="underline text-blue-600" href="https://www.linkedin.com/in/shashank-mahajan-7baa1979">
                Connect with me
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:shashankmahajan99@gmail.com"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/shashank-mahajan-7baa1979"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Built with React & Tailwind CSS.</p>
          <p className="text-gray-500 text-sm mt-2">
            Illustrations created with Canva • Modern design for modern
            solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
