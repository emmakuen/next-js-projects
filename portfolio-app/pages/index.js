import LeftEclipse from "../components/svg/left-eclipse.svg";
import RightEclipse from "../components/svg/right-eclipse.svg";
import StyledDots from "../components/svg/styled-dots.svg";
import SmallStyledDots from "../components/svg/styled-dots-small.svg";

export default function HomePage() {
  return (
    <>
      <main>
        <section className="home">
          <LeftEclipse className="home left-eclipse" />
          <RightEclipse className="home right-eclipse" />
          <StyledDots className="home styled-dots" />
          <SmallStyledDots className="home small styled-dots" />
        </section>
      </main>
    </>
  );
}
