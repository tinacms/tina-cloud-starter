import { isUserAuthorized } from "@tinacms/auth";

const handler = async (req, res) => {
  if (process.env.IS_LOCAL === "true") {
    // Enter preview mode in local development
    res.setPreviewData({});
    return res.redirect(req.query.slug);
  }

  // Check tina cloud token
  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${req.query.token}`,
    clientID: process.env.TINA_CLIENT_ID,
  });

  if (isAuthorizedRes) {
    res.setPreviewData({});
    return res.redirect(req.query.slug);
  }

  return res.status(401).json({ message: "Invalid token" });
};

export default handler;
