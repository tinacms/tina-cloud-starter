// Helper functions to detect editing mode and environment

const checkReferer = (request: Request): boolean => {
  // Check if the page load was referred from the TinaCMS interface
  const referer = request.headers.get("referer");
  if (referer && (referer.includes("/admin/") || referer.endsWith("/admin"))) {
    return true;
  }
  return false;
};

const isIframe = (request: Request): boolean => {
  // Check if the request is destined for an iframe
  // (this header is present in modern browsers)
  const secFetchDest = request.headers.get("sec-fetch-dest");
  if (secFetchDest === "iframe") {
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (secFetchSite === "same-origin" || secFetchSite === "same-site") {
      return true;
    }
  }
  return false;
};

/**
 * Determines if the current request is coming from Tina's visual editor
 */
export function isEditingMode(request: Request): boolean {
  const referredFromTina = checkReferer(request);
  const isTinaIframe = isIframe(request);
  return referredFromTina && isTinaIframe;
}
