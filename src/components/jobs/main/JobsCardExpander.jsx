import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

function JobsCardExpander({ setIsExpanded, isExpanded }) {
  return (
    <>
      <div
        className={`absolute rounded-lg bottom-0 left-0 w-full h-8 transition-all duration-300 ease-in-out bg-gradient-to-t from-[teal] to-transparent opacity-0 group-hover:opacity-30 cursor-pointer
        }`}
        onClick={() => setIsExpanded((val) => !val)}
      ></div>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0 cursor-pointer"
        onClick={() => setIsExpanded((val) => !val)}
      >
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
    </>
  );
}

export default JobsCardExpander;
