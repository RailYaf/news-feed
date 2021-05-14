export const changeArchive = (id, content, flag, field) => {
  const news = [...content];
  let newNews = news.map((item) => {
    if (item.id == id) {
      return { ...item, [field]: flag };
    }
    return item;
  });
  return newNews;
};
