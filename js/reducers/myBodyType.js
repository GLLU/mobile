import _ from 'lodash';
import { BODY_TYPE_CHANGE_SLIDING, BODY_TYPE_SHOW_MODAL, BODY_TYPE_HIDE_MODAL, GET_CURRENT_USER_BODY_TYPE } from '../actions/myBodyType';

// Data sample
const bodyTypeList = {
  female: [
    {
      name: 'Inverted triangle',
      body_type: 'invertedTriangle',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/bodytypes/female/inverted-triangle.png'),
      filterImageUrlActive: require('../../images/filters/body-types/female-inverted-triangle-active.png'),
      filterImageUrl: require('../../images/filters/body-types/female-inverted-triangle.png')
    },
    {
      name: 'Rectangle',
      body_type: 'rectangle',
      description: 'Also known as H or straight body shape due to the similar width of the shoulders, hips and waistline.',
      imageUrl: require('../../images/bodytypes/female/rectangle.png'),
      filterImageUrlActive: require('../../images/filters/body-types/female-rectangle-active.png'),
      filterImageUrl: require('../../images/filters/body-types/female-rectangle.png')
    },
    {
      name: 'Apple',
      body_type: 'apple',
      description: 'Your shoulders and hip line are about the same, and your waistline is the same or wider than your shoulders and hips.',
      imageUrl: require('../../images/bodytypes/female/apple.png'),
      filterImageUrlActive: require('../../images/filters/body-types/female-apple-active.png'),
      filterImageUrl: require('../../images/filters/body-types/female-apple.png')
    },
    {
      name: 'Pear',
      body_type: 'pear',
      description: 'Your body is defined by hips that are wider than shoulders, relatively defined waist, full hips or thighs, and bust and small upper body.',
      imageUrl: require('../../images/bodytypes/female/pear.png'),
      filterImageUrlActive: require('../../images/filters/body-types/female-pear-active.png'),
      filterImageUrl: require('../../images/filters/body-types/female-pear.png')
    },
    {
      name: 'Hourglass',
      body_type: 'יhourglass',
      description: 'Your bust may be large or small, but roughly the same size as your hips. Your waist is narrow and well defined.',
      imageUrl: require('../../images/bodytypes/female/hourglass.png'),
      filterImageUrlActive: require('../../images/filters/body-types/female-hourglass-active.png'),
      filterImageUrl: require('../../images/filters/body-types/female-hourglass.png')
    }
  ],
  male: [
    {
      name: 'Inverted Triangle',
      body_type: 'invertedTriangle',
      description: 'You have an athletic build with chest and shoulders that are noticeably broader than waist or hips.',
      imageUrl: require('../../images/bodytypes/male/invert.png'),
      filterImageUrlActive: require('../../images/filters/body-types/male-inverted-triangle-active.png'),
      filterImageUrl: require('../../images/filters/body-types/male-inverted-triangle.png')
    },
    {
      name: 'Rectangle',
      body_type: 'rectangle',
      description: 'Your shoulders are roughly the same width as your waist and hips. Chances are that you’re also tall and thin.',
      imageUrl: require('../../images/bodytypes/male/rectangle.png'),
      filterImageUrlActive: require('../../images/filters/body-types/male-rectangle-active.png'),
      filterImageUrl: require('../../images/filters/body-types/male-rectangle.png')
    },
    {
      name: 'Triangle',
      body_type: 'triangle',
      description: 'Your midsection is more pronounced with a narrower top and larger waist and hips.',
      imageUrl: require('../../images/bodytypes/male/triangle.png'),
      filterImageUrlActive: require('../../images/filters/body-types/male-triangle-active.png'),
      filterImageUrl: require('../../images/filters/body-types/male-triangle.png')
    },
    {
      name: 'Oval',
      body_type: 'oval',
      description: 'Your shoulders and lower legs look slimmer compared to your more rounded center of the body.',
      imageUrl: require('../../images/bodytypes/male/oval.png'),
      filterImageUrlActive: require('../../images/filters/body-types/male-oval-active.png'),
      filterImageUrl: require('../../images/filters/body-types/male-oval.png')
    }
  ]
};

const initialState = {
  gender: 'female',
  modalShowing: false,
  bodyTypes: bodyTypeList,
  currentBodyType:  Object.assign({},bodyTypeList['female'][2]),
  currentIndex: 2
}

// Action Handlers
const ACTION_HANDLERS = {
  [BODY_TYPE_CHANGE_SLIDING]: (state, action) => {
    const bodyTypesOfMyGender=bodyTypeList[action.payload.gender];
    const pickedBodyType=bodyTypesOfMyGender[action.payload.index];
    return { ...state
      , currentBodyType: pickedBodyType
      , currentIndex: action.payload.index
    }
  },
  [GET_CURRENT_USER_BODY_TYPE]: (state, action) => {
    const bodyTypesOfMyGender=bodyTypeList[action.payload.gender];
    const userBodyType=_.find(bodyTypesOfMyGender, {body_type: action.payload.bodyType});
    return { ...state
      , currentBodyType: userBodyType
      , currentIndex: action.payload.selectedIndex
    }
  },
  [BODY_TYPE_SHOW_MODAL]: (state) => {
    return {
      ...state,
      modalShowing: true
    }
  },
  [BODY_TYPE_HIDE_MODAL]: (state) => {
    return {
      ...state,
      modalShowing: false
    }
  }
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
