import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSeries } from "../api";

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

  console.log(data)
}
