import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "Shashank Mahajan",
  title: "Senior Full-Stack Engineer",
  email: "shashankmahajan99@gmail.com",
  phone: "+91 8178528246",
  linkedin: "https://www.linkedin.com/in/shashank-mahajan-7baa1979",
  portfolio: "https://shashankmahajan.netlify.app/",
  location: "Delhi, India",
  summary: "Senior Full-Stack Engineer with 5+ years of experience in high-performance backend architectures, cybersecurity, and cloud-native systems. Leading development for a portfolio of enterprise security platforms serving 50+ global clients and securing critical cryptographic operations. Expert in GoLang and React, specializing in Next-Gen HSM (Hardware Security Module) management and automated cloud provisioning. Skilled in applying DSA to solve complex scalability and concurrency challenges in security-first environments.",
  skills: [
    { name: "GoLang", level: "Proficient", category: "Backend", experience: "4+ years" },
    { name: "React.js", level: "Expert", category: "Frontend", experience: "4+ years" },
    { name: "HSM Lifecycle & IAM", level: "Expert", category: "Security", experience: "4+ years" },
    { name: "Microservices & gRPC", level: "Expert", category: "Backend", experience: "4+ years" },
    { name: "OAuth2 & API Security", level: "Expert", category: "Security", experience: "4+ years" },
    { name: "Swagger / OpenAPI", level: "Expert", category: "Security", experience: "4+ years" },
    { name: "REST APIs", level: "Expert", category: "Backend", experience: "4+ years" },
    { name: "Docker / Podman", level: "Skilled", category: "DevOps", experience: "4+ years" },
    { name: "CI/CD (GitLab CI, Jenkins, GitHub Actions)", level: "Proficient", category: "DevOps", experience: "4+ years" },
    { name: "GCP (Google Cloud)", level: "Skilled", category: "Cloud", experience: "3+ years" },
    { name: "MongoDB / MySQL", level: "Proficient", category: "Database", experience: "4+ years" },
    { name: "Algorithms & DSA", level: "Expert", category: "Algorithms", experience: "5+ years" },
  ],
  projects: [
    {
      title: "HSMs Manager (Next-Gen Platform)",
      subtitle: "Unified HSM Management Platform",
      description: "Leading the development of a centralized React/GoLang platform for Next-Gen HSM lifecycle management. Providing a single interface for critical tasks including Key Management, IAM, Cryptography services, and streamlined customer onboarding.",
      tech: ["GoLang", "React", "OAuth2", "GCP", "REST APIs", "Swagger"],
      metrics: [
        "Architecting a unified platform for multi-tenant HSM lifecycle management",
        "80% faster client onboarding via OAuth2-compliant integration flows",
        "Standardizing Cryptography and IAM interfaces for Next-Gen hardware"
      ],
      status: "In Development",
      type: "Security Infrastructure",
      year: "2025 - Present",
      architecture: "Cloud-native microservices architecture for secure multi-tenant access",
      dsa: "Implemented Swagger/OpenAPI documentation and OAuth2 compliance for hardware-level security."
    },
    {
      title: "Cloud-HSM Provisioning Broker",
      subtitle: "Automated Cloud HSM Provisioning",
      description: "Engineered an OSB-compliant microservice facilitating automated provisioning of Thales HSMs across multi-cloud environments (AWS, Azure, GCP) using GoLang and MongoDB.",
      tech: ["GoLang", "Microservices", "Docker", "OSB API", "GCP", "MongoDB"],
      metrics: [
        "Successfully adopted by 50+ global enterprise clients",
        "70% reduction in manual setup and configuration time",
        "Core infrastructure for Thales cloud-based cryptographic services"
      ],
      status: "Live",
      type: "Cloud Infrastructure",
      year: "2021 - 2025",
      architecture: "Broker pattern implementation for cross-cloud resource abstraction",
      dsa: "Utilized MongoDB for distributed state management and custom LRU caching for performance."
    },
    {
      title: "DISCREET Platform",
      subtitle: "Web3 Financial Security",
      description: "Engineered a secure cryptocurrency platform for a Danish startup, focusing on wallet security and high-concurrency transaction handling.",
      tech: ["React.js", "Web3.js", "GoLang", "Blockchain"],
      metrics: [
        "Enabled $10M funding raise via secure IOU Token architecture",
        "Successfully served 100,000+ active users with zero security incidents",
        "Integrated high-performance crypto-payment gateways"
      ],
      status: "Live",
      type: "Blockchain",
      year: "2021 - 2023",
      architecture: "Stateless backend architecture with cryptographic verification layers",
      dsa: "Optimized transaction verification using Merkle tree implementations for efficient proofing."
    }
  ],
  experience: [
    {
      company: "Thales DIS",
      role: "Senior Software Engineer",
      period: "Jan 2024 - Present",
      highlights: [
        "Achieved an 83% reduction in deployment time by building a high-performance Go-based automation framework and optimizing CI/CD pipelines.",
        "Leading end-to-end development of HSMs Manager, a centralized React/GoLang platform for Next-Gen HSM lifecycle management.",
        "Architected OAuth2 compliance for REST APIs and implemented Swagger/OpenAPI for seamless third-party integrations."
      ]
    },
    {
      company: "Thales DIS",
      role: "Software Engineer",
      period: "Feb 2021 - Dec 2023",
      highlights: [
        "Reduced manual setup time by 80% by engineering React-based management interfaces for hardware provisioning and automated lifecycle tasks.",
        "Developed Cloud-HSM Provisioning Broker (OSB-compliant) using GoLang and MongoDB, enabling automated cloud provisioning for 50+ global clients.",
        "Implemented comprehensive REST API suites adhering to Open Service Broker specifications for AWS, Azure, and GCP."
      ]
    }
  ],
  achievements: [
    { title: "US Patent Filed (Nov 2025)", subtitle: "System and Method for Remote PIN Mailing for secure API authentication", year: "2025" },
    { title: "Thales DIS CTF Global Finalist", subtitle: "Consistent Top Performer: Ranked 3rd, 4th, & 5th globally in 2023, 2024, and 2025 respectively", year: "2023 - 2025" },
    { title: "Thales Spot Award (Xtra Miler)", subtitle: "Recognized for innovative security infrastructure solutions", year: "2023" },
    { title: "DSA & Advanced Algorithms Certification", subtitle: "GeeksForGeeks Professional Certification", year: "2019" }
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Amity University, Noida",
      period: "2017 - 2021",
      details: "Focused on Cryptography and Distributed Systems."
    }
  ]
};