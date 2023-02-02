import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArtCollage } from "../api";
const { formatDate } = require("../utils.js");

export default function ArtCollage() {
  const [data, setData] = useState([]);
  const [mainId, setMainId] = useState("");
  const [stockIds, setStockIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { threeWords } = useParams();

  useEffect(() => {
    const paramSplit = threeWords.split("--");
    const params = paramSplit[0];
    fetchArtCollage(params).then((art) => {
      setData(art);
      const ids = Object.keys(art.collage);
      setStockIds(ids);
      paramSplit.length > 1 ? setMainId(paramSplit[1]) : setMainId(ids[0]);
      setIsLoading(false);
    });
  }, [threeWords]);

  let mainPic;
  let year;
  let closeUps;
  if (!isLoading) {
    mainPic = data.collage[mainId];
    if (data.collage[stockIds[0]].close_ups) {
      closeUps = data.collage[stockIds[0]].close_ups.split(",");
    }
    const releaseDate = formatDate(data.collage[mainId].completion);
    year = releaseDate.slice(-4);
  }

  const changePic = (closeUp) => {
    setMainId(closeUp);
  };

  return (
    <main>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div id="ArtSingle">
          <div className="art__title">
            <h2>{mainPic.art_title}</h2>
            <span className="art__year">({year})</span>
          </div>
          <div className="art__pic">
            <img
              alt={mainPic.alt_text}
              className={data.collage[stockIds[0]].shape}
              src={require(`../images/full/${mainId}.jpg`)}
            />
          </div>

          <div className="art__info">
            {!data.collage[stockIds[0]].close_ups ? (
              <></>
            ) : (
              <div className="art__close_ups">
                <ul className="gallery">
                  {closeUps.map((closeUp) => {
                    return (
                      <button key={closeUp}>
                        <li className="art__close_up">
                          <img
                            alt={`${closeUp}-preview`}
                            onClick={() => changePic(closeUp)}
                            src={require(`../images/preview/${closeUp}.jpg`)}
                          />
                        </li>
                      </button>
                    );
                  })}
                  <button key={data.collage[stockIds[0].stock_id]}>
                    <li className="art__close_up">
                      <img
                        alt={`${data.collage[stockIds[0]].stock_id}-preview`}
                        onClick={() =>
                          changePic(data.collage[stockIds[0]].stock_id)
                        }
                        src={require(`../images/preview/${
                          data.collage[stockIds[0]].stock_id
                        }.jpg`)}
                      />
                    </li>
                  </button>
                </ul>
              </div>
            )}
            <p>Made from: {mainPic.made_from}</p>
            <p>Series: {mainPic.series_name}</p>
            {mainPic.price === -1 ? <></> : <p>Price: £{mainPic.price}</p>}
            {mainPic.self_ref === -1 ? (
              <></>
            ) : (
              <p>
                See also{" "}
                <Link to={`/art/${mainPic.self_ref}`}>{mainPic.self_ref}</Link>
              </p>
            )}
            <div className="art__quote_and_source">
              <p className="art__quote">"{mainPic.quote}"</p>
              <p className="art__quote_source">{mainPic.book_title}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}