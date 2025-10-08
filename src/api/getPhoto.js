/** 사진 URL 생성기 */
const photoURL = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/200`;

export const getMyAwesomePic = (seed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(photoURL(seed)), 1500);
  });
};
