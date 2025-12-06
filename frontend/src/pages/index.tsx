import { FlexCenter, FlexCol, FlexRow } from "@/components/utils/flex";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope, faMailBulk, faMailForward, faMailReply, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faGit, faGithub, faInstagram, faLetterboxd, faLinkedin, faMailchimp } from "@fortawesome/free-brands-svg-icons";

export default function Home() {

  const techInterests = ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Fastify", "Kysely", "Web Design", "Tailwind CSS",
    "Automation", "Full-Stack", "Web Performance", "Web Security", "Docker", "Game Development", "Unity", "C#", ];

  const softSkills = ["Problem Solving", ];

  const hobbies = ["Playing Guitar", "Gaming", "Programming", ];

  return (<>
    <FlexRow className="justify-center z-50 fixed top-20 w-full pointer-events-none">
      <div className="pointer-events-auto px-6 py-2 bg-yellow-300 text-black font-semibold rounded-2xl shadow-md border-2 border-yellow-100">
        🚧 Under Construction 🚧  
      </div>
    </FlexRow>

    <div id="home" className=" bg-white">

      <header className="fixed flex flex-row justify-between items-center w-full py-4 px-10 border-b-2 border-gray-200 bg-white">
        <h1 className="font-semibold text-2xl text-scale"><a href="#home">Rafael Cavalinhos</a></h1>
        <FlexRow className="font-semibold text-xl gap-x-4">
          <a href="#about" className="text-scale">About</a>
          <a href="#about" className="text-scale">Education</a>
          <a href="#projects" className="text-scale">Projects</a>
          <a href="#contact" className="text-scale">Contact</a>
        </FlexRow>
      </header>

      <main>

        <div className="flex flex-col">

          <FlexRow className="justify-between h-screen pt-24 px-20">
            <FlexCol className="font-bold text-6xl justify-center items-start gap-y-10">
              <h1>Hello!</h1>
              <h1>I'm <span className="text-gradient">Rafael Cavalinhos</span>,</h1>
              <h1>a Full-Stack Developer</h1>
              <button onClick={() => window.open("/cv.pdf", "_blank")} className="cursor-pointer group bg-blue-400 border-3 border-blue-200 text-white rounded-2xl text-xl py-2 px-10 transition duration-200 hover:scale-120">
                <span className="inline-flex items-center gap-2 transition duration-300 group-hover:scale-125">
                  Download CV <FontAwesomeIcon icon={faDownload} />
                </span>
              </button>

              <FlexRow>
                <button onClick={() => window.open("https://www.linkedin.com/in/rafael-cavalinhos-39937624a/", "_blank")} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faLinkedin} />
                </button>
       
                <button onClick={() => window.open("https://github.com/rafaelcavalinhos", "_blank")} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faGithub} />
                </button>
       
                <button onClick={() => window.location.href = "mailto:rafaelcavalinhos2002@gmail.com"} className="cursor-pointer group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faEnvelope} />
                </button>
       
              </FlexRow>

            </FlexCol>
            <Image src="/cat.gif" alt="cat" width={700} height={600}/>
          </FlexRow>

          <FlexCol id="about" className="items-center gap-y-4 mt-50 bg-gray-50 w-full py-20">
            <h1 className="title">About</h1>
            
              <FlexCol className="gap-y-4 w-[50%] items-center text-lg font-medium">
                <h2 className="text-3xl text-gradient">Professional Bio</h2>
                <FlexCol>
                  <p>I am Computer Engineering graduate with a growing focus on full-stack web development.</p>
                  <p>I enjoy turning ideas into real applications and I spend a lot of my free time building personal projects to sharpen my skills and explore new technologies.</p>
                  <p>I’m comfortable working across the stack and I like understanding how everything connects, from the database to the UI.</p>
                  <p>Recently, I’ve been diving deeper into modern web frameworks, such as Next.js.</p>
                  <p>What motivates me is learning and solving practical problems. I'm always looking for opportunities to grow, collaborate, and contribute to real-world projects.</p>
                </FlexCol>
              </FlexCol>
            
              <FlexCol className="gap-y-4 w-[40%] items-center text-lg font-medium">

                <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient mt-10">Tech Interests</h2>
                <FlexRow className="flex-wrap gap-y-2 gap-x-1">
                  {techInterests.map((interest, i) => {
                    return (
                      <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                        <p className="group-hover:scale-120 transition duration-200">{interest}</p>
                      </div>
                    );
                  })}
                </FlexRow>

                <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient mt-10">Soft Skills</h2>
                <FlexRow className="flex-wrap gap-y-2 gap-x-1">
                  {softSkills.map((skill, i) => {
                    return (
                      <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                        <p className="group-hover:scale-120 transition duration-200">{skill}</p>
                      </div>
                    );
                  })}
                </FlexRow>

                <h2 style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-3xl text-gradient mt-10">Hobbies</h2>
                <FlexRow className="flex-wrap gap-y-2 gap-x-1">
                  {hobbies.map((hobby, i) => {
                    return (
                      <div key={i} className="group hover:scale-125 transition duration-300 border-2 rounded-3xl p-1 px-3 border-blue-200 bg-blue-400 text-white">
                        <p className="group-hover:scale-120 transition duration-200">{hobby}</p>
                      </div>
                    );
                  })}
                </FlexRow>

              </FlexCol>



          </FlexCol>

          <FlexCol id="projects" className="items-center gap-y-4 py-20">
            <h1 className="title">Projects</h1>
    
          </FlexCol>

          <FlexCol id="contact" className="items-center gap-y-4 mt-50">
            <h1 className="title">Contact</h1>
    
          </FlexCol>

        </div>

      </main>

    </div>

    {/* <FlexCenter className="block lg:hidden h-full font-bold text-2xl">
      <p className="text-gradient text-center">Please open this webpage on a computer.</p>
    </FlexCenter> */}
  </>);
}
