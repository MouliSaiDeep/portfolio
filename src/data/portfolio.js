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

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: "01",
    name: "Qlue v2",
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
    name: "Activity Tracker",
    repoUrl: "https://github.com/MouliSaiDeep/user-activity-tracking-system",
    tagline: "Event-Driven User Activity Tracking System",
    description:
      "A production-grade distributed backend system that decouples high-volume event ingestion from database persistence using RabbitMQ as a message broker. The public API always responds in under 5ms — the database work happens asynchronously in the background, completely isolated from user-facing latency.",
    detail: [
      "Producer Service: a REST API that validates incoming UserActivityEvent payloads with Jakarta Bean Validation, publishes to RabbitMQ, and immediately returns 202 Accepted — never blocked by the database.",
      "Consumer Service: a background worker using @RabbitListener that pulls events off the queue, maps them to JPA entities, and persists to MySQL — with flexible JSON metadata serialization.",
      "Resilience via Spring AMQP retry: 3 attempts with exponential backoff from 1s to 10s, guarding against transient DB failures without dropping messages.",
      "Health-aware Docker Compose orchestration: Actuator /health endpoints drive healthcheck conditions so the consumer only starts after MySQL and RabbitMQ are confirmed healthy.",
      "Global @ControllerAdvice exception handling returns structured field-level 400 responses. Mockito-based unit tests verify message publishing and entity persistence independently."
    ],
    stack: ["Java", "Spring Boot", "RabbitMQ", "Spring Data JPA", "MySQL", "Docker", "Maven"],
    accentColor: "#10b981",
    animationType: "message-flow",
  },
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
