import {
  FaDocker,
  FaGit,
  FaGithub,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiApachemaven,
  SiApachekafka,
  SiC,
  SiCss,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiJenkins,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRabbitmq,
  SiRedis,
  SiTypescript,
  SiSonarqubecloud as SiSonarqube,
  SiSpringboot,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const featuredProjects = [
  {
    id: "01",
    name: "Qlue",
    repoUrl: "https://github.com/MouliSaiDeep/Qlue-v2",
    tagline: "AI-Powered Voice Interview Simulation Platform",
    description:
      "A cross-platform mobile and web application that simulates real-world technical and behavioral interviews using voice, NLP, and large language models. Upload your resume — the AI parses it and becomes your personalized voice interviewer, scoring every response across clarity, technical depth, and communication in real time.",
    detail: [
      "Voice-first Flutter client with real-time STT, WebSocket session state, and rich feedback visualizations including spider charts and score trends.",
      "Serverless Node.js backend on AWS Lambda orchestrating the full interview lifecycle — session management, LLM query construction, response scoring, and transcript persistence.",
      "AI pipeline integrating Amazon Bedrock (Nvidia Nemotron 120B for question generation; Claude 3 Haiku for qualitative feedback) and Amazon Polly neural TTS with 5 selectable voice personas.",
      "WebSocket state machine: INITIALIZING → AI_SPEAKING → AWAITING_USER_INPUT → PROCESSING — with concurrency locks, silence detection, and automatic session termination.",
      "8 DynamoDB tables, 3 S3 buckets, resume OCR via Amazon Textract, and a real-time WebSocket API Gateway for low-latency turn-based interview flow."
    ],
    stack: ["Flutter", "Dart", "Node.js", "AWS Lambda", "Amazon Bedrock", "DynamoDB", "WebSocket", "Firebase"],
    accentColor: "#10b981",
    animationType: "voice-wave",
  },
  {
    id: "02",
    name: "ActivityTrack",
    repoUrl: "https://github.com/MouliSaiDeep/user-activity-tracking-system",
    tagline: "EVENT-DRIVEN USER ACTIVITY TRACKING SYSTEM",
    description:
      "A high-throughput event tracking system built to handle user activity metrics with zero latency impact. Decouples incoming event ingestion from database persistence using a message queue, allowing the system to instantly accept activity records while processing database operations asynchronously in the background. Engineered for absolute resilience under heavy concurrent client traffic loads.",
    detail: [
      "Producer Service: a REST API that validates incoming UserActivityEvent payloads with Jakarta Bean Validation, publishes to RabbitMQ, and immediately returns 202 Accepted — never blocked by the database.",
      "Consumer Service: a background worker using @RabbitListener that pulls events off the queue, maps them to JPA entities, and persists to MySQL — with flexible JSON metadata serialization.",
      "Resilience via Spring AMQP retry: 3 attempts with exponential backoff from 1s to 10s, guarding against transient DB failures without dropping messages.",
      "Health-aware Docker Compose orchestration: Actuator /health endpoints drive healthcheck conditions so the consumer only starts after MySQL and RabbitMQ are confirmed healthy."
    ],
    stack: ["Java", "Spring Boot", "RabbitMQ", "MySQL", "Spring AMQP", "JPA", "Docker", "Docker Compose", "Spring Actuator"],
    accentColor: "#10b981",
    animationType: "message-flow",
  }
];

export const projects = [
  {
    id: "01",
    name: "ActivityTrack",
    tagline: "EVENT-DRIVEN USER ACTIVITY TRACKING SYSTEM",
    description: "A reliable, event-driven tracking system decoupling REST ingestion from DB persistence using RabbitMQ. Features a producer service that returns immediate 202 status and an asynchronous consumer service that persists activities. Built with Spring Boot, MySQL, and Docker.",
    stack: ["Java", "Spring Boot", "RabbitMQ", "MySQL", "Docker"],
    repoUrl: "https://github.com/MouliSaiDeep/user-activity-tracking-system",
    category: "spring-boot"
  },
  {
    id: "02",
    name: "Docker2FA",
    tagline: "CONTAINERIZED 2FA MICROSERVICE",
    description: "A containerized security service performing multi-factor authentication with secure RSA OAEP seed transfers. Generates RFC 6238-compliant TOTP tokens utilizing the PyOTP library. Enforces isolation using multi-stage Docker builds, persistent named volumes, and automated cron log rotation.",
    stack: ["Python 3.11", "FastAPI", "RSA/OAEP", "PyOTP", "Docker", "Docker Compose", "Linux Cron"],
    repoUrl: "https://github.com/MouliSaiDeep/Docker2FA",
    category: "python-data"
  },
  {
    id: "03",
    name: "HireFlow ATS",
    tagline: "ENTERPRISE JOB APPLICATION TRACKING SYSTEM",
    description: "An enterprise-grade applicant tracking platform built with a robust workflow state machine and role-based access control. Implements asynchronous event-driven notifications using RabbitMQ and Gmail SMTP. Features comprehensive system-wide auditing to track application history and state transitions.",
    stack: ["Java 21", "Spring Boot", "MySQL", "RabbitMQ", "Gmail SMTP"],
    repoUrl: "https://github.com/MouliSaiDeep/Job-Tracker-System",
    category: "spring-boot"
  },
  {
    id: "04",
    name: "NFT Collection",
    tagline: "DOCKERIZED ERC-721 SMART CONTRACT",
    description: "A fully dockerized ERC-721 smart contract suite written in Solidity, featuring configurable maximum minting limits. Enforces secure, admin-only access control rules using standard OpenZeppelin extensions. Verified and validated with a comprehensive Hardhat test suite and Ethers.js integration.",
    stack: ["Solidity", "ERC-721", "Hardhat", "Ethers.js", "Docker", "OpenZeppelin"],
    repoUrl: "https://github.com/MouliSaiDeep/NFT-Smart-Contract",
    category: "blockchain"
  },
  {
    id: "05",
    name: "Columnar Format",
    tagline: "CUSTOM COLUMNAR FILE FORMAT",
    description: "A lightweight binary columnar storage engine inspired by Apache Parquet, featuring zlib compression and custom headers. Drastically reduces database retrieval times with selective column reads, achieving 8x faster performance than standard CSV parsing. Encodes detailed table structures in custom binary metadata headers.",
    stack: ["Python 3.10+", "Binary I/O", "Zlib Compression", "Metadata Headers", "Selective Reads"],
    repoUrl: "https://github.com/MouliSaiDeep/Columnar-File-Format",
    category: "python-data"
  },
  {
    id: "06",
    name: "PayGate Simulator",
    tagline: "FULL-STACK PAYMENT GATEWAY",
    description: "A robust payment gateway simulator featuring a comprehensive merchant dashboard, universal checkout flow, and custom Luhn validation. Leverages Redis and BullMQ for reliable, asynchronous event queue processing of transaction webhooks with automatic retries. Integrates an embeddable JS SDK for frictionless merchant adoption.",
    stack: ["Node.js", "Express.js", "React.js", "Tailwind CSS", "PostgreSQL", "Redis", "BullMQ", "Docker"],
    repoUrl: "https://github.com/MouliSaiDeep/Production-ready-payment-gateway",
    category: "nodejs"
  },
  {
    id: "07",
    name: "CDC Pipeline",
    tagline: "REAL-TIME CHANGE DATA CAPTURE",
    description: "A high-performance real-time data integration pipeline feeding PostgreSQL transactional changes straight into a data warehouse. Uses Debezium and Apache Kafka to streams logical replication logs with zero-data-loss guarantees. Implements idempotent upserts and handles evolving schema definitions and deleted tombstones.",
    stack: ["Debezium", "Apache Kafka", "Python", "PostgreSQL", "Docker", "Logical Replication"],
    repoUrl: "https://github.com/MouliSaiDeep/real-time-change-data-capture-pipeline",
    category: "python-data"
  },
  {
    id: "08",
    name: "TenantPM",
    tagline: "MULTI-TENANT SAAS PLATFORM",
    description: "A multi-tenant SaaS project management platform featuring shared database and shared schema isolation. Recognizes tenants dynamically through custom subdomain mapping and enforces secure JWT-based RBAC. Protects organizational boundaries with subscription-level access control rules.",
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "bcrypt", "Material UI", "Docker"],
    repoUrl: "https://github.com/MouliSaiDeep/Multi-Tenant-SaaS-Platform",
    category: "nodejs"
  },
  {
    id: "09",
    name: "Headless CMS",
    tagline: "CONTENT MANAGEMENT BACKEND",
    description: "A production-grade CMS engine implementing content version control and a Draft-to-Published lifecycle. Orchestrates dynamic automated scheduling using Redis-backed BullMQ job processing. Automatically configures custom Redis caching rules and processes multi-field full-text searches.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    repoUrl: "https://github.com/MouliSaiDeep/content-management-system",
    category: "nodejs"
  },
  {
    id: "10",
    name: "LockLab",
    tagline: "CONCURRENCY CONTROL API & MONITOR",
    description: "A high-performance concurrency control API demonstrating pessimistic (SELECT FOR UPDATE) vs optimistic (@Version) locking strategies. Implements custom exponential backoff retry logic to handle locking conflicts under high concurrent load. Features real-time active lock monitoring and transaction isolation level analysis.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "JPA", "Docker"],
    repoUrl: "https://github.com/MouliSaiDeep/concurrency-control-api",
    category: "spring-boot"
  },
  {
    id: "11",
    name: "PriceEngine",
    tagline: "REAL-TIME DYNAMIC PRICING ENGINE",
    description: "A high-throughput dynamic pricing and inventory reservation engine supporting bulk, BOGO, user-tier, and promotional rule types. Employs pessimistic write locking to ensure absolute stock consistency during a 15-minute reservation window. Features automated cron-driven background cleanup for expired reservations.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "JPA"],
    repoUrl: "https://github.com/MouliSaiDeep/dynamic-pricing-api",
    category: "spring-boot"
  },
  {
    id: "12",
    name: "OrderMesh",
    tagline: "DISTRIBUTED MICROSERVICES SUITE",
    description: "An event-driven distributed system orchestrating 4 primary e-commerce microservices using Apache Kafka. Ensures absolute data consistency across domains using idempotent inventory reservations and mock payment processing. Projects updates in real time to a unified read database model for optimized search queries.",
    stack: ["Node.js", "Express.js", "Apache Kafka", "MySQL", "KafkaJS", "Docker", "Python"],
    repoUrl: "https://github.com/MouliSaiDeep/event-driven-order-processing-system",
    category: "nodejs"
  },
  {
    id: "13",
    name: "StreamNotify",
    tagline: "REAL-TIME SSE NOTIFICATION SERVICE",
    description: "A high-performance Server-Sent Events (SSE) notification service featuring active PostgreSQL persistence and individual channel subscriptions. Keeps client connections alive with a steady 30-second heartbeat check. Guarantees message delivery using the Last-Event-ID header to automatically replay missed events upon reconnection.",
    stack: ["Java 21", "Spring Boot", "Spring Data JPA", "PostgreSQL", "SSE"],
    repoUrl: "https://github.com/MouliSaiDeep/sse-notification-system",
    category: "spring-boot"
  },
  {
    id: "14",
    name: "PromptRouter",
    tagline: "LLM INTENT CLASSIFICATION SERVICE",
    description: "An AI-powered routing microservice leveraging the Groq API and a precise two-step Classify-then-Route workflow. Dynamically parses incoming user prompts and delegates tasks to one of five expert LLM personas. Features comprehensive JSONL file logging and an extensive Vitest automated test suite.",
    stack: ["Node.js", "Express", "Groq API", "LLM", "Vitest", "Docker", "JSONL"],
    repoUrl: "https://github.com/MouliSaiDeep/llm-powered-prompt-router",
    category: "nodejs"
  },
  {
    id: "15",
    name: "AuthVault",
    tagline: "PRODUCTION-GRADE JWT AUTHENTICATION SERVICE",
    description: "A security-focused authentication gateway implementing RS256 asymmetric cryptographic signing and automated refresh token rotation. Restricts malicious requests using Bucket4j IP rate limiting configured at 5 failed attempts per minute. Integrates health checks and secure credential management within containerized environments.",
    stack: ["Java 21", "Spring Boot", "Spring Security", "PostgreSQL", "JJWT", "RSA", "Bucket4j"],
    repoUrl: "https://github.com/MouliSaiDeep/jwt-authentication-service",
    category: "spring-boot"
  },
  {
    id: "16",
    name: "LedgerCore",
    tagline: "EVENT-SOURCED BANKING API",
    description: "An event-sourced bank account API designed with CQRS (Command Query Responsibility Segregation) pattern storing immutable transactional events. Optimized for scale by capturing system snapshots every 50 events to accelerate balance queries. Supports synchronous database projection rebuilding and audit-friendly time-travel queries.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Event Sourcing", "CQRS"],
    repoUrl: "https://github.com/MouliSaiDeep/bank-account-management-system",
    category: "spring-boot"
  },
  {
    id: "17",
    name: "FileBridge",
    tagline: "MULTI-PROTOCOL FILE GATEWAY",
    description: "A secure cross-protocol file transfer gateway integrating SFTP, FTP, and SMB protocols under a unified dashboard. Safeguards remote server credentials with AES-256 encryption and NextAuth security. Offers a sleek web-based file browser with robust audit logging and role-based directory access.",
    stack: ["Next.js", "TypeScript", "NextAuth", "SFTP", "FTP", "SMB", "Docker", "SQLite"],
    repoUrl: "https://github.com/MouliSaiDeep/multi-protocol-file-transfer-saas",
    category: "nodejs"
  },
  {
    id: "18",
    name: "TenantRouter",
    tagline: "DYNAMIC MULTI-TENANT STARTER",
    description: "A custom Spring Boot starter designed for database-per-tenant isolation using a ThreadLocal routing context. Validates incoming requests via X-Tenant-ID headers and automatically purges routing context to prevent memory leaks. Includes custom Actuator endpoints for real-time tenant connection health monitoring.",
    stack: ["Java 21", "Spring Boot", "Spring Data JPA", "PostgreSQL", "AbstractRoutingDataSource", "Actuator"],
    repoUrl: "https://github.com/MouliSaiDeep/multi-tenant-data-source-routing",
    category: "spring-boot"
  },
  {
    id: "19",
    name: "TelecomAnalytics",
    tagline: "BIG DATA TELECOM BATCH PIPELINE",
    description: "A massive-scale batch analytics pipeline processing over 2 million telecom Call Detail Records (CDRs) daily. Employs Spark and Hadoop custom skew partitioning to eliminate data bottlenecks during broadcast joins. Generates comprehensive tower heatmaps, detects anomalies, and logs full execution manifests.",
    stack: ["Apache Hadoop", "Apache Spark", "Apache Airflow", "HDFS", "PySpark", "Docker", "Python", "Bash"],
    repoUrl: "https://github.com/MouliSaiDeep/hadoop-based-batch-analytics-pipeline",
    category: "python-data"
  }
];

export const techStackGroups = [
  {
    category: "Languages",
    items: [
      { name: "Java", icon: FaJava, color: "#f89820" },
      { name: "Dart", icon: SiDart, color: "#0175c2" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "C", icon: SiC, color: "#a8b9cc" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss, color: "#1572b6" },
      { name: "SQL", icon: TbSql, color: "#00758f" },
    ],
  },
  {
    category: "Frameworks & Runtimes",
    items: [
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "Flutter", icon: SiFlutter, color: "#54c5f8" },
      { name: "Node.js", icon: FaNodeJs, color: "#68a063" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "React", icon: FaReact, color: "#61dafb" },
      { name: "Prisma", icon: SiPrisma, color: "#5a67d8" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "Redis", icon: SiRedis, color: "#dc382d" },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
    ],
  },
  {
    category: "Message Brokers",
    items: [
      { name: "RabbitMQ", icon: SiRabbitmq, color: "#ff6600" },
      { name: "Kafka", icon: SiApachekafka, color: "#ffffff" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: FaDocker, color: "#2496ed" },
      { name: "Maven", icon: SiApachemaven, color: "#c71a36" },
      { name: "Git", icon: FaGit, color: "#f05032" },
      { name: "GitHub", icon: FaGithub, color: "#ffffff" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "SonarQube", icon: SiSonarqube, color: "#4e9bcd" },
      { name: "Jenkins", icon: SiJenkins, color: "#d33833" },
    ],
  },
];

export const contactLinks = [
  {
    label: "Email",
    value: "moulisaideep.get@gmail.com",
    href: "mailto:moulisaideep.get@gmail.com",
    icon: "email",
  },
  {
    label: "GitHub",
    value: "MouliSaiDeep",
    href: "https://github.com/MouliSaiDeep",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "moulisaideep",
    href: "https://linkedin.com/in/moulisaideep",
    icon: "linkedin",
  },
];

export const footerCopy = "© 2026 Mouli Sai Deep";
