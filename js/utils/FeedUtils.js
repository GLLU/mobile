

export function generateFeedData(feedLooksIds: array, flatLooksData: object) {
  return _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    look.originalIndex = index;
    return look;
  });
}

export function unifyLooks(look, stateLooksData) {
  console.log('lookdd',look)
  const lookId = `${look.id}`
  console.log('stateLooksData',stateLooksData)
  const tempObj = {[lookId]: look}
  console.log('boom',tempObj)
  const flatLooksData = { ...stateLooksData, [`${look.id}`]: look };
  console.log('lookdd12',flatLooksData)
  return flatLooksData;
}