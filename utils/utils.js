const getSongQuerySearch = (queryParameter) => {
  let { filter } = queryParameter ? queryParameter : null;
  filter = filter ? JSON.parse(filter) : null;
  const moodQuery = filter?.mood ? { mood: { $eq: filter?.mood } } : {};
  const titleQuery = filter?.title
    ? { title: { $regex: new RegExp(filter?.title), $options: "i" } }
    : {};

  const query = { ...moodQuery, ...titleQuery };
  return query;
};
module.exports = { getSongQuerySearch };
