export const getPercentage = (cur, total) => {
  if (total === 0) {
    return 0;
  }
  return Math.round((cur / total * 100));
}
