export default function formatTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
