

export function generateFeedData(feedLooksIds: array, flatLooksData: object) {
  return _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    look.originalIndex = index;
    return look;
  });
}

export function unifyLooks(look, stateLooksData) {
  console.log('lookdd',look)
  const lookId = look.id
  console.log('lookId',lookId)
  const flatLooksData = { ...stateLooksData, [lookId]: look };
  console.log('lookdd',flatLooksData)
  return flatLooksData;
}