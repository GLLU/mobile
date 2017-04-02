import _ from 'lodash';
import { BODY_TYPE_CHANGE_SLIDING, BODY_TYPE_SHOW_MODAL, BODY_TYPE_HIDE_MODAL, GET_CURRENT_USER_BODY_TYPE } from '../actions/myBodyType';

// Data sample
const bodyTypeList = {
  female: [
    {
      name: 'Inverted triangle',
      body_type: 'invertedTriangle',
      description: 'Your defining attributes are hips that are narrower than the shoulders with a waist that is straight or goes slightly in.',
      imageUrl: require('../../images/INVERTED_TRIANGLE_blank.png'),
      imageOriUrl: require('../../images/INVERTED_TRIANGLE.png'),
      imageEditUrl: require('../../images/INVERTED_TRIANGLE_Edit.png'),
      shapeActive: require('../../images/INVERTED_TRIANGLE_green.png'),
      shapeDeactive: require('../../images/INVERTED_TRIANGLE_gray.png'),
    },
    {
      name: 'Lean Column',
      body_type: 'leanColumn',
      description: 'Your body build is characterized by narrow shoulders and hips with a relatively flat chest and bottom.',
      imageUrl: require('../../images/LEAN_COLUMN_blank.png'),
      imageOriUrl: require('../../images/LEAN_COLUMN.png'),
      imageEditUrl: require('../../images/LEAN_COLUMN_Edit.png'),
      shapeActive: require('../../images/LEAN_COLUMN_Shape_green.png'),
      shapeDeactive: require('../../images/LEAN_COLUMN_Shape_gray.png')
    },
    {
      name: 'Rectangle',
      body_type: 'rectangle',
      description: 'Also known as H or straight body shape due to the similar width of the shoulders, hips and waistline.',
      imageUrl: require('../../images/RECTANGLE_blank.png'),
      imageOriUrl: require('../../images/FULL_HOURGLASS_blank.png'),
      imageEditUrl: require('../../images/FULL_HOURGLASS.png'),
      shapeActive: require('../../images/RECTANGLE_Shape_green.png'),
      shapeDeactive: require('../../images/RECTANGLE_Shape_gray.png')
    },
    {
      name: 'Apple',
      body_type: 'apple',
      description: 'Your shoulders and hip line are about the same, and your waistline is the same or wider than your shoulders and hips.',
      imageUrl: require('../../images/APPLE_blank.png'),
      imageOriUrl: require('../../images/APPLE.png'),
      imageEditUrl: require('../../images/APPLE_Edit.png'),
      shapeActive: require('../../images/APPLE_Shape_green.png'),
      shapeDeactive: require('../../images/APPLE_Shape_gray.png')
    },
    {
      name: 'Pear',
      body_type: 'pear',
      description: 'Your body is defined by hips that are wider than shoulders, relatively defined waist, full hips or thighs, and bust and small upper body.',
      imageUrl: require('../../images/PEAR_blank.png'),
      imageOriUrl: require('../../images/PEAR.png'),
      imageEditUrl: require('../../images/PEAR_Edit.png'),
      shapeActive: require('../../images/PEAR_Shape_green.png'),
      shapeDeactive: require('../../images/PEAR_Shape_gray.png')
    },
    {
      name: 'Full Hourglass',
      body_type: 'fullHourGlass',
      description: 'Your bust may be large or small, but roughly the same size as your hips. Your waist is narrow and well defined.',
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
      body_type: 'trapezoid',
      description: 'Your chest and shoulders are relatively broad with a taper down to the waist. The legs are commonly lean or defined.',
      imageUrl: require('../../images/maleBodyTypes/bodies/trapezoid.png'),
      imageOriUrl: require('../../images/maleBodyTypes/bodies/dressed_trapezoid.png'),
      imageEditUrl: require('../../images/maleBodyTypes/bodies/trapezoid_e.png'),
      shapeActive: require('../../images/maleBodyTypes/shapes/trapezoid_grn.png'),
      shapeDeactive: require('../../images/maleBodyTypes/shapes/trapezoid_gry.png')
    },
    {
      name: 'Inverted Triangle',
      body_type: 'invertedTriangle',
      description: 'You have an athletic build with chest and shoulders that are noticeably broader than waist or hips.',
      imageUrl: require('../../images/maleBodyTypes/bodies/Invert.png'),
      imageOriUrl: require('../../images/maleBodyTypes/bodies/dressed_Invert.png'),
      imageEditUrl: require('../../images/maleBodyTypes/bodies/Invert_e.png'),
      shapeActive: require('../../images/maleBodyTypes/shapes/rev_triangle_grn.png'),
      shapeDeactive: require('../../images/maleBodyTypes/shapes/rev_triangle_gry.png')
    },
    {
      name: 'Rectangle',
      body_type: 'rectangle',
      description: 'Your shoulders are roughly the same width as your waist and hips. Chances are that you’re also tall and thin.',
      imageUrl: require('../../images/maleBodyTypes/bodies/rectangle.png'),
      imageOriUrl: require('../../images/maleBodyTypes/bodies/dressed_rectangle.png'),
      imageEditUrl: require('../../images/maleBodyTypes/bodies/rectangle_e.png'),
      shapeActive: require('../../images/maleBodyTypes/shapes/rec_grn.png'),
      shapeDeactive: require('../../images/maleBodyTypes/shapes/rec_gry.png')
    },
    {
      name: 'Triangle',
      body_type: 'triangle',
      description: 'Your midsection is more pronounced with a narrower top and larger waist and hips.',
      imageUrl: require('../../images/maleBodyTypes/bodies/triangle.png'),
      imageOriUrl: require('../../images/maleBodyTypes/bodies/dressed_triangle.png'),
      imageEditUrl: require('../../images/maleBodyTypes/bodies/triangle_e.png'),
      shapeActive: require('../../images/maleBodyTypes/shapes/triangle_grn.png'),
      shapeDeactive: require('../../images/maleBodyTypes/shapes/triangle_gry.png')
    },
    {
      name: 'Oval',
      body_type: 'oval',
      description: 'Your shoulders and lower legs look slimmer compared to your more rounded center of the body.',
      imageUrl: require('../../images/maleBodyTypes/bodies/oval.png'),
      imageOriUrl: require('../../images/maleBodyTypes/bodies/dressed_oval.png'),
      imageEditUrl: require('../../images/maleBodyTypes/bodies/oval_e.png'),
      shapeActive: require('../../images/maleBodyTypes/shapes/oval_grn.png'),
      shapeDeactive: require('../../images/maleBodyTypes/shapes/oval_gry.png')
    }
  ]
}

// Action Handlers
const ACTION_HANDLERS = {
  [BODY_TYPE_CHANGE_SLIDING]: (state, action) => {
    const currentItem = Object.assign({},bodyTypeList[action.payload.gender][action.payload.index]);
    return { ...state
      , currentBodyType: currentItem
      , currentIndex: action.payload.index
    }
  },
  [GET_CURRENT_USER_BODY_TYPE]: (state, action) => {
    const usersBodyType = _.find(bodyTypeList[action.payload.gender], {body_type: action.payload.bodyType});
    const currentItem = Object.assign({},usersBodyType);
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
