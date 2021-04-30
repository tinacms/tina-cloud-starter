export default function handler(req, res) {
  const isPreview = req.preview;

  if (isPreview) {
    res.clearPreviewData();
  } else {
    res.setPreviewData({});
  }
  res.redirect("/");
}
