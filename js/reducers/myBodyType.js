// Data sample
var bodyTypeList = [
  {
    name: 'Pear',
    description: 'Pear-shaped womens hip measurements are greater than their bust measurements.',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Triangle',
    description: 'Triangle womens hip measurements are greater than their bust measurements.',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Banana (Reactangle)',
    description: 'your waist measurement is less than 9 inches smaller than the hip.',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Apple (Inverted Triangle)',
    description: 'Apple-shaped women have broader shoulders and bust, and narrower hips.',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Neat Hourglass',
    description: 'You are neat hourglass if you are under a size 10 (i.e, a size 8 and smaller)',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Round',
    description: 'round',
    imageUrl: require('../../images/neathourglass.png')
  },
  {
    name: 'Diamond',
    description: 'diamond',
    imageUrl: require('../../images/neathourglass.png')
  }
]

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
    let currentItem = Object.assign({},bodyTypeList[action.payload.selectedIndex]);
    return ({ ...state
      , currentBodyType: currentItem
      , currentIndex: action.payload.selectedIndex})
  }
}

// Reducer
const initialState = {
  bodyTypes: bodyTypeList,
  currentBodyType:  Object.assign({},bodyTypeList[3]),
  currentIndex: 3
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
