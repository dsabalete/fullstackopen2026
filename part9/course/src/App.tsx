import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import type { CoursePart } from "./types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  courseParts.forEach((part) => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case "background":
        console.log(
          part.name,
          part.description,
          part.backgroundMaterial,
          part.exerciseCount,
        );
        break;
      default:
        assertNever(part);
    }
  });

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
