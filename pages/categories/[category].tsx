import { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const RandomChuckNorrisJoke: React.FC<{ joke: string }> = ({ joke }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Link href="/">
          <div className={styles.card}>
            <h2>
              {" "}
              {joke}
              &rarr;
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (request) => {
  // Fetch data from external API
  const reqParam = JSON.stringify(request.params);
  const slug = reqParam.slice(13, reqParam.length - 2);
  console.log(slug);

  const response = await fetch(
    `https://api.chucknorris.io/jokes/random?category=${slug}`
  );
  const joke = await response.json();
  // Pass data to the page via props
  return {
    props: {
      joke: joke.value,
      slug: slug,
    },
  };
};

export default RandomChuckNorrisJoke;
