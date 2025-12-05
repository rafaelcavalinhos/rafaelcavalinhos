import { FlexCol, FlexRow } from "@/components/utils/flex";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope, faMailBulk, faMailForward, faMailReply, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faGit, faGithub, faInstagram, faLetterboxd, faLinkedin, faMailchimp } from "@fortawesome/free-brands-svg-icons";

export default function Home() {

  return (
    <div id="home" className="bg-white">

      <header className="fixed flex flex-row justify-between items-center w-full py-4 px-10 border-b-2 border-gray-200 bg-white">
        <h1 className="font-semibold text-2xl text-scale"><a href="#home">Rafael Cavalinhos</a></h1>
        <FlexRow className="font-semibold text-xl gap-x-4">
          <a href="#about" className="text-scale">About</a>
          <a href="#projects" className="text-scale">Projects</a>
          <a href="#contact" className="text-scale">Contact</a>
        </FlexRow>
      </header>

      <main>

        <div className="flex flex-col px-20">

          <FlexRow className="justify-between h-screen pt-24">
            <FlexCol className="font-bold text-6xl justify-center items-start gap-y-10">
              <h1>Hello!</h1>
              <h1>I'm <span className="text-gradient">Rafael Cavalinhos</span>,</h1>
              <h1>a Full-Stack Developer</h1>
              <button onClick={() => window.open("/cv.pdf", "_blank")} className="group bg-blue-400 border-3 border-blue-200 text-white rounded-2xl text-xl py-2 px-10 transition duration-200 hover:scale-120">
                <span className="inline-flex items-center gap-2 transition duration-300 group-hover:scale-125">
                  Download CV <FontAwesomeIcon icon={faDownload} />
                </span>
              </button>

              <FlexRow>
                <button onClick={() => window.open("https://www.linkedin.com/in/rafael-cavalinhos-39937624a/", "_blank")} className="group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faLinkedin} />
                </button>
       
                <button onClick={() => window.open("https://github.com/rafaelcavalinhos", "_blank")} className="group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faGithub} />
                </button>
       
                <button onClick={() => window.location.href = "mailto:rafaelcavalinhos2002@gmail.com"} className="group transition duration-200 hover:scale-120 text-white rounded-full bg-blue-400 w-10 h-10 text-xl border-3 border-blue-200">
                  <FontAwesomeIcon className="inline-flex items-center transition duration-300 group-hover:scale-120" icon={faEnvelope} />
                </button>
       
              </FlexRow>

            </FlexCol>
            <Image src="/cat.gif" alt="cat" width={1000} height={500} unoptimized/>
          </FlexRow>

          <FlexCol id="about" className="items-center gap-y-4 mt-50">
            <h1 className="title">About</h1>
            <FlexRow>
              <p className="w-[50%]">
                I am Computer Engineering graduate with a growing focus on full-stack web development.
                I enjoy turning ideas into real applications and I spend a lot of my free time building personal projects to sharpen my skills and explore new technologies.
                I’m comfortable working across the stack and I like understanding how everything connects, from the database to the UI.
                Recently, I’ve been diving deeper into modern web frameworks, such as Next.js.
                What motivates me is learning and solving practical problems. I'm always looking for opportunities to grow, collaborate, and contribute to real-world projects.
                Tech interests: JavaScript/TypeScript, React, Next.js, Node.js, Fastify, PostgreSQL, Kysely, web performance, full-stack architectures, automation.
              </p>
            </FlexRow>
          </FlexCol>

          <FlexCol id="projects" className="items-center gap-y-4 mt-50">
            <h1 className="title">Projects</h1>
    
          </FlexCol>

          <FlexCol id="contact" className="items-center gap-y-4 mt-50">
            <h1 className="title">Contact</h1>
    
          </FlexCol>

        </div>

      </main>

    </div>
  );
}
