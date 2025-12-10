import { FlexCenter, FlexCol, FlexRow } from "@/components/utils/flex";
import { SlideUp } from "@/components/utils/animations";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDownload, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Home() {

  const techInterests = ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Fastify", "Kysely", "Web Design", "Tailwind CSS",
    "Automation", "Full-Stack", "Web Performance", "Web Security", "Docker", "Game Development", "Unity", "C#", ];

  const softSkills = ["Problem Solving", ];

  const hobbies = ["Playing Guitar", "Gaming", "Programming", "Petting my cat", "Cars"];

  return (<>

    {/* Under Construction */}
    <FlexRow className="justify-center z-51 fixed top-10 w-full pointer-events-none">
      <div className="pointer-events-auto px-6 py-2 bg-yellow-300 text-black font-semibold rounded-2xl shadow-md border-2 border-yellow-100">
        🚧 Under Construction 🚧  
      </div>
    </FlexRow>

    <div id="home" className="hidden lg:block bg-white">

      {/* Header */}
      
      <header className="z-50 fixed flex flex-row justify-between items-center w-full py-4 border-b-2 border-gray-200 bg-white px-20">
        <h1 className="font-semibold text-2xl text-scale"><a href="#home">Rafael Cavalinhos</a></h1>
        <FlexRow className="font-semibold text-xl gap-x-5">
          <a href="#about" className="text-scale">About</a>
          <a href="#education" className="text-scale">Education</a>
          <a href="#projects" className="text-scale">Projects</a>
          <a href="#work" className="text-scale">Work Experience</a>
          <a href="#contact" className="text-scale">Contact</a>
        </FlexRow>
      </header>

      <main>

        <FlexCol className="w-full">

          {/* Hero Section */}
          <FlexRow className="justify-between h-screen pt-24 px-20">
            <FlexCol className="font-bold text-6xl justify-center items-start gap-y-10">
              <h1>
                <SlideUp>Hello!<br /></SlideUp>
                <SlideUp delay={0.1}>I'm <span className="text-gradient">Rafael Cavalinhos</span>,<br /></SlideUp>
                <SlideUp delay={0.2}>a Full-Stack Developer</SlideUp>
              </h1>

              <SlideUp delay={0.3}>
                <button onClick={() => window.open("/cv.pdf", "_blank")} className="cursor-pointer group bg-blue-400 border-3 border-blue-200 text-white rounded-2xl text-xl py-2 px-10 transition duration-200 hover:scale-120">
                  <span className="inline-flex items-center gap-2 transition duration-300 group-hover:scale-125">
                    Download CV <FontAwesomeIcon icon={faDownload} />
                  </span>
                </button>
              </SlideUp>

              <FlexRow>

                <SlideUp delay={0.4}>
                  <button onClick={() => window.open("https://www.linkedin.com/in/rafael-cavalinhos-39937624a/", "_blank")} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                    <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faLinkedin} />
                  </button>
                </SlideUp>
                
                <SlideUp delay={0.5}>
                  <button onClick={() => window.open("https://github.com/rafaelcavalinhos", "_blank")} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                    <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faGithub} />
                  </button>
                </SlideUp>
      
                <SlideUp delay={0.6}>
                  <button onClick={() => window.location.href = "mailto:rafaelcavalinhos2002@gmail.com"} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                    <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faEnvelope} />
                  </button>
                </SlideUp>
      
              </FlexRow>

            </FlexCol>

            <FlexCenter className="pr-20">
              <Image src="/cat.gif" alt="me" width={500} height={500} className="rounded-full hover:scale-105 transition"/>
              <p className="text-6xl absolute text-yellow-500 text-center">Image not<br />available yet...</p>
            </FlexCenter>
          </FlexRow>


          {/* About Section*/}
          <FlexCol id="about" className="items-center gap-y-4 mt-50 bg-gray-50 w-full py-20 px-20">
            
            <SlideUp>
              <h1 className="title">About</h1>
            </SlideUp>

            <FlexRow className="">
            
              <FlexCol className="gap-y-4 w-[50%] items-center text-lg font-medium">
                <SlideUp delay={0.1}>
                  <h2 className="text-3xl text-gradient">Professional Bio</h2>
                </SlideUp>

                <FlexCol>
                  <SlideUp delay={0.2}><p>I am Computer Engineering graduate with a growing focus on full-stack web development.</p></SlideUp>
                  <SlideUp delay={0.3}><p>I enjoy turning ideas into real applications and I spend a lot of my free time building personal projects to sharpen my skills and explore new technologies.</p></SlideUp>
                  <SlideUp delay={0.4}><p>I’m comfortable working across the stack and I like understanding how everything connects, from the database to the UI.</p></SlideUp>
                  <SlideUp delay={0.5}><p>Recently, I’ve been diving deeper into modern web frameworks, such as Next.js.</p></SlideUp>
                  <SlideUp delay={0.6}><p>What motivates me is learning and solving practical problems. I'm always looking for opportunities to grow, collaborate, and contribute to real-world projects.</p></SlideUp>
                </FlexCol>
              </FlexCol>
            
              <FlexCol className="gap-y-4 w-[50%] items-center text-lg font-medium">

                <SlideUp delay={0.2}>
                  <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient">Tech Interests</h2>
                </SlideUp>

                <FlexRow className="flex-wrap gap-y-2 gap-x-1 justify-center">
                  {techInterests.map((interest, i) => {
                    return (
                      <SlideUp delay={0.05 * i}>
                        <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                          <p className="group-hover:scale-120 transition duration-200">{interest}</p>
                        </div>
                      </SlideUp>
                    );
                  })}
                </FlexRow>

                <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient mt-5">Soft Skills</h2>
                <FlexRow className="flex-wrap gap-y-2 gap-x-1 justify-center">
                  {softSkills.map((skill, i) => {
                    return (
                      <SlideUp delay={0.05 * i}>
                        <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                          <p className="group-hover:scale-120 transition duration-200">{skill}</p>
                        </div>
                      </SlideUp>
                    );
                  })}
                </FlexRow>

                <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient mt-5">Hobbies</h2>
                <FlexRow className="flex-wrap gap-y-2 gap-x-1 justify-center">
                  {hobbies.map((hobby, i) => {
                    return (
                      <SlideUp delay={0.05 * i}>
                        <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                          <p className="group-hover:scale-120 transition duration-200">{hobby}</p>
                        </div>
                      </SlideUp>
                    );
                  })}
                </FlexRow>

              </FlexCol>

            </FlexRow>

          </FlexCol>

          {/* Education Section */}
          <FlexCol id="education" className="items-center gap-y-4 py-20 px-20">
            <h1 className="title">Education</h1>

            <FlexCol className="w-full gap-y-4">

              <FlexCol className="group w-[70%] justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                <span className="group-hover:scale-102 transition">
                  <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Licenciatura em Engenharia Informática</p>
                  <p className="text-base">Instituto Politécnico de Setúbal</p>
                  <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                    <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2023 - 10/2025</p>
                    <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal - Portugal</p>
                  </FlexRow>

                  <p>
                    Bachelor’s degree focused on developing technical and scientific skills in the field of computer science.
                    It covers programming, databases, networks, software development, and technology integration.
                    The program combines theory and practice through laboratory projects and teamwork, preparing professionals for the design, analysis,
                    and implementation of modern IT solutions.
                  </p>
                </span>
              </FlexCol>

              <FlexCol className="group w-[70%] justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                <span className="group-hover:scale-102 transition">
                  <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Desenvolvimento de Videojogos e Aplicações Multimédia</p>
                  <p className="text-base">Instituto Politécnico de Setúbal</p>
                  <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                    <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2020 - 06/2023</p>
                    <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal - Portugal</p>
                  </FlexRow>

                  <p>
                    Programme focused on game development and multimedia applications, covering game design techniques, interface design and core programming concepts.
                    It includes work with graphic APIs and game engines, as well as the creation and editing of multimedia assets such as audio, video, textures and 3D models.
                    The curriculum also explores serious games, gamification, virtual and augmented reality, and technologies for cross-platform development on PC, Web,
                    mobile and console. This provides a practical and well-rounded foundation for building modern interactive digital experiences.
                  </p>
                </span>
              </FlexCol>

              <FlexCol className="group w-[70%] justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                <span className="group-hover:scale-102 transition">
                  <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Técnico de Informática de Gestão</p>
                  <p className="text-base">Escola Tecnológica do Litoral Alentejano</p>
                  <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                    <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 09/2017 - 07/2020</p>
                    <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Sines - Portugal</p>
                  </FlexRow>

                  <p>
                    Focused on the development and maintenance of IT solutions for business environments.
                    Experience includes creating websites and company portals, installing and configuring operating systems and application software,
                    and managing relational databases. Responsibilities also covered developing automated data-processing routines using programming or
                    scripting languages, collaborating in system analysis and development teams, and building management-oriented software applications.
                    Additional competencies include handling administrative office tasks and working with business software for invoicing, inventory, accounting,
                    payroll and financial management, as well as proficient use of word processing tools, spreadsheets and other productivity applications.
                  </p>
                </span>
              </FlexCol>

            </FlexCol>
    
          </FlexCol>

          <FlexCol id="projects" className="items-center gap-y-4 mt-25 bg-gray-50 w-full py-20 px-20">
            <h1 className="title">Projects</h1>

            <p className="text-center text-6xl text-gradient py-6">Work in progress...</p>
    
          </FlexCol>

          <FlexCol id="work" className="items-center gap-y-4 w-full py-20 px-20">
            <h1 className="title">Work Experience</h1>

            <p className="text-center text-6xl text-gradient py-6">Under construction</p>
    
          </FlexCol>

          <FlexCol id="contact" className="items-center gap-y-4 bg-blue-800 w-full py-20 px-20 m-0 selection:bg-blue-500 selection:text-white">
            <h1 className="title text-white">Contact</h1>

            <FlexRow className="justify-center gap-x-10 w-full items-start">

              <FlexCol className="justify-center text-center text-white w-[33%]">
                <p className="text-gradient text-xl font-semibold">Contact</p>
                <p>rafaelcavalinhos2002@gmail.com</p>
                <FlexRow className="justify-center gap-x-10">
                  <FontAwesomeIcon onClick={() => window.open("https://www.linkedin.com/in/rafael-cavalinhos-39937624a/", "_blank")} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faLinkedin} />
                  <FontAwesomeIcon onClick={() => window.open("https://github.com/rafaelcavalinhos", "_blank")} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faGithub} />
                  <FontAwesomeIcon onClick={() => window.location.href = "mailto:rafaelcavalinhos2002@gmail.com"} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faEnvelope} />
                </FlexRow>
              </FlexCol>

              <FlexCol className="justify-center text-center text-white w-[33%]">
                <p className="text-gradient text-xl font-semibold">Overview</p>
                <a href="#about" className="text-scale">About</a>
                <a href="#education" className="text-scale">Education</a>
                <a href="#projects" className="text-scale">Projects</a>
                <a href="#work" className="text-scale">Work Experience</a>
                <a href="#contact" className="text-scale">Contact</a>
              </FlexCol>

              <FlexCol className="justify-between items-center text-white w-[33%]">
                <p className="text-4xl">something</p>
                <input className="p-2 w-96 text-white border-2 bg-inherit"></input>
                <button className="w-96 bg-white text-blue-800 p-2 hover:scale-110 transition">...</button>
              </FlexCol>

            </FlexRow>

          </FlexCol>

        </FlexCol>

      </main>

    </div>

    <FlexCenter className="block lg:hidden h-full font-bold text-2xl">
      <p className="text-gradient text-center">Please open this webpage on a computer.</p>
    </FlexCenter>
  </>);
}
