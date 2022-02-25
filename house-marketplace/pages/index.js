import { withProtected } from "../lib/routes";
import Link from "next/link";
import Image from "next/image";
import { routes } from "../lib/routes";

function Home() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* Slider */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link href={routes.categories.rent} passHref>
            <a>
              <div className="exploreCategoryImg">
                <Image
                  src="/assets/jpg/rentCategoryImage.jpg"
                  alt="rent"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="exploreCategoryName">Places for rent</p>
            </a>
          </Link>
          <Link href={routes.categories.sell} passHref>
            <a>
              <div className="exploreCategoryImg">
                <Image
                  src="/assets/jpg/sellCategoryImage.jpg"
                  alt="rent"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="exploreCategoryName">Places for sale</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default withProtected(Home);
