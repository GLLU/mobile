import { SET_USER_LOOKS_DATA, SET_USER_LOOKS } from '../actions/looks';

const initialState = {
  userLooksData: [],
  currId: -1,
  name: '',
  looksCount: -1,
  isMyProfile: true
};

export default function (state:State = initialState, action): State {
  switch(action.type){
    case SET_USER_LOOKS:
        let userLooksData = action.payload.looks.map(look => {
          let cover;
          if(look.cover.type === 'video') {
            cover = _.find(look.cover.list, x => x.version == 'large_720');
            console.log('coverr',cover)
          } else {
            cover = _.find(look.cover.list, x => x.version == 'medium');
          }
          return Object.assign({}, {
            liked: look.is_liked,
            type: look.user_size.body_type,
            id: look.id,
            likes: look.likes,
            user_id: look.user_id,
            uri: cover ? null : null,
            width: cover ? cover.width : null,
            height: cover ? cover.height : null,
            avatar: look.user.avatar,
            name: look.user.name,
            username: look.user.username,
            about_me: look.user.about_me,
            items: look.items,
            state: look.state,
          });
        });
        if(action.payload.currId === state.currId){
          userLooksData.unshift(...state.userLooksData)
        }
        return {
          ...state,
          userLooksData,
          currId: action.payload.currId,
          name: state.name,
          looksCount: state.looksCount,
          isMyProfile: state.isMyProfile,
        };
    case SET_USER_LOOKS_DATA:
      return {
        ...state,
        name: action.payload.name,
        looksCount: action.payload.looksCount,
        isMyProfile: action.payload.isMyProfile,
      };
    default:
      return state
  }
}