export const DEFAULT_PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
];

export function getDefaultPropertyImage() {
  return DEFAULT_PROPERTY_IMAGES[
    Math.floor(Math.random() * DEFAULT_PROPERTY_IMAGES.length)
  ];
}

export function getPropertyImage(coverImageUrl) {
  return coverImageUrl || DEFAULT_PROPERTY_IMAGES[0];
}
