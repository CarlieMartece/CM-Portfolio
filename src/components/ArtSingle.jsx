import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArtSingle } from "../api";
const { formatDate } = require("../utils.js");

export default function ArtSingle() {
  const { art_id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArtSingle(art_id).then((book) => {
      setData(book);
      setIsLoading(false);
    });
  }, [art_id]);
  console.log(!data.art.close_ups);
  let year;
  let artClass = "landscape";
  let closeUps;
  if (!isLoading) {
    const releaseDate = formatDate(data.art.completion);
    year = releaseDate.slice(-4);
    if (data.art.shape === "P") {
      artClass = "portrait";
    } else if (data.art.shape === "S") {
      artClass = "square";
    }
    if (data.art.close_ups) {
      closeUps = data.art.close_ups.split(",");
    }
    console.log(closeUps);
  }

  return (
    <main>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div id="ArtSingle">
          <div className="art__title">
            <h2>{data.art.art_title}</h2>
            <span className="art__year">({year})</span>
          </div>
          <div className="art__pic">
            <img
              alt={data.art.alt_text}
              className={artClass}
              src={require(`../images/full/${data.art.stock_id}.jpg`)}
            />
          </div>

          <div className="art__info">
            <p>Made from: {data.art.made_from}</p>
            <p>Series: {data.art.series_name}</p>
            {data.art.price === -1 ? <></> : <p>Price: £{data.art.price}</p>}
            {data.art.self_ref === "TBC" ? (
              <></>
            ) : (
              <p>
                See also{" "}
                <Link to={`/art/${data.art.self_ref}`}>
                  {data.art.self_ref}
                </Link>
              </p>
            )}
            <div className="art__quote_and_source">
              <p className="art__quote">"{data.art.quote}"</p>
              <p className="art__quote_source">{data.art.book_title}</p>
            </div>

            {!data.art.close_ups ? (
              <></>
            ) : (
              <div className="art__close_ups">
                <h2>Close Ups</h2>
                <ul className="gallery">
                  {closeUps.map((closeUp) => {
                    return (
                      <li className="art__close_up" key = {closeUp}>
                        <img
                          alt={`${closeUp}-preview`}
                          src={require(`../images/preview/${closeUp}.jpg`)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}