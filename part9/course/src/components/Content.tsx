import Part from "./Part";
import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </>
  );
};

export default Content;
