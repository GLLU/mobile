import { SET_USER_DATA, SET_USER_LOOKS_DATA, SET_USER_LOOKS } from '../actions/profile';

const initialState = {
  userId: -1,
  userLooksData: [],
  currId: -1,
  name: '',
  looksCount: -1,
  isMyProfile: true,
  user: {
    id: -1,
    name: '',
  },
  meta: {
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
    total_count: 1,
  },
  query: {
    type: 'relevant',
    category: null,
    term: '',
    all: true,
    page: {
      size: 10,
      number: 1
    }
  },
};

export default function (state:State = initialState, action): State {
  switch(action.type){
    case SET_USER_DATA:
      console.log('reducer SET_USER_DATA', action.payload)
      return {
        ...state,
        user: action.payload.user,
      };
    case SET_USER_LOOKS:
        console.log('action payload', action.payload);
        const meta = _.merge(state.meta, action.payload.data.meta);
        let userLooksData = action.payload.data.looks.map(look => {
          let cover;
          if(look.cover.type === 'video') {
            cover = _.find(look.cover.list, x => x.version == 'large_720');
          } else {
            cover = _.find(look.cover.list, x => x.version == 'medium');
          }
          return Object.assign({}, {
            liked: look.is_liked,
            type: look.user_size.body_type,
            id: look.id,
            likes: look.likes,
            user_id: look.user_id,
            uri: cover.url ? cover.url : null,
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
        if (meta.current_page > 1) {
          userLooksData.unshift(...state.userLooksData)
        }
        return {
          ...state,
          meta,
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