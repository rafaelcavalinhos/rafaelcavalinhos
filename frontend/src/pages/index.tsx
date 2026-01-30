import { FlexCenter, FlexCol, FlexRow } from "@/components/utils/flex";
import Project from "@/components/items/project";
import { SlideUp } from "@/components/utils/animations";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowRight, faCalendar, faDownload, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const techInterests = ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Fastify", "Kysely", "Web Design", "Tailwind CSS",
    "Automation", "Full-Stack", "Web Performance", "Web Security", "Docker", "Game Development", "Unity", "C#", "Digital Art", "Aseprite", "Video Editing"];

  const softSkills = ["Problem Solving", "Team Collaboration", "Communication", "Time Managment", "Adaptability", "Critical Thinking", ];

  const hobbies = ["Guitar", "Gaming", "Programming", "Animals", "Cars"];

  const [scrollY, setScrollY] = useState(0);
  const [heroScale, setHeroScale] = useState(1);
  const [windowHeight, setWindowHeight] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          setHeroScale(Math.max(0, 1 - (window.scrollY / 1000)));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (<>

    {/* Under Construction */}
    {/* <FlexRow className="justify-center z-50 fixed top-[90vh] right-[-40vw] w-full pointer-events-none transition-transform">
      <div className="pointer-events-auto px-6 py-2 bg-yellow-300 text-black font-semibold rounded-2xl shadow-md border-2 border-yellow-100">
        🚧 Under Construction 🚧  
      </div>
    </FlexRow> */}



    <div id="home" className="hidden lg:block bg-white">

      {/* Header */}
      <header className="z-20 fixed flex flex-row justify-between overflow-hidden items-center w-full py-4 border-b-2 border-gray-200 bg-white px-20">
        <div className="pointer-events-auto px-6 py-2 bg-yellow-300 text-black font-semibold rounded-2xl shadow-md border-2 border-yellow-100">
          🚧 Under Construction 🚧  
        </div>

        <div className="absolute left-1/2 top-6 -translate-x-1/2 transition-transform" style={{ scale: scrollY >= windowHeight * 0.9 ? 1 : 0}}>
          Rafael Cavalinhos
        </div>

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
          <FlexRow style={{ transform: `scale(${heroScale})`, transformOrigin: "top" }} className="fixed justify-between w-full h-screen pt-24 px-20 transition-transform duration-100 ease-out">
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

              <FlexRow className="gap-x-2">

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
          <FlexCol id="about" className="items-center gap-y-4 bg-gray-50 w-full py-20 px-20 mt-[100vh] z-10">
            
            <SlideUp>
              <h1 className="title">About</h1>
            </SlideUp>

            <FlexRow className="gap-x-10">
            
              <FlexCol className="gap-y-4 w-[50%] items-center text-lg font-medium">
                <SlideUp delay={0.1}>
                  <h2 className="text-3xl text-gradient">Professional Bio</h2>
                </SlideUp>

                <FlexCol className="text-justify">
                  <SlideUp delay={0.2}>
                    <p>
                      I am Computer Engineering graduate with a growing focus on web development, who likes to solve real problems by building applications.
                      I spend a lot of my free time building personal projects and studying to sharpen my skills and explore new usefull technologies.
                      I’m comfortable working across the stack as I like understanding how everything connects, from the database to the UI.
                      I also like video game development and I'm always looking for opportunities to grow, collaborate, and contribute to real-world projects.
                    </p>
                  </SlideUp>
                </FlexCol>
              </FlexCol>
            
              <FlexCol className="gap-y-4 w-[50%] items-center text-lg font-medium">

                <SlideUp delay={0.2}>
                  <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient">Tech Interests</h2>
                </SlideUp>

                <FlexRow className="flex-wrap gap-y-2 gap-x-1 justify-center">
                  {techInterests.map((interest, i) => {
                    return (
                      <SlideUp key={i} delay={0.05 * i}>
                        <div className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
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
                      <SlideUp key={i} delay={0.05 * i}>
                        <div className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
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
                      <SlideUp key={i} delay={0.05 * i}>
                        <div className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
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
          <FlexCol id="education" className="items-center gap-y-4 bg-white py-20 px-20 z-10">
            <SlideUp>
              <h1 className="title">Education</h1>
            </SlideUp>

            {/* <FlexRow className="w-full justify-between px-[18%] absolute pt-12">

              <SlideUp delay={0.1}>
                <FlexCenter className="mt-20 group hover:scale-110 transition duration-300 w-10 h-10 bg-blue-400 rounded-full text-white border-3 border-blue-200 font-semibold">
                    <p className="group-hover:scale-125 transition">1</p>
                </FlexCenter>
              </SlideUp>

              <SlideUp delay={0.2}>
                <FlexCenter className="mt-10 group hover:scale-110 transition duration-300 w-10 h-10 bg-blue-400 rounded-full text-white border-3 border-blue-200 font-semibold">
                  <p className="group-hover:scale-125 transition">2</p>
                </FlexCenter>
              </SlideUp>

              <SlideUp delay={0.3}>
                <FlexCenter className="group hover:scale-110 transition duration-300 w-10 h-10 bg-blue-400 rounded-full text-white border-3 border-blue-200 font-semibold">
                    <p className="group-hover:scale-125 transition">3</p>
                </FlexCenter>
              </SlideUp>

            </FlexRow> */}

            <SlideUp delay={0.1}>
              <FlexRow className="w-full gap-x-4">

                <FlexCol className="mt-20 group w-full justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                  <span className="group-hover:scale-102 transition">
                    <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Técnico de Informática de Gestão</p>
                    <p className="text-base">Escola Tecnológica do Litoral Alentejano</p>
                    <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                      <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 09/2017 - 07/2020</p>
                      <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Sines - Portugal</p>
                    </FlexRow>

                    <p className="text-justify">
                      Focused on the development and maintenance of IT solutions for business environments,
                      creating websites and company portals, installing and configuring operating systems and application software,
                      managing relational databases and building management-oriented software applications.
                    </p>
                  </span>
                </FlexCol>


                <FlexCol className="mt-10 group w-full justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                  <span className="group-hover:scale-102 transition">
                    <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Desenvolvimento de Videojogos e Aplicações Multimédia</p>
                    <p className="text-base">Instituto Politécnico de Setúbal</p>
                    <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                      <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2020 - 06/2023</p>
                      <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal - Portugal</p>
                    </FlexRow>

                    <p className="text-justify">
                      Focused on game development and multimedia applications, covering game design techniques, interface design and core programming concepts.
                      It includes work with graphic APIs and game engines, as well as the creation and editing of multimedia assets such as audio, video, textures and 3D models.
                    </p>
                  </span>
                </FlexCol>

                <FlexCol className="group w-full justify-start border-4 rounded-2xl px-5 py-3 bg-blue-400 border-blue-200 text-white hover:scale-105 transition duration-300">
                  <span className="group-hover:scale-102 transition">
                    <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves">Licenciatura em Engenharia Informática</p>
                    <p className="text-base">Instituto Politécnico de Setúbal</p>
                    <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                      <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2023 - 10/2025</p>
                      <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal - Portugal</p>
                    </FlexRow>

                    <p className="text-justify">
                      Bachelor’s degree focused on developing technical and scientific skills in the field of computer science.
                      It covers programming, databases, networks, software development, and technology integration.
                      The program combines theory and practice through laboratory projects and teamwork, preparing professionals for the design, analysis,
                      and implementation of modern IT solutions.
                    </p>
                  </span>
                </FlexCol>

              </FlexRow>
            </SlideUp>
    
          </FlexCol>

          {/* Projects Section */}
          <FlexCol id="projects" className="items-center gap-y-4 bg-gray-50 w-full py-20 px-20 z-10">
            <SlideUp delay={0.1}>
              <h1 className="title">Projects</h1>
            </SlideUp>
            
            <FlexRow className="flex-wrap justify-center gap-2">
              <SlideUp delay={0.1}>
                <Project
                tags={["College Project", ]}
                images={["/projects/press-em1.png", "/projects/press-em2.png", "/projects/press-em3.png"]}
                title="Press 'em"
                description="In Press 'em you need to defeat robots and solve puzzles by grabbing crates and pressing buttons to complete the levels!"
                technologies={["Unity", "C#", "Aseprite"]}
                downloadUrl="https://rafael-cavalinhos.itch.io/press-em"
                />
              </SlideUp>

              <SlideUp delay={0.2}>
                <Project
                tags={["College Project", ]}
                images={["/projects/castaway1.png", "/projects/castaway2.png", "/projects/castaway3.png"]}
                title="Castaway"
                description="Castaway is a game where you will try to survive the days and nights in an island whilst fighting enemies and gathering resources to finally fix and escape in your until then wrecked ship."
                technologies={["Unity", "C#", "Aseprite"]}
                downloadUrl="https://rafael-cavalinhos.itch.io/castaway"
                />
              </SlideUp>

              <SlideUp delay={0.3}>
                <Project
                tags={["College Project", "Game Jam", ]}
                images={["/projects/factory-dealings1.png", "/projects/factory-dealings2.png", "/projects/factory-dealings3.png"]}
                title="Factory Dealings"
                description="Factory Dealings is an arcade game where you'll have to give items for injured robots, and fast, or else they will explode and die a cruel death."
                technologies={["Unity", "C#", "Aseprite"]}
                downloadUrl="https://rafael-cavalinhos.itch.io/factory-dealings"
                />
              </SlideUp>

              <SlideUp delay={0.4}>
                <Project
                tags={["Hobby Project", ]}
                images={["/projects/snake-game1.png", "/projects/snake-game2.png", "/projects/snake-game3.png"]}
                title="Snake Game"
                description="A basic 2D Snake game made as a hobby project and published for fun."
                technologies={["Unity", "C#", "Aseprite"]}
                downloadUrl="https://rafael-cavalinhos.itch.io/snake-game"
                />
              </SlideUp>

              <SlideUp delay={0.5}>
                <Project
                tags={["Internship", "Team Project", ]}
                videos
                images={["/projects/beach-rolling.mp4", "/projects/spooky-hunt.mp4", "/projects/brawl-fighters.mp4", "/projects/wave-racer.mp4", "/projects/feng-shui.mp4", "/projects/flames-out.mp4", ]}
                title="Internship Mobile Games"
                description="These mobile games were developed as demonstration prototypes for advertising purposes, with the objective of evaluating their potential before deciding which concepts would proceed to full development. As a result, only the advertisements are available."
                technologies={["Unity", "C#",]}
                downloadUrl="https://rafael-cavalinhos.itch.io/estgio-bee-engeneering"
                />
              </SlideUp>

            </FlexRow>
    
          </FlexCol>

          {/* Work Experience Section */}
          <FlexCol id="work" className="items-center gap-y-4 w-full bg-white py-20 px-20 z-10">
            <SlideUp delay={0.1}>
              <h1 className="title">Work Experience</h1>
            </SlideUp>

            {/* <SlideUp delay={0.2}>
              <p className="text-center text-6xl text-gradient py-6">Under construction</p>
            </SlideUp> */}

            <FlexRow className="w-full">

              {/* <FlexCol className="justify-around p-10">
                <FontAwesomeIcon icon={faArrowCircleRight} className="text-blue-400"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faArrowCircleRight} className="text-blue-400"></FontAwesomeIcon>
              </FlexCol> */}

              <FlexCol className="w-full gap-y-2">

                <SlideUp delay={0.2}>
                  <FlexCol className="group w-full justify-start border-y-4 px-5 py-3 border-blue-200 text-black hover:scale-105 transition duration-300">
                    <span className="group-hover:scale-102 transition">
                      <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves-black">Internship at Albatroz Digital</p>
                      <p className="text-base">Albatroz Digital</p>
                      <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                        <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 07/2025 - 09/2025</p>
                        <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Almada - Portugal</p>
                      </FlexRow>

                      <p className="text-justify">
                        Designed and implemented a full interface for creating and managing entities. <br />
                        Built reusable front-end components to ensure visual consistency and maintainability.  <br />
                        Developed the backend logic, API endpoints and database communication needed to support the new interface.
                      </p>
                    </span>
                  </FlexCol>
                </SlideUp>

                <SlideUp delay={0.3}>
                  <FlexCol className="group w-full justify-start border-y-4 px-5 py-3 border-blue-200 text-black hover:scale-105 transition duration-300">
                    <span className="group-hover:scale-102 transition">
                      <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-xl font-bold text-gradient-waves-black">Internship at Bee Engineering</p>
                      <p className="text-base">Bee Engineering</p>
                      <FlexRow className="gap-x-4 items-center mt-2 mb-4 font-semibold">
                        <p><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 04/2022 - 08/2022</p>
                        <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Remote (Lisbon - Portugal)</p>
                      </FlexRow>

                      <p className="text-justify">
                        Developed mobile game prototypes in Unity, handling core gameplay logic, UI flow and level structure. <br />
                        Designed and tuned levels, integrated animations, audio and gameplay feedback to enhance game feel. <br />
                        Worked in rapid prototyping cycles, iterating based on internal playtesting and feedback.
                      </p>
                    </span>
                  </FlexCol>
                </SlideUp>

              </FlexCol>
              
            </FlexRow>
    
          </FlexCol>

          {/* Contact Section */}
          <FlexCol id="contact" className="items-center gap-y-4 bg-blue-800 w-full py-20 px-20 m-0 selection:bg-blue-500 selection:text-white z-10">
            <h1 className="title text-white">Contact</h1>

            <FlexRow className="w-full items-start justify-between">

              <FlexCol className="items-center text-center text-white w-[33%]">
                <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-gradient text-xl font-semibold">Email</p>
                <p>rafaelcavalinhos2002@gmail.com</p>
                <button onClick={() => window.open("/cv.pdf", "_blank")} className="w-[45%] font-semibold cursor-pointer group bg-inherit border-2 border-white text-white rounded-2xl text-base transition duration-200 hover:scale-110">
                  <span className="inline-flex items-center transition duration-300 group-hover:scale-115">
                    Download CV <FontAwesomeIcon icon={faDownload} />
                  </span>
                </button>
              </FlexCol>

              <FlexCol className="items-center text-center text-white w-[33%]">
                <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-gradient text-xl font-semibold">Overview</p>
                <a href="#about" className="text-scale">About</a>
                <a href="#education" className="text-scale">Education</a>
                <a href="#projects" className="text-scale">Projects</a>
                <a href="#work" className="text-scale">Work Experience</a>
                <a href="#contact" className="text-scale">Contact</a>
              </FlexCol>

              <FlexCol className="text-center text-white w-[33%]">
                <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-gradient text-xl font-semibold">Socials</p>
                <FlexRow className="justify-center gap-x-10">
                  <FontAwesomeIcon onClick={() => window.open("https://www.linkedin.com/in/rafael-cavalinhos-39937624a/", "_blank")} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faLinkedin} />
                  <FontAwesomeIcon onClick={() => window.open("https://github.com/rafaelcavalinhos", "_blank")} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faGithub} />
                  <FontAwesomeIcon onClick={() => window.location.href = "mailto:rafaelcavalinhos2002@gmail.com"} className="text-2xl text-white hover:scale-125 transition cursor-pointer" icon={faEnvelope} />
                </FlexRow>
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
