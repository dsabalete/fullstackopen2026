interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
