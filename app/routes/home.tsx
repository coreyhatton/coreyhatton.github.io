import Container from "~/components/Container";
import type { Route } from "./+types/home";

import { Content } from "./Content/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Corey Hatton | Portfolio" },
    { name: "description", content: "Corey Hatton Portfolio" },
    { name: "robots", content: "index,follow" },
    { name: "theme-color", content: "#007a7c" },
  ];
}

export default function Home() {
  return (
    <Container>
      <Content />
    </Container>
  );
}
