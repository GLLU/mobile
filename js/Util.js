export default class Utils {
  static format_measurement(value, measurements_scale) {
    return `${this.format_number(value)} ${measurements_scale}`;
  }

  static format_number(value) {
    return Math.round(value * 100)/ 100;  
  }

  static sortDataFromJsonApi(lookFor,obj1,obj2) {
    const relationshipIdsArray = [];
    let tempObj = {}
    obj1.data.map((mainItem) => {
      tempObj = {mainItemId: mainItem.id}
      if(mainItem.relationships[lookFor]) {
        mainItem.relationships[lookFor].data.map((relatedObj) => {
          obj2.data.map((subItem, index) => {
            if(relatedObj.id === subItem.id) {
              tempObj[index] = subItem.attributes
            }
          })
        });
        relationshipIdsArray.push(tempObj);

      } else {
        console.log('data doesnt exist for:'+lookFor)
      }

    });
    return relationshipIdsArray;
  }
}