import { FlexCol, FlexRow } from "@/components/utils/flex";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, } from "@fortawesome/free-solid-svg-icons";

interface Props {
  images: string[];
  title: string;
  description: string;
  technologies: string[];
  downloadUrl: string;
}

const Project = (props: Props) => {

  const { images, title, description, technologies, downloadUrl } = props;

  return (<>

    <FlexCol className="w-[350px] border-4 border-blue-200 rounded-2xl overflow-hidden bg-blue-400 text-white hover:scale-102 transition duration-300">
    
        <Image src="/projects/factory-dealings1.png" alt="" width={350} height={350} className=""/>

        <FlexCol className="p-4 pt-0">
            <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-gradient-waves font-bold  text-2xl">{title}</p>
            <p className="">{description}</p>

            <FlexRow className="flex-wrap">
              { technologies.map((technologie, i) => (
                <div key={i} className="group hover:scale-120 transition duration-300 border-2 rounded-3xl py-0 px-2 border-gray-200 bg-white text-black font-semibold">
                  <p className="group-hover:scale-115 transition duration-200">{technologie}</p>
                </div>
              ))}
            </FlexRow>

            <button onClick={() => window.open(`${downloadUrl}`, "_blank")} className="w-full font-semibold cursor-pointer group bg-inherit border-2 border-white text-white rounded-2xl text-base transition duration-200 hover:scale-105">
              <span className="inline-flex items-center transition duration-300 group-hover:scale-110">
                  Download <FontAwesomeIcon icon={faDownload} />
              </span>
            </button>

        </FlexCol>

    </FlexCol>
    

  </>);
}

export default Project;