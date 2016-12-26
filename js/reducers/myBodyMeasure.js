// Data sample
var sizeList = [
  {
    name: 'XS',
    chest: '1 cm',
    waist: '1 cm',
    hips: '1 cm',
    height: '1 cm',
    select: false
  },
  {
    name: 'S',
    chest: '2 cm',
    waist: '2 cm',
    hips: '2 cm',
    height: '2 cm',
    select: false
  },
  {
    name: 'M',
    chest: '90 cm',
    waist: '60 cm',
    hips: '90 cm',
    height: '170 cm',
    select: true
  },
  {
    name: 'L',
    chest: '3 cm',
    waist: '3 cm',
    hips: '3 cm',
    height: '3 cm',
    select: false
  },
  {
    name: 'XL',
    chest: '4 cm',
    waist: '4 cm',
    hips: '4 cm',
    height: '4 cm',
    select: false
  }
];

var commonSizeTypes = ['chest','waist','hips', 'height'];

//  Constants
export const TOGGLE_CM_INCH = 'TOGGLE_CM_INCH'
export const TOGGLE_SIZE = 'TOGGLE_SIZE'
export const TOGGLE_EDIT_SIZE = 'TOGGLE_EDIT_SIZE'


// Actions
export function toggleCMInch(checked) {
  return {
    type: TOGGLE_CM_INCH,
    payload: {
      checked: checked
    }
  }
}

export function toggleSize(sizeType) {
  return {
    type: TOGGLE_SIZE,
    payload: {
      sizeType: sizeType
    }
  }
}

export function toggleEditSize(isEdit, sizeType, sizeInitValue) {
  return {
    type: TOGGLE_EDIT_SIZE,
    payload: {
      isEdit: isEdit,
      typeEdit: sizeType,
      sizeInitValue: sizeInitValue
    }
  }
}

function _convertCmAndInc(obj, isCheck) {
  commonSizeTypes.map((sizeType) => {
    var value = obj[sizeType].split(' ')[0];
    var type = obj[sizeType].split(' ')[1];
    if(isCheck && type === 'cm') {
      obj[sizeType] = Math.round((value / 2.54) * 100)/100 + ' inch';
    }
    if(!isCheck && type === 'inch') {
      obj[sizeType] = Math.round((value * 2.54) * 100)/100 + ' cm';
    }
  });
  return obj;
}

export const actions = {
  toggleCMInch,
  toggleSize,
  toggleEditSize
}

// Action Handlers
const ACTION_HANDLERS = {
  [TOGGLE_CM_INCH]: (state, action) => {
    const isCheck = action.payload.checked
    var sizeResult = state.current;
    _convertCmAndInc(sizeResult,isCheck);
    return ({ ...state, isInchSelect: isCheck , current: sizeResult})
  },
  [TOGGLE_SIZE]: (state, action) => {
    return ({ ...state, sizeList: state.sizeList.map((item) => {
        item.select = false;
        if(item.name === action.payload.sizeType) {
          item.select = true;
          const isCheck = state.isInchSelect;
          _convertCmAndInc(item,isCheck);
          state.current = Object.assign({}, item);
        }
        return item;
      })
    })
  },
  [TOGGLE_EDIT_SIZE]: (state, action) => {
   return ({ ...state, isEdit: action.payload.isEdit, typeEdit: action.payload.typeEdit, sizeInitValue: action.payload.sizeInitValue})
  }
}

// Reducer
const initialState = {
  sizeList: sizeList,
  sizeTypes: commonSizeTypes,
  isInchSelect: false,
  isEdit: false,
  typeEdit: null,
  current: Object.assign({}, sizeList[2]),
  sizeInitValue: 0
}

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
