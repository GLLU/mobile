import { SET_USER_LOOKS_DATA } from '../actions/looks';

const initialState = {
  userLooksData: [],
  currId: -1
};

export default function (state:State = initialState, action): State {
  switch(action.type){
    case SET_USER_LOOKS_DATA:
        let userLooksData = action.payload.looks.map(look => {
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
            avatar: look.user.avatar,
            name: look.user.name,
            username: look.user.username,
            about_me: look.user.about_me,
            items: look.items,
          });
        });
        if(action.payload.currId === state.currId){
          userLooksData.unshift(...state.userLooksData)
        }
        return {
          ...state,
          userLooksData,
          currId: action.payload.currId
        };
    default:
      return state
  }
}