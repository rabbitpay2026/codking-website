import { Section } from "@/components/common/Section";
import { headingClass } from "@/constants/theme";

export default function HomePage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Home Page</h1>
    </Section>
  );
}
