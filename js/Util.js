export default class Utils {
  static format_measurement(value, measurements_scale) {
    return `${this.format_number(value)} ${measurements_scale}`;
  }

  static format_number(value) {
    return Math.round(value * 100)/ 100;  
  }

  static createFlatLooksObj(looks) {
    let tempObj = {};
    let tempImgObj = {};
    let flatLooksArr = [];
    looks.map((look) => {
      tempObj = _.pick(look.attributes, ['user-id', 'likes', 'is-liked']);
      tempObj.liked = tempObj["is-liked"];
      tempObj.type = look.attributes["user-size"].body_type;
      tempObj.id = look.id;
      tempImgObj = _.pick(look.attributes.cover, ['width', 'height']);
      tempImgObj.uri = look.attributes.cover.image.medium.url;
      Object.assign(tempObj, tempImgObj);
      flatLooksArr.push(tempObj);
    });
    return flatLooksArr
  }

}