// Data sample
var sizeList = {
  female: {
    triangle: [
      {
        name: 'XS',
        chest: '82 cm', waist: '62 cm', hips: '87 cm', height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '88 cm', waist: '68 cm', hips: '93 cm', height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '94 cm', waist: '74 cm', hips: '99 cm', height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '101 cm', waist: '80 cm', hips: '105 cm', height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109 cm', waist: '87 cm', hips: '112 cm', height: '170 cm',
        select: false
      }
    ],
    leanColumn: [
      {
        name: 'XS',
        chest: '78 cm', waist: '63 cm', hips: '86 cm', height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '84 cm', waist: '69 cm', hips: '92 cm', height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '90 cm', waist: '75 cm', hips: '98 cm', height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '96 cm', waist: '81 cm', hips: '104 cm', height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '103 cm', waist: '88 cm', hips: '111 cm', height: '170 cm',
        select: false
      }
    ],
    rectangle: [
      {
        name: 'XS',
        chest: '82 cm', waist: '66 cm', hips: '86 cm', height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '88 cm', waist: '72 cm', hips: '92 cm', height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '94 cm', waist: '78 cm', hips: '98 cm', height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '101 cm', waist: '85 cm', hips: '104 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109 cm', waist: '94 cm', hips: '111 cm',height: '170 cm',
        select: false
      }
    ],
    apple: [
      {
        name: 'XS',
        chest: '82 cm', waist: '82 cm', hips: '86 cm',height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '88 cm', waist: '88 cm', hips: '92 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '94 cm', waist: '94 cm', hips: '98 cm', height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '101 cm', waist: '101 cm', hips: '104 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109 cm', waist: '109 cm', hips: '111 cm',height: '170 cm',
        select: false
      }
    ],
    pear: [
      {
        name: 'XS',
        chest: '77 cm', waist: '66 cm', hips: '90 cm',height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '83 cm', waist: '72 cm', hips: '96 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '89 cm', waist: '78 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '95 cm', waist: '85 cm', hips: '109 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '102 cm', waist: '94 cm', hips: '116 cm',height: '170 cm',
        select: false
      }
    ],
    neatHourGlass: [
      {
        name: 'XS',
        chest: '82 cm', waist: '61 cm', hips: '90 cm',height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '88 cm', waist: '67 cm', hips: '92 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '94 cm', waist: '73 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '101 cm', waist: '79 cm', hips: '109 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109 cm', waist: '86 cm', hips: '116 cm',height: '170 cm',
        select: false
      }
    ],
    fullHourGlass: [
      {
        name: 'XS',
        chest: '82 cm', waist: '61 cm', hips: '90 cm',height: '170 cm',
        select: false
      },
      {
        name: 'S',
        chest: '88 cm', waist: '67 cm', hips: '92 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '94 cm', waist: '73 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'L',
        chest: '101 cm', waist: '79 cm', hips: '109 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109 cm', waist: '86 cm', hips: '116 cm',height: '170 cm',
        select: false
      }
    ]
  },
  male: {
    trapezoid: [
      {
        name: 'S',
        chest: '93 cm', waist: '77 cm', hips: '87 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '101 cm', waist: '84 cm', hips: '94 cm',height: '170 cm',
        select: false
      },
      {
        name: 'L',
        chest: '110 cm', waist: '92 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'XL',
        chest: '120 cm', waist: '101 cm', hips: '111 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '131 cm', waist: '111 cm', hips: '120 cm',height: '170 cm',
        select: false
      }
    ],
    invertedTriangle: [
      {
        name: 'S',
        chest: '94 cm', waist: '76 cm', hips: '87 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '102 cm', waist: '83 cm', hips: '94 cm',height: '170 cm',
        select: false
      },
      {
        name: 'L',
        chest: '111 cm', waist: '91 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121 cm', waist: '100 cm', hips: '111 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132 cm', waist: '110 cm', hips: '120 cm',height: '170 cm',
        select: false
      }
    ],
    ractangle: [
      {
        name: 'S',
        chest: '94 cm', waist: '76 cm', hips: '87 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '102 cm', waist: '83 cm', hips: '94 cm',height: '170 cm',
        select: false
      },
      {
        name: 'L',
        chest: '111 cm', waist: '91 cm', hips: '102 cm',height: '170 cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121 cm', waist: '100 cm', hips: '111 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132 cm', waist: '110 cm', hips: '120 cm',height: '170 cm',
        select: false
      }
    ],
    triangle: [
      {
        name: 'S',
        chest: '88 cm', waist: '81 cm', hips: '93 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '95 cm', waist: '89 cm', hips: '101 cm',height: '170 cm',
        select: false
      },
      {
        name: 'L',
        chest: '103 cm', waist: '93 cm', hips: '110 cm',height: '170 cm',
        select: true
      },
      {
        name: 'XL',
        chest: '112 cm', waist: '101 cm', hips: '119 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '122 cm', waist: '111 cm', hips: '128 cm',height: '170 cm',
        select: false
      }
    ],
    oval: [
      {
        name: 'S',
        chest: '91 cm', waist: '81 cm', hips: '93 cm',height: '170 cm',
        select: false
      },
      {
        name: 'M',
        chest: '101 cm', waist: '89 cm', hips: '101 cm',height: '170 cm',
        select: false
      },
      {
        name: 'L',
        chest: '109 cm', waist: '93 cm', hips: '110 cm',height: '170 cm',
        select: true
      },
      {
        name: 'XL',
        chest: '118 cm', waist: '101 cm', hips: '119 cm',height: '170 cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '130 cm', waist: '111 cm', hips: '128 cm',height: '170 cm',
        select: false
      }
    ]
  }
};

var commonSizeTypes = ['chest','waist','hips', 'height'];

//  Constants
export const TOGGLE_CM_INCH = 'TOGGLE_CM_INCH'
export const TOGGLE_SIZE = 'TOGGLE_SIZE'
export const TOGGLE_EDIT_SIZE = 'TOGGLE_EDIT_SIZE'
export const INITIAL_MYBODY_MEASURE = 'INITIAL_MYBODY_MEASURE'

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

export function initalBodyMeasure(gender, bodyType) {
  return {
    type: INITIAL_MYBODY_MEASURE,
    payload: {
      gender: gender,
      bodyType: bodyType
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
 },
 [INITIAL_MYBODY_MEASURE]: (state, action) => {
   return ({...state, sizeList: sizeList[action.payload.gender][action.payload.bodyType],
            current: sizeList[action.payload.gender][action.payload.bodyType][2]});
 }
}

// Reducer
const initialState = {
  sizeList: null,
  sizeTypes: commonSizeTypes,
  isInchSelect: false,
  isEdit: false,
  typeEdit: null,
  current: null,
  sizeInitValue: 0
}

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
