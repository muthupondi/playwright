function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  process.env.timestamp=`${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  return process.env.timestamp;
}
  module.exports = {
    getTimestamp
  };