export default function compare(a, b) {
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}