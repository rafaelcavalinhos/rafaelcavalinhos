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



        </div>

      </main>

    </div>
  );
}
