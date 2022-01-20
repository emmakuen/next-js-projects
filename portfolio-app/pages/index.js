import LeftEclipse from "../components/svg/left-eclipse.svg";
import RightEclipse from "../components/svg/right-eclipse.svg";
import StyledDots from "../components/svg/styled-dots.svg";
import SmallStyledDots from "../components/svg/styled-dots-small.svg";
import GlassSidebar from "../components/GlassSidebar";
import Title from "../components/Title";
import AnimatedSVG from "../components/AnimatedSVG";

export default function HomePage() {
  return (
    <>
      <main className="home">
        <SmallStyledDots className="home small styled-dots" />
        <section className="image-container">
          <LeftEclipse className="home left-eclipse" />
          <div className="animation-container">
            <AnimatedSVG />
          </div>
          <StyledDots className="home styled-dots bottom" />
        </section>
        <section className="intro-container">
          <Title />
        </section>
        <section className="sidebar-container">
          <RightEclipse className="home right-eclipse" />
          <StyledDots className="home styled-dots" />
          <GlassSidebar className="glass" />
        </section>
      </main>
      <style jsx>{`
        .home {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .image-container {
          width: 550px;
          position: relative;
        }

        .animation-container {
          position: absolute;
          top: 20vh;
          left: 80px;
        }

        .intro-container {
          width: 550px;
        }

        .sidebar-container {
          position: relative;
        }
      `}</style>
    </>
  );
}
