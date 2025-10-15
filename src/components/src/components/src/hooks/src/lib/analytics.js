export const pushDL = (event, params = {}) => {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (window.fbq) window.fbq("trackCustom", event, params);
  } catch {}
};
