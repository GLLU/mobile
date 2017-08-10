import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';


class UploadLookService {
  static createLook = body => AppAPI.post('/looks', {id: -1}).then((data => {
    console.log('new look data',data)
    return data
  }))
  }

export default UploadLookService;
