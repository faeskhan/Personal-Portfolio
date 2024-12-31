'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useAnimate, AnimatePresence } from 'framer-motion'
import { ChevronDown, FileCode, Network, Briefcase, GraduationCap, Award, User, Layers, Github, Linkedin, Mail, Database, Cpu } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { MatrixRain } from '../components/MatrixRain'

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30, 
    restDelta: 0.001
  })

  const [activeSection, setActiveSection] = useState('home')
  const [scope, animate] = useAnimate()
  const [showHello, setShowHello] = useState(true)

  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    // Reset scroll position to the top and active section
    window.scrollTo(0, 0);
    setActiveSection('home');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'certifications']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const visibleThreshold = windowHeight * 0.3 // 30% of viewport height
          return rect.top <= visibleThreshold && rect.bottom >= visibleThreshold
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sequence = async () => {
      await animate(scope.current, { opacity: 1 })
      await animate("h1", { opacity: 1 }, { duration: 0.01 })
      await animate("h1", 
        { width: "auto" }, 
        { duration: 2, ease: "easeInOut" }
      )
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowHello(false)
    }
    sequence()
  }, [animate, scope])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-blue-950 to-black' 
        : 'bg-gradient-to-br from-white via-red-50 to-white'
    } text-white min-h-screen font-sans transition-colors duration-300 relative`}>
      <MatrixRain />
      <motion.div
        className="fixed inset-0 z-[-1]"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            isDarkMode
              ? [
                  "linear-gradient(to bottom right, #000000, #020617, #000000)",
                  "linear-gradient(to bottom right, #000000, #172554, #000000)",
                  "linear-gradient(to bottom right, #000000, #1e3a8a, #000000)"
                ]
              : [
                  "linear-gradient(to bottom right, #ffffff, #eff6ff, #ffffff)",
                  "linear-gradient(to bottom right, #ffffff, #dbeafe, #ffffff)",
                  "linear-gradient(to bottom right, #ffffff, #bfdbfe, #ffffff)"
                ]
          ),
        }}
      />
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-4 left-4 p-2 rounded-full z-50 ${
          isDarkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transform-none z-50"
        style={{ scaleX }}
      />
      
      <main className="relative">
        <nav className="fixed top-0 right-0 p-4 z-40">
          <ul className="flex space-x-4 rounded-lg px-6 py-3 bg-gray-700 bg-opacity-60 backdrop-blur-sm">
            {['HOME', 'ABOUT', 'EDUCATION', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'].map((item) => (
              <li key={item}>
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                  className={`text-sm font-medium ${
                    isDarkMode 
                      ? 'hover:text-pink-400' 
                      : 'hover:text-orange-400'
                  } transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? isDarkMode ? 'text-pink-500' : 'text-red-500'
                      : isDarkMode ? 'text-gray-300' : 'text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="text-center z-10 relative" ref={scope}>
            <AnimatePresence mode="wait">
              {showHello ? (
                <motion.h1
                  key="hello"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.7, ease: "linear" }}
                  exit={{ opacity: 0, y: -50 }}
                  className={`text-4xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500'
                      : 'bg-gradient-to-r from-red-600 to-orange-400'
                  } overflow-hidden whitespace-nowrap inline-block`}
                >
                  HELLO WORLD
                </motion.h1>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className={`text-4xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-pink-500 to-violet-500'
                        : 'bg-gradient-to-r from-red-600 to-orange-400'
                    } overflow-hidden whitespace-nowrap inline-block`}
                  >
                    WELCOME TO MY PORTFOLIO!
                  </motion.h2>
                  <h2 className={`text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500'
                      : 'bg-gradient-to-r from-red-600 to-orange-400'
                  }`}>
                    Fahad Khan
                  </h2>
                  <p className={`text-xl sm:text-2xl ${
                    isDarkMode ? 'text-gray-300' : 'text-black'
                  }`}>
                    Computer Science Graduate | Full Stack Engineer
                  </p>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className={`mt-8 px-8 py-3 rounded-lg text-xl ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600'
                        : 'bg-gradient-to-r from-red-600 to-orange-400 hover:from-red-700 hover:to-orange-500'
                    } text-white font-semibold`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LET'S CONNECT!
                  </motion.button>
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="mt-16 cursor-pointer z-10 flex justify-center"
                    onClick={() => scrollToSection('about')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronDown size={40} className={`${
                      isDarkMode ? 'text-pink-500' : 'text-orange-500'
                    }`} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <Section id="about" icon={User} title="About Me">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square w-full md:w-[92rem]"
            >
              <Image
                src="/images/pfp.jpg"
                alt="Fahad Khan"
                fill
                className={`rounded-full border-4 object-cover ${isDarkMode ? 'border-pink-500' : 'border-orange-500'}`}
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-lg leading-relaxed mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-black'
                }`}
              >
                I'm a passionate Computer Science graduate with a keen interest in full-stack development, cloud solutions, and artificial intelligence. 
                With a strong foundation in algorithms, data structures, and software engineering principles, I strive to create 
                efficient and innovative solutions to complex problems. My goal is to contribute to cutting-edge projects that 
                push the boundaries of technology and make a positive impact in the IT industry.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-lg leading-relaxed mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-black'
                }`}
              >
                I've gained hands-on experience as a Full Stack Systems Administrator and Junior Software Developer, 
                working on front-end and back-end projects with frameworks like Django and Vue.js. 
                With certifications in AWS and ITIL, I'm passionate about building innovative solutions and thrive in collaborative, 
                fast-paced environments.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-black'
                }`}
              >
                When I'm not coding, you can find me exploring new attractions and restaurants, playing sports such as basketball, badminton, and volleyball.
                Occasionally, I also like engaging in friendly networking events and competitions such as local hackathons. I believe in continuous learning and am always excited 
                to take on new challenges in the ever-evolving world of technology.
              </motion.p>
            </div>
          </div>
        </Section>

        <Section id="education" icon={GraduationCap} title="Education">
          <div className="space-y-4">
            <EducationItem
              degree="Bachelor of Science (Honours) in Computer Science"
              school="Brock University"
              year="2019 - 2024"
              description="Graduated with Honors degree. Specialized in practices such as Machine Learning, Data Structures, Algorithms and Database Administration."
            />
            <EducationItem
              degree="High School Diploma"
              school="David Suzuki Secondary School"
              year="2016 - 2019"
              description=""
            />
          </div>
        </Section>

        <Section id="experience" icon={Briefcase} title="Work Experience">
          <div className="space-y-6">
            <ExperienceItem
              title="Full Stack Systems Administrator"
              company="Civiconnect"
              period="May 2022 - August 2022"
              responsibilities={[
                "Developed both the front-end and back-end implementation of websites by primarily utilizing the Python language through Django and Flask frameworks to facilitate rapid web applications development for business clients.",
                "Collaborated with the system admin, web development and product management team by regularly attending sprint meetings to create an appropriate team environment and professionalism.",
                "Performed deployment for final cliental websites by linking the domain name to the IP address of the server and utilizing AWS and Google Cloud services to ensure website accessibility for all users."
              ]}
            />
            <ExperienceItem
              title="Junior Software Developer"
              company="Edge Factor"
              period="September 2021 - December 2021"
              responsibilities={[
                "Troubleshooted various bugs and issues by applying knowledge of a wide range of web technologies such as AWS, .NET Core, JavaScript, Vue.js, HTML, CSS, MySQL, and NoSQL to learn and satisfy front-end and back-end user-experience.",
                "Optimized SQL queries of hundreds of thousands of data by using software applications such as MySQL Workbench to improve and maintain a flexible connection between the Edge Factor website, Admin, and its databases.",
                "Assisted senior developers as well as the Product Management and Workforce team with the design, development, and execution process of CI/CD pipelines and automated workflows by planning on multiple ways for approaching a certain task to ensure quality and an appropriate team environment."
              ]}
            />
          </div>
        </Section>

        <Section id="skills" icon={FileCode} title="Technical Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center p-8 rounded-lg gap-8"
            >
              <FileCode size={150} className={`${isDarkMode ? 'text-pink-500' : 'text-red-500'}`} />
              <Database size={150} className={`${isDarkMode ? 'text-pink-500' : 'text-red-500'}`} />
              <Cpu size={150} className={`${isDarkMode ? 'text-pink-500' : 'text-red-500'}`} />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <SkillCategory title="Languages" skills={['JavaScript', 'Python', 'Java', 'C++', 'SQL']} />
              <SkillCategory title="Frontend" skills={['React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS']} />
              <SkillCategory title="Backend" skills={['Node.js', 'Express', 'Django', 'RESTful APIs']} />
              <SkillCategory title="Databases" skills={['MongoDB', 'PostgreSQL', 'MySQL']} />
              <SkillCategory title="DevOps" skills={['Git', 'Docker', 'CI/CD', 'AWS']} />
              <SkillCategory title="Other" skills={['Machine Learning', 'Data Structures', 'Algorithms']} />
            </div>
          </div>
        </Section>

        <Section id="projects" icon={Layers} title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Niagara Museum Interactive Timeline System"
              description="Developed an interactive timeline system for the Niagara Artifacts Museum using Python, HTML, CSS, and JavaScript, enabling visitors to explore exhibits and resources in a user-friendly digital format. Leveraged agile methodologies and CI/CD pipelines for rapid, reliable delivery."
              technologies={['Python', 'HTML', 'MongoDB', 'JavaScript']}
              link="https://github.com/bit-yottabyte/COSC-4P02-Project"
              image="https://placehold.co/300x300"
            />
            <ProjectCard
              title="Conversational AI System"
              description="Developed a generative AI chatbot using FastAPI, LangChain, and Azure OpenAI for real-time conversations. Leveraged prompt engineering and the RAG framework to enhance context and scalability, gaining expertise in API deployment and cloud AI solutions."
              technologies={['Python', 'Microsoft Azure', 'OpenAI', 'Langchain']}
              link="nothing"
              image="https://placehold.co/400x200"
            />
            <ProjectCard
              title="Post-Secondary Plan Program"
              description="Created a C++ program for Brock University students, using topological sorting to optimize course planning with directed and undirected graphs, providing personalized and efficient academic guidance."
              technologies={['C++']}
              link="https://github.com/faeskhan/Post-Secondary-Plan-Program"
              image="https://placehold.co/400x200"
            />
            <ProjectCard
              title="Berrylush Farms Website"
              description="Developed Berrylush Farms, a mock website for a strawberry farmhouse business, using Python, HTML, CSS, JavaScript, and AWS to showcase products and services in a professional and engaging way."
              technologies={['Python', 'Django', 'HTML', 'Amazon Web Services (AWS)']}
              link="https://github.com/faeskhan/berrylush"
              image="https://placehold.co/400x200"
            />
          </div>
        </Section>

        <Section id="certifications" icon={Award} title="Certifications">
          <div className="space-y-4">
            <CertificationItem
              title="AWS Certified Cloud Architect"
              organization="Amazon Web Services"
              date="2023"
            />
            <CertificationItem
              title="Python Django Certified Developer"
              organization="Udemy"
              date="2022"
            />
            <CertificationItem
              title="ITIL Service Design (ITIL-SD)"
              organization="ICTC-CTIC"
              date="2022"
            />
          </div>
        </Section>

        <motion.div 
          id="contact"
          className="py-20 px-4 md:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div className="flex items-center justify-center mb-8">
              <Mail size={32} className={`${
                isDarkMode ? 'text-pink-500' : 'text-orange-500'
              } mr-4`} />
              <h2 className={`text-3xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-pink-500 to-violet-500'
                  : 'bg-gradient-to-r from-red-600 to-orange-400'
              }`}>
                GET IN TOUCH!
              </h2>
            </motion.div>
            <ContactForm />
          </div>
        </motion.div>

        <div className="h-80"></div>

        <footer className="bg-gray-800 py-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <motion.a
              href="https://github.com/faeskhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/fahadkhan01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:faeskhan@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
          <p className="text-gray-400">&copy; 2024 Fahad Khan. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

const Section = ({ id, icon: Icon, title, children }) => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )
  const { isDarkMode } = useTheme()
  
  return (
    <section id={id} className={`py-20 px-4 md:px-8 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.div className="flex items-center mb-8" style={{ opacity }}>
          <Icon size={32} className={`${
            isDarkMode ? 'text-pink-500' : 'text-orange-500'
          } mr-4`} />
          <h2 className={`text-3xl font-bold bg-clip-text text-transparent ${
            isDarkMode 
              ? 'bg-gradient-to-r from-pink-500 to-violet-500'
              : 'bg-gradient-to-r from-red-600 to-orange-400'
          }`}>{title}</h2>
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}

