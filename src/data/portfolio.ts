import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "Shashank Mahajan",
  title: "Senior Full-Stack Engineer",
  email: "shashankmahajan99@gmail.com",
  phone: "+91 8178528246",
  linkedin: "https://www.linkedin.com/in/shashank-mahajan-7baa1979",
  portfolio: "https://shashankmahajan.netlify.app/",
  location: "Noida, India",
  summary: "Senior Full-Stack Engineer with 5+ years of experience specializing in high-performance backend architectures, cybersecurity, and cloud-native systems. Specialized in GoLang and React, with a track record of architecting secure, scalable platforms for Next-Gen HSM management. Expert in applying Data Structures & Algorithms (DSA) to solve complex scalability and concurrency challenges, achieving significant improvements in system efficiency and customer onboarding.",
  skills: [
    { name: "GoLang", level: "Expert", category: "Backend", experience: "4+ years" },
    { name: "React.js", level: "Expert", category: "Frontend", experience: "4+ years" },
    { name: "Microservices", level: "Expert", category: "Backend", experience: "4+ years" },
    { name: "DSA & System Design", level: "Expert", category: "Algorithms", experience: "5+ years" },
    { name: "Cloud-Native (GCP/AWS)", level: "Proficient", category: "Cloud", experience: "3+ years" },
    { name: "Security (HSM/OAuth2)", level: "Expert", category: "Security", experience: "4+ years" },
    { name: "Docker / Podman", level: "Expert", category: "DevOps", experience: "4+ years" },
    { name: "MySQL / MongoDB", level: "Proficient", category: "Database", experience: "3+ years" },
    { name: "CI/CD (GitLab/Bamboo)", level: "Expert", category: "DevOps", experience: "4+ years" },
    { name: "Distributed Systems", level: "Proficient", category: "Backend", experience: "3+ years" },
  ],
  projects: [
    {
      title: "HSMs Manager",
      subtitle: "Next-Gen HSM Unified Management Platform",
      description: "Leading the development of a centralized platform for end-customers to interact with Next-Gen Thales HSMs. Providing a single interface for critical lifecycle tasks including Key Management, IAM, Cryptography services, and streamlined customer onboarding.",
      tech: ["GoLang", "React", "OAuth2", "GCP", "REST APIs"],
      metrics: [
        "Architecting a unified platform for multi-tenant HSM lifecycle management",
        "80% faster client onboarding via OAuth2-compliant integration flows",
        "Standardizing Cryptography and IAM interfaces for Next-Gen hardware"
      ],
      status: "In Development",
      type: "Security Infrastructure",
      year: "May 2025 - Present",
      architecture: "Cloud-native microservices architecture for secure multi-tenant access",
      dsa: "Optimized resource allocation using efficient mapping and concurrent request handling."
    },
    {
      title: "Gambit Service Broker",
      subtitle: "Automated Cloud HSM Provisioning",
      description: "Primary project focus (2021-2025). Engineered an OSB-compliant microservice facilitating automated provisioning of Thales HSMs across multi-cloud environments (AWS, Azure, GCP).",
      tech: ["GoLang", "Microservices", "Docker", "OSB API", "GCP"],
      metrics: [
        "Successfully adopted by 50+ global enterprise clients",
        "70% reduction in manual setup and configuration time",
        "Core infrastructure for Thales cloud-based cryptographic services"
      ],
      status: "Live",
      type: "Cloud Infrastructure",
      year: "Feb 2021 - May 2025",
      architecture: "Broker pattern implementation for cross-cloud resource abstraction",
      dsa: "Implemented custom caching layers with LRU eviction policies to optimize API response times."
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
        "Leading end-to-end development of HSMs Manager for Next-Gen Thales HSM lifecycle management (Key Management, IAM, Cryptography).",
        "Architected OAuth2 compliance for HSM REST APIs, identifying security flaws and enabling seamless third-party integrations.",
        "Built a high-performance Go-based automation framework using Builder pattern, reducing test creation time by 50%.",
        "Optimized CI/CD pipelines in GitLab/Bamboo, achieving zero-downtime deployments and 83% reduction in deployment time."
      ]
    },
    {
      company: "Thales DIS",
      role: "Software Engineer",
      period: "Feb 2021 - May 2025",
      highlights: [
        "Developed Gambit Service Broker (OSB-compliant), enabling automated HSM cloud provisioning for 50+ enterprise clients.",
        "Engineered React-based interface for automated hardware provisioning, reducing manual setup time by 80%.",
        "Implemented comprehensive REST API suite adhering to Open Service Broker specifications for AWS, Azure, and GCP."
      ]
    }
  ],
  achievements: [
    { title: "US Patent Filed (Nov 2025)", subtitle: "System and Method for Remote PIN Mailing (USA)", year: "2025" },
    { title: "CTF Competition - 5th Place", subtitle: "Thales DIS Cybersecurity Challenge", year: "2025" },
    { title: "CTF Competition - 3rd & 4th Place", subtitle: "Thales DIS Cybersecurity Challenge", year: "2023-2024" },
    { title: "Thales Spot Award (Xtra Miler)", subtitle: "Recognized for innovative HSM management solutions", year: "2023" },
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