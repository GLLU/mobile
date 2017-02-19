import { SET_USER_LOOKS_DATA } from '../actions/looks';

const initialState = {
  userLooksData: {},
};

export default function (state:State = initialState, action): State {
  switch(action.type){
    case SET_USER_LOOKS_DATA:

      console.log('payload',action.payload);
        let userLooksData = action.payload.map(look => {
          const cover = _.find(look.cover, x => x.version == 'medium');
          return Object.assign({}, {
            liked: look.is_liked,
            type: look.user_size.body_type,
            id: look.id,
            likes: look.likes,
            user_id: look.user_id,
            uri: cover ? cover.url : null,
            width: cover ? cover.width : null,
            height: cover ? cover.height : null,
          });
        });
      console.log('user',userLooksData)
      //userLooksData = Object.assign(state.userLooksData, userLooksData);
      userLooksData.concat(state.userLooksData)
      console.log('...state',state.userLooksData)
      console.log('userLooksData',userLooksData)
        return {
          ...state,
          userLooksData,
        }

    default:
      return state
  }
}