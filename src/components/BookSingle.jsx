import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { useEffect, useState } from "react";
import { fetchBookSingle } from "../api";
const { formatDate } = require("../utils.js");

export default function BookSingle() {
  const { book_id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookSingle(book_id).then((book) => {
      setData(book);
      setIsLoading(false);
    });
  }, [book_id]);

  let releaseDate;

  if (!isLoading) {
    releaseDate = formatDate(data.book.release_date);
  }

  return (
    <main>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div id="BookSingle">
            <div className="book_title_and_info">
              <div className="book_title">
                <h2>{data.book.book_title}</h2>
                {data.book.edition_no !== 1 ? (
                  <span className="book_info book_edit">
                    (Edit {data.book.edition_no})
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <p className="book_info">
              <Link to={`/series/${data.book.series_id}`}>{data.book.series_name}</Link>: {data.book.sequence_no}
              </p>
              <p className="book_info">Release date: {releaseDate}</p>
            </div>
            <div className="book_cover gallery_pic">
              <ExternalLink href={data.book.sales_url}>
                <img
                  alt={`${data.book.book_title} - preview`}
                  className="centre"
                  src={require(`../images/full/${data.book.cover_stock_id}.jpg`)}
                />
              </ExternalLink>
            </div>

            <div id="book_blurb_and_buy">
              <ul className="book_blurb">
                {data.book.blurb.map((blurbParagraph) => {
                  const blurbKey = blurbParagraph.slice(0, 14);
                  return <li key={blurbKey}>{blurbParagraph}</li>;
                })}
              </ul>
              {data.book.sales_url !== null ? (
                <ExternalLink href={data.book.sales_url}>
                  <p className="book_buy">Buy Here</p>
                </ExternalLink>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
