import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

interface WelcomeProps {
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <Welcome name="Sarah" />
  </StrictMode>,
);
