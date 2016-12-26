// Data sample
var bodyTypeList = {
  female: [
    {
      name: 'Triangle',
      uniqueName: 'triangle',
      description: 'Triangle womens hip measurements are greater than their bust measurements.',
      imageUrl: require('../../images/INVERTED_TRIANGLE_blank.png'),
      imageOriUrl: require('../../images/INVERTED_TRIANGLE.png'),
      imageEditUrl: require('../../images/INVERTED_TRIANGLE_Edit.png'),
      shapeActive: require('../../images/INVERTED_TRIANGLE_green.png'),
      shapeDeactive: require('../../images/INVERTED_TRIANGLE_gray.png'),
    },
    {
      name: 'Lean Column',
      uniqueName: 'leanColumn',
      description: 'your waist measurement is less than 9 inches smaller than the hip.',
      imageUrl: require('../../images/LEAN_COLUMN_blank.png'),
      imageOriUrl: require('../../images/LEAN_COLUMN.png'),
      imageEditUrl: require('../../images/LEAN_COLUMN_Edit.png'),
      shapeActive: require('../../images/LEAN_COLUMN_Shape_green.png'),
      shapeDeactive: require('../../images/LEAN_COLUMN_Shape_gray.png')
    },
    {
      name: 'Rectangle',
      uniqueName: 'rectangle',
      description: 'your waist measurement is less than 9 inches smaller than the hip.',
      imageUrl: require('../../images/RECTANGLE_blank.png'),
      imageOriUrl: require('../../images/FULL_HOURGLASS_blank.png'),
      imageEditUrl: require('../../images/FULL_HOURGLASS.png'),
      shapeActive: require('../../images/RECTANGLE_Shape_green.png'),
      shapeDeactive: require('../../images/RECTANGLE_Shape_gray.png')
    },
    {
      name: 'Apple',
      uniqueName: 'apple',
      description: 'Apple-shaped women have broader shoulders and bust, and narrower hips.',
      imageUrl: require('../../images/APPLE_blank.png'),
      imageOriUrl: require('../../images/APPLE.png'),
      imageEditUrl: require('../../images/APPLE_Edit.png'),
      shapeActive: require('../../images/APPLE_Shape_green.png'),
      shapeDeactive: require('../../images/APPLE_Shape_gray.png')
    },
    {
      name: 'Pear',
      uniqueName: 'pear',
      description: 'Pear-shaped womens hip measurements are greater than their bust measurements.',
      imageUrl: require('../../images/PEAR_blank.png'),
      imageOriUrl: require('../../images/PEAR.png'),
      imageEditUrl: require('../../images/PEAR_Edit.png'),
      shapeActive: require('../../images/PEAR_Shape_green.png'),
      shapeDeactive: require('../../images/PEAR_Shape_gray.png')
    },
    {
      name: 'Neat Hourglass',
      uniqueName: 'neatHourGlass',
      description: 'You are neat hourglass if you are under a size 10 (i.e, a size 8 and smaller)',
      imageUrl: require('../../images/NEAT_HOURGLASS_blank.png'),
      imageOriUrl: require('../../images/NEAT_HOURGLASS.png'),
      imageEditUrl: require('../../images/NEAT_HOURGLASS_Edit.png'),
      shapeActive: require('../../images/NEAT_HOURGLASS_Shape_green.png'),
      shapeDeactive: require('../../images/NEAT_HOURGLASS_Shape_gray.png')
    },
    {
      name: 'Full Hourglass',
      uniqueName: 'fullHourGlass',
      description: 'You are neat hourglass if you are under a size 10 (i.e, a size 8 and smaller)',
      imageUrl: require('../../images/FULL_HOURGLASS_blank.png'),
      imageOriUrl: require('../../images/FULL_HOURGLASS.png'),
      imageEditUrl: require('../../images/FULL_HOURGLASS_Edit.png'),
      shapeActive: require('../../images/FULL_HOURGLASS_Shape_green.png'),
      shapeDeactive: require('../../images/FULL_HOURGLASS_Shape_gray.png')
    }
  ],
  male: [
    {
      name: 'trapezoid',
      uniqueName: 'trapezoid',
      description: 'Triangle womens hip measurements are greater than their bust measurements.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Inverted Triangle',
      uniqueName: 'invertedTriangle',
      description: 'The Lean Column is a very alluring body shape and is often thought of as a youthful and athletic build.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Ractangle',
      uniqueName: 'ractangle',
      description: 'your waist measurement is less than 9 inches smaller than the hip.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Triangle',
      uniqueName: 'triangle',
      description: 'Apple-shaped women have broader shoulders and bust, and narrower hips.',
      imageUrl: require('../../images/neathourglass.png')
    },
    {
      name: 'Oval',
      uniqueName: 'oval',
      description: 'Pear-shaped womens hip measurements are greater than their bust measurements.',
      imageUrl: require('../../images/neathourglass.png')
    }
  ]
}

//  Constants
export const BODY_TYPE_CHANGE_SLIDING = 'BODY_TYPE_CHANGE_SLIDING'

// Actions
export function changeBodyType(index) {
  return {
    type: BODY_TYPE_CHANGE_SLIDING,
    payload: {
      selectedIndex: index
    }
  }
}

export const actions = {
  changeBodyType
}

// Action Handlers
const ACTION_HANDLERS = {
  [BODY_TYPE_CHANGE_SLIDING]: (state, action) => {
    let currentItem = Object.assign({},bodyTypeList[state.gender][action.payload.selectedIndex]);
    return ({ ...state
      , currentBodyType: currentItem
      , currentIndex: action.payload.selectedIndex})
  }
}

// Reducer
const initialState = {
  gender: 'female',
  bodyTypes: bodyTypeList,
  currentBodyType:  Object.assign({},bodyTypeList['female'][3]),
  currentIndex: 3
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
