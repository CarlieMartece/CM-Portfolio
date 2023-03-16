import { useEffect, useState } from "react";
import { fetchArt } from "../api";
import ArtCard from "./ArtCard";

export default function ArtGalleryYears({ previousYear, category }) {
  const [artData, setArtData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previous, setPrevious] = useState(false);
  const [isError, setIsError] = useState(false);
  const year = previousYear;
  // console.log(`Yeargallery ${category}`)
  // console.log(`Yeargallery ${year}`)

  useEffect(() => {
    fetchArt(year, category)
      .then((art) => {
        setArtData(art);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setIsError(true);
          setIsLoading(false);
        }
      });
  }, [year, category]);

  const loadPrevious = () => {
    setPrevious(true);
  };
  const loadButton = (
    <button className="art__previous_button" onClick={loadPrevious}>
      <h2>{year - 1}:</h2>
    </button>
  );

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {isError ? (
            <>
              <ArtGalleryYears previousYear={year - 1} category={category} />
            </>
            
          ) : (
            <div className="ArtGallery">
              <ul className="gallery">
                {artData.map((item) => {
                  return (
                    <ArtCard
                      key={item.art_id}
                      customLink={item.custom_link}
                      artId={item.art_id}
                      stockId={item.stock_id}
                      altText={item.alt_text}
                      threeWords={item.three_word_description}
                    />
                  );
                })}
              </ul>
              {year > 1999 ? <>{loadButton}</> : <></>}
              {previous ? <ArtGalleryYears previousYear={year - 1} category={category} /> : <></>}
            </div>
          )}
        </>
      )}
    </>
  );
}
