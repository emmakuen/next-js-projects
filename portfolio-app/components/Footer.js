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
          display: flex;
          justify-content: center;
        }
        .copyright-info {
          position: fixed;
          font-size: 14px;
          color: ${colors.grey};
          bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default Footer;
