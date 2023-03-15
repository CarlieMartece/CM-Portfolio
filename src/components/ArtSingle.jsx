import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArtSingle } from "../api";
const { formatDate } = require("../utils.js");

export default function ArtSingle() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { art_id } = useParams();

  useEffect(() => {
    fetchArtSingle(art_id).then((art) => {
      setData(art);
      setIsLoading(false);
    });
  }, [art_id]);

  let year = new Date().getFullYear();
  let picLink = "";
  if (!isLoading) {
    const releaseDate = formatDate(data.art[0].completion);
    year = releaseDate.slice(-4);
    if (data.art[0].self_ref.length !== 0) {
      if (data.art[0].self_ref[0][0] === "3") {
        picLink = `/art/collage/${data.art[0].self_ref[2]}--${data.art[0].self_ref[0]}`;
      } else {
        picLink = `/art/${data.art[0].self_ref[1]}`;
      }
    }
  }

  return (
    <main>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div id="ArtSingle">
          <div className="art__title">
            <h2>{data.art[0].art_title}</h2>
            <span className="art__year">({year})</span>
          </div>
          <div className="art__pic">
            <img
              alt={data.art[0].alt_text}
              className={data.art[0].shape}
              src={require(`../images/full/${data.art[0].stock_id}.jpg`)}
            />
          </div>

          <div className="art__info">
            <p>Made from: {data.art[0].made_from}</p>
            <p>Series: <Link to={`/series/${data.art[0].series_id}`}>{data.art[0].series_name}</Link> </p>
            {data.art[0].price === -1 ? (
              <></>
            ) : (
              <p>Price: £{data.art[0].price}</p>
            )}
              <p className="art__quote">"{data.art[0].quote}"</p>
              <p className="art__quote_source">{data.art[0].book_title}</p>
            {data.art[0].self_ref.length === 0 ? (
              <></>
            ) : (
              <>
                <div className="art__self_link">
                  See also:{" "}
                  <p>
                    <Link className="art__close_up" to={picLink}>
                      <img
                        alt={data.art[0].alt_text}
                        src={require(`../images/preview/${data.art[0].self_ref[0]}.jpg`)}
                      />
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
