import { motion } from "framer-motion";

import { colors } from "../utils/colors";

const Title = () => {
  return (
    <>
      <motion.div>
        <h1 className="title">
          Hi.
          <br />I am
          <span className="title orange"> Emma.</span>
        </h1>
        <div className="title-underline"></div>
      </motion.div>
      <style jsx>{`
        .title {
          font-family: "Dancing Script", cursive;
          font-size: 72px;
          font-weight: 700;
        }

        .title.orange {
          color: ${colors.orange};
        }

        .title-underline {
          background-color: ${colors.orange};
          height: 5px;
          width: 70px;
          display: flex;
          margin-left: 190px;
          margin-top: 5px;
        }
      `}</style>
    </>
  );
};

export default Title;
