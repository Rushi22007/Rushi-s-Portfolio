// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  git,
  mongodb,
  python,
  sql,
  pandas,
  numpy,
  powerbi,
  tableau,
  excel,
  scikitlearn,
  postgresql,
  adypu,
  deloitte,
  tata,
  school,
  salesDashboard,
  churnPrediction,
  etlPipeline,
  user1,
  user2,
  user3,
  linkedin,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Experience",
    link: null,
  },
  {
    id: "projects",
    title: "Projects",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "github",
    title: "GitHub",
    link: "https://github.com/Rushi22007",
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "Python Developer",
    icon: backend,
  },
  {
    title: "Data Analyst",
    icon: web,
  },
  {
    title: "BI & Dashboard Specialist",
    icon: creator,
  },
  {
    title: "ML Pipeline Practitioner",
    icon: mobile,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "Pandas",
    icon: pandas,
  },
  {
    name: "NumPy",
    icon: numpy,
  },
  {
    name: "Power BI",
    icon: powerbi,
  },
  {
    name: "Tableau",
    icon: tableau,
  },
  {
    name: "Advanced Excel",
    icon: excel,
  },
  {
    name: "Scikit-Learn",
    icon: scikitlearn,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
] as const;

// Experiences / Education & Certifications
export const EXPERIENCES = [
  {
    title: "B.E. in Artificial Intelligence & Data Science",
    company_name: "Ajeenkya D Y Patil School of Engineering, Pune",
    icon: adypu,
    iconBg: "#1e1e24",
    date: "2024 – Present",
    points: [
      "Pursuing Bachelor of Engineering with rigorous coursework in Artificial Intelligence, Data Science, Machine Learning, and Algorithms.",
      "Developing foundational mastery in relational databases (MySQL, PostgreSQL), exploratory data analysis (EDA), and data storytelling.",
      "Conducting academic projects centered on customer behavior modeling, predictive systems, and automated data pipelines.",
      "Maintaining strong focus on clean code, reproducibility, statistical testing, and practical analytical problem-solving.",
    ],
  },
  {
    title: "GenAI Powered Data Analytics",
    company_name: "Tata",
    icon: tata,
    iconBg: "#0F4C81",
    date: "Certification",
    points: [
      "Completed certification exploring GenAI integration into modern data analytics and business intelligence pipelines.",
      "Leveraged generative AI workflows for exploratory prompt engineering, automated insight generation, and data transformations.",
      "Examined real-world case studies in enterprise metrics reporting and data-backed decision support systems.",
    ],
  },
  {
    title: "Data Analytics Certificate",
    company_name: "Deloitte",
    icon: deloitte,
    iconBg: "#000000",
    date: "Certification",
    points: [
      "Completed hands-on simulation focusing on data analysis, forensic investigation, and stakeholder communication.",
      "Synthesized complex datasets into executive summaries, KPI dashboards, and visual data narratives.",
      "Applied industry best practices in data cleansing, trend identification, and strategic recommendations.",
    ],
  },
  {
    title: "Higher Secondary Certificate (HSC) - Science",
    company_name: "Rajarshi Shahu College, Latur",
    icon: school,
    iconBg: "#1a237e",
    date: "Completed",
    points: [
      "Completed Higher Secondary Certificate in the Science stream with 60.00% aggregate.",
      "Built a solid foundation in Mathematics, Statistics, Physics, and analytical logic.",
    ],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    testimonial:
      "Rushikesh transformed raw sales data into interactive Power BI dashboards that gave us immediate clarity on regional trends, KPIs, and customer behavior.",
    name: "Data Analytics Mentor",
    designation: "Faculty Advisor",
    company: "ADYPU Pune",
    image: user1,
  },
  {
    testimonial:
      "His customer churn machine learning pipeline and feature engineering demonstrated strong analytical rigor and deep model interpretability.",
    name: "Project Reviewer",
    designation: "Lead Data Scientist",
    company: "AI & ML Guild",
    image: user2,
  },
  {
    testimonial:
      "Rushikesh automated repetitive data compilation and Excel report generation using Python, saving hours of manual workload every single week.",
    name: "Collaborator",
    designation: "Analytics Peer",
    company: "Data Operations",
    image: user3,
  },
] as const;

// Projects
export const PROJECTS = [
  {
    name: "Sales Performance Dashboard",
    description:
      "Cleaned and processed raw sales data from multiple CSV/Excel sources using Python & Pandas. Built an interactive Power BI dashboard featuring custom DAX measures, drill-down filters, trend visuals, and automated SQL data refresh to track regional sales and KPIs.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "powerbi",
        color: "green-text-gradient",
      },
      {
        name: "pandas",
        color: "pink-text-gradient",
      },
      {
        name: "sql",
        color: "orange-text-gradient",
      },
    ],
    image: salesDashboard,
    source_code_link: "https://github.com/Rushi22007",
    live_site_link: "https://github.com/Rushi22007",
  },
  {
    name: "Customer Churn Prediction Model",
    description:
      "Engineered an end-to-end machine learning pipeline to predict customer churn. Performed extensive EDA and feature engineering to uncover key churn drivers, trained & evaluated Logistic Regression, Decision Tree, and Random Forest models using accuracy and ROC-AUC.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "green-text-gradient",
      },
      {
        name: "pandas",
        color: "pink-text-gradient",
      },
      {
        name: "matplotlib",
        color: "orange-text-gradient",
      },
    ],
    image: churnPrediction,
    source_code_link: "https://github.com/Rushi22007",
    live_site_link: "https://github.com/Rushi22007",
  },
  {
    name: "Automated Data Pipeline & Reporting Tool",
    description:
      "Developed a robust Python-based ETL pipeline extracting records from SQL databases, cleaning & transforming with Pandas, and automatically outputting structured Excel reports with logging, error handling, and scheduled Task Scheduler/cron execution.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "sql",
        color: "green-text-gradient",
      },
      {
        name: "etl",
        color: "pink-text-gradient",
      },
      {
        name: "excel",
        color: "orange-text-gradient",
      },
    ],
    image: etlPipeline,
    source_code_link: "https://github.com/Rushi22007",
    live_site_link: "https://github.com/Rushi22007",
  },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: linkedin,
    link: "https://www.linkedin.com/in/rushikesh-chamle",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/Rushi22007",
  },
] as const;
