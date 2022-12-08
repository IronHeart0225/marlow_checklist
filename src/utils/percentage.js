export const getPercentage = (cur, total) => {
  if (total === 0) {
    return 0;
  }
  return (cur / total * 100).toFixed(0);
}
