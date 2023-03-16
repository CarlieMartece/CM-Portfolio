import { useEffect, useState } from "react";
import { fetchArt, fetchArtByColour } from "../api";
import ArtCard from "./ArtCard";

export default function ArtGallery({ selectedYear, category, selectedColour }) {
  const [artData, setArtData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const year = selectedYear || 314;
  //console.log(`gallery cat ${category}`);
  //console.log(`gallery year ${year}`);
  //console.log(`gallery colour ${selectedColour}`);

  useEffect(() => {
    if (!selectedColour) {
      fetchArt(year, category).then((art) => {
        setArtData(art);
        setIsLoading(false);
      });
    } else {
      fetchArtByColour(selectedColour).then((art) => {
        setArtData(art);
        setIsLoading(false);
      });
    }
  }, [year, category, selectedColour]);
  //if (!isLoading) console.log(artData)

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
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
            </div>
        </>
      )}
    </>
  );
}
