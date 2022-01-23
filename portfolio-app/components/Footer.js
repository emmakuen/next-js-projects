import { colors } from "../utils/colors";

const Footer = () => {
  return (
    <>
      <footer>
        <small className="copyright-info">
          &#169; Emmaku | All rights reserved.
        </small>
      </footer>
      <style jsx>{`
        footer {
          position: fixed;
          width: 300px;
          left: 50%;
          bottom: 0;
          margin: 5vh 0 3vh;
          margin-left: -150px;
          text-align: center;
        }

        .copyright-info {
          font-size: 14px;
          color: ${colors.grey};
        }
      `}</style>
    </>
  );
};

export default Footer;
