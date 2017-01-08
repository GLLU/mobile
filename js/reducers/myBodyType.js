import { BODY_TYPE_CHANGE_SLIDING, BODY_TYPE_SHOW_MODAL, BODY_TYPE_HIDE_MODAL } from '../actions/myBodyType';

// Data sample
const bodyTypeList = {
  female: [
    {
      name: 'Inverted triangle',
      uniqueName: 'invertedTriangle',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/INVERTED_TRIANGLE_blank.png'),
      imageOriUrl: require('../../images/INVERTED_TRIANGLE.png'),
      imageEditUrl: require('../../images/INVERTED_TRIANGLE_Edit.png'),
      shapeActive: require('../../images/INVERTED_TRIANGLE_green.png'),
      shapeDeactive: require('../../images/INVERTED_TRIANGLE_gray.png'),
    },
    {
      name: 'Lean Column',
      uniqueName: 'leanColumn',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/LEAN_COLUMN_blank.png'),
      imageOriUrl: require('../../images/LEAN_COLUMN.png'),
      imageEditUrl: require('../../images/LEAN_COLUMN_Edit.png'),
      shapeActive: require('../../images/LEAN_COLUMN_Shape_green.png'),
      shapeDeactive: require('../../images/LEAN_COLUMN_Shape_gray.png')
    },
    {
      name: 'Rectangle',
      uniqueName: 'rectangle',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/RECTANGLE_blank.png'),
      imageOriUrl: require('../../images/FULL_HOURGLASS_blank.png'),
      imageEditUrl: require('../../images/FULL_HOURGLASS.png'),
      shapeActive: require('../../images/RECTANGLE_Shape_green.png'),
      shapeDeactive: require('../../images/RECTANGLE_Shape_gray.png')
    },
    {
      name: 'Apple',
      uniqueName: 'apple',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/APPLE_blank.png'),
      imageOriUrl: require('../../images/APPLE.png'),
      imageEditUrl: require('../../images/APPLE_Edit.png'),
      shapeActive: require('../../images/APPLE_Shape_green.png'),
      shapeDeactive: require('../../images/APPLE_Shape_gray.png')
    },
    {
      name: 'Pear',
      uniqueName: 'pear',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/PEAR_blank.png'),
      imageOriUrl: require('../../images/PEAR.png'),
      imageEditUrl: require('../../images/PEAR_Edit.png'),
      shapeActive: require('../../images/PEAR_Shape_green.png'),
      shapeDeactive: require('../../images/PEAR_Shape_gray.png')
    },
    {
      name: 'Full Hourglass',
      uniqueName: 'fullHourGlass',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/FULL_HOURGLASS_blank.png'),
      imageOriUrl: require('../../images/FULL_HOURGLASS.png'),
      imageEditUrl: require('../../images/FULL_HOURGLASS_Edit.png'),
      shapeActive: require('../../images/FULL_HOURGLASS_Shape_green.png'),
      shapeDeactive: require('../../images/FULL_HOURGLASS_Shape_gray.png')
    }
  ],
  male: [
    {
      name: 'Trapezoid',
      uniqueName: 'trapezoid',
      description: 'Your chest and shoulders are relatively broad with a taper down to the waist. The legs are commonly lean or defined.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Inverted Triangle',
      uniqueName: 'invertedTriangle',
      description: 'You have an athletic build with chest and shoulders that are noticeably broader than waist or hips.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Ractangle',
      uniqueName: 'ractangle',
      description: 'Your shoulders are roughly the same width as your waist and hips. Chances are that you’re also tall and thin.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Triangle',
      uniqueName: 'triangle',
      description: 'Your midsection is more pronounced with a narrower top and larger waist and hips.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Oval',
      uniqueName: 'oval',
      description: 'Your shoulders and lower legs look slimmer compared to your more rounded center of the body.',
      imageUrl: require('../../images/neathourglass.png')
    }
  ]
}

// Action Handlers
const ACTION_HANDLERS = {
  [BODY_TYPE_CHANGE_SLIDING]: (state, action) => {
    const currentItem = Object.assign({},bodyTypeList[state.gender][action.payload.selectedIndex]);
    return { ...state
      , currentBodyType: currentItem
      , currentIndex: action.payload.selectedIndex
    }
  },
  [BODY_TYPE_SHOW_MODAL]: (state, action) => {
    return {
      ...state,
      modalShowing: true
    }
  },
  [BODY_TYPE_HIDE_MODAL]: (state, action) => {
    return {
      ...state,
      modalShowing: false
    }
  }
}

// Reducer
const initialState = {
  gender: 'female',
  modalShowing: false,
  bodyTypes: bodyTypeList,
  currentBodyType:  Object.assign({},bodyTypeList['female'][3]),
  currentIndex: 3
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
