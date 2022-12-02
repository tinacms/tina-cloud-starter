const handler = (req, res) => {
  res.clearPreviewData();
  res.redirect(req.query.slug);
};

export default handler;
