import type { CoursePart } from "../types";

import { assertNever } from "../utils";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
        </div>
      );
    case "group":
      return (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
