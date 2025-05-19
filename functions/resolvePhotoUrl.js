// functions/resolvePhotoUrl.js
const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.resolvePhotoUrl = functions.https.onCall(async (data, context) => {
  const {photoServiceUrl} = data;
  if (typeof photoServiceUrl !== "string") {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "photoServiceUrl must be a string URL",
    );
  }
  try {
    const response = await fetch(photoServiceUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    return {directUrl: response.url};
  } catch (error) {
    console.error("Error resolving PhotoService URL:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Failed to resolve PhotoService URL",
    );
  }
});

