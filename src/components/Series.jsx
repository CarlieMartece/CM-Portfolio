import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSeries } from "../api";
import ArtCard from "./ArtCard";
import BookCard from "./BookCard";

export default function Series() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { series_id } = useParams();

  useEffect(() => {
    fetchSeries(series_id).then((series) => {
      setData(series);
      setIsLoading(false);
    });
  }, [series_id]);

  return (
    <main>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="series__heading">
            <h2>{data.series.series_name}</h2>
            <p>({data.series.category_name})</p>
          </div>
          <ul className="gallery">
            {data.series.items.map((item) => {
              if (data.series.category_name === "Book") {
                return (
                  <BookCard
                    key={item.book_id}
                    bookId={item.book_id}
                    bookCover={item.cover_stock_id}
                    bookTitle={item.book_title}
                    bookEdition={item.edition_no}
                    bookSeries={item.series_name}
                    bookSequence={item.sequence_no}
                  />
                );
              } else {
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
              }
            })}
          </ul>
        </>
      )}
    </main>
  );
}
