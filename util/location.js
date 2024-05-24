// Google Maps helper functions

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

// generate a URL for a static Google Maps image
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Alabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
}