const EducationItem = ({ degree, school, year, description }) => {
  const { isDarkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-gray-700 bg-opacity-90'
      } p-6 rounded-lg backdrop-blur-md`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-pink-400' : 'text-red-500'}`}>{degree}</h3>
      <p className="mb-2 text-violet-400">{school}</p>
      <p className="text-white mb-2">{year}</p>
      <p className="text-white">{description}</p>
    </motion.div>
  )
}

const ExperienceItem = ({ title, company, period, responsibilities }) => {
  const { isDarkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-gray-700 bg-opacity-90'
      } p-6 rounded-lg backdrop-blur-md`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-pink-400' : 'text-red-500'}`}>{title}</h3>
      <p className="mb-2 text-violet-400">{company}</p>
      <p className="text-white mb-4">{period}</p>
      <ul className="list-disc list-inside text-white space-y-2">
        {responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </motion.div>
  )
}

const SkillCategory = ({ title, skills }) => {
  const { isDarkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-pink-400' : 'text-red-500'}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-700'} px-3 py-1 rounded-full text-white`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const ProjectCard = ({ title, description, technologies, link, image }) => {
  const { isDarkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-gray-700 bg-opacity-90'
      } p-6 rounded-lg backdrop-blur-md group hover:bg-opacity-70 transition-all duration-300`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-pink-400' : 'text-red-500'}`}>{title}</h3>
      <p className="text-white mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="text-white bg-gray-700 px-2 py-1 rounded text-sm">
            {tech}
          </span>
        ))}
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-400 hover:text-pink-300 transition-colors inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View on GitHub
      </motion.a>
    </motion.div>
  )
}

const CertificationItem = ({ title, organization, date }) => {
  const { isDarkMode } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50' 
          : 'bg-gray-700 bg-opacity-90'
      } p-4 rounded-lg backdrop-blur-md flex items-center`}
    >
      <Award className="text-yellow-500 mr-4" size={24} />
      <div>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-pink-400' : 'text-red-500'}`}>{title}</h3>
        <p className="text-violet-400">{organization}</p>
        <p className="text-white text-sm">{date}</p>
      </div>
    </motion.div>
  )
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [status, setStatus] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'faeskhan@gmail.com'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          description: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-50 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-50 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-50 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-50 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Message *
        </label>
        <textarea
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-50 border border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 px-6 rounded-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600'
            : 'bg-gradient-to-r from-red-600 to-orange-400 hover:from-red-700 hover:to-orange-500'
        } text-white font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </motion.button>

      {status === 'success' && (
        <p className="text-green-500 text-center">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
      )}
    </motion.form>
  );
};