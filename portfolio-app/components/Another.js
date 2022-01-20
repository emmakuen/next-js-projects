import { motion } from "framer-motion";

const Blob = () => {
  return (
    <svg viewBox="0 0 456 449" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="left-eclipse" filter="url(#filter0_dd_2276_214)">
        <motion.path
          style={{ fill: "#D8E8F2" }}
          animate={{
            d: [
              "M422 219C422 324.763 289.897 410.5 184.135 410.5C78.3724 410.5 33.1349 314.763 33.1349 209C33.1349 103.237 107.635 3.00004 219.135 41.5C313.635 62 422 113.237 422 219Z",
              "M341 111.427C341 179.669 207.219 224 122.306 224C37.3924 224 6 108.977 6 40.7352C6 -27.5065 131.497 15.191 216.411 15.191C301.324 15.191 341 43.1855 341 111.427Z",
              "M422 219C422 324.763 289.897 410.5 184.135 410.5C78.3724 410.5 33.1349 314.763 33.1349 209C33.1349 103.237 107.635 3.00004 219.135 41.5C313.635 62 422 113.237 422 219Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeOut",
            times: "0.3, 0.8",
          }}
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_2276_214"
          x="0.134888"
          y="0.0901184"
          width="455.865"
          height="448.41"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="14" dy="18" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.345098 0 0 0 0 0.313726 0 0 0 0 0.278431 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2276_214"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-13" dy="-13" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2276_214"
            result="effect2_dropShadow_2276_214"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2276_214"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Blob;