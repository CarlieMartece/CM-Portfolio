import axios from "axios";
const api = axios.create({
  baseURL: "https://artist-author-autist.onrender.com/api",
});

export const fetchArt = (year, category) => {
  // console.log(`year is ${year}`)
  // console.log(`category is ${category}`)
  return api.get(`/art`, { params: { year: year, category: category } })
    .then((res) => {
      return res.data;
    })
};

export const fetchArtByColour = (colour) => {
  return api.get(`/art`, { params: { colour: colour } })
  .then((res) => {
    return res.data;
  })
};

export const fetchArtSingle = (art_id, idExtra) => {
  return api.get(`/art/${art_id}`, { params: { extra: idExtra } })
  .then((res) => {
    return res.data;
  });
};

export const fetchArtCollage = (three_word_description) => {
  return api.get(`/art/collage/${three_word_description}`)
  .then((res) => {
    return res.data;
  });
};

export const fetchBooks = () => {
  return api.get(`/books`).then((res) => {
    return res.data;
  });
};

export const fetchBookSingle = (book_id) => {
  return api.get(`/books/${book_id}`).then((res) => {
    return res.data;
  });
};

export const fetchProjects = () => {
  return api.get(`/code`).then((res) => {
    return res.data;
  });
};

export const fetchProjectSingle = (project_id) => {
  return api.get(`/code/${project_id}`).then((res) => {
    return res.data;
  });
};

export const fetchSeries = (series_id) => {
  return api.get(`/series/${series_id}`).then((res) => {
    return res.data;
  });
};