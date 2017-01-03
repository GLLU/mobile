import convert from 'convert-units';
import { TOGGLE_SIZE, TOGGLE_EDIT_SIZE, TOGGLE_CM_INCH, INITIAL_MYBODY_MEASURE } from '../actions/myBodyMeasure';

// Data sample
const sizeList = {
  female: {
    triangle: [
      {
        name: 'XS',
        chest: '82', waist: '62', hips: '87', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '68', hips: '93', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '74', hips: '99', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '80', hips: '105', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '87', hips: '112', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    leanColumn: [
      {
        name: 'XS',
        chest: '78', waist: '63', hips: '86', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '84', waist: '69', hips: '92', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '90', waist: '75', hips: '98', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '96', waist: '81', hips: '104', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '103', waist: '88', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    rectangle: [
      {
        name: 'XS',
        chest: '82', waist: '66', hips: '86', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '72', hips: '92', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '78', hips: '98', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '85', hips: '104', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '94', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    apple: [
      {
        name: 'XS',
        chest: '82', waist: '82', hips: '86', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '88', hips: '92', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '94', hips: '98', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '101', hips: '104', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '109', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    pear: [
      {
        name: 'XS',
        chest: '77', waist: '66', hips: '90', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '83', waist: '72', hips: '96', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '89', waist: '78', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '95', waist: '85', hips: '109', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '102', waist: '94', hips: '116', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    neatHourGlass: [
      {
        name: 'XS',
        chest: '82', waist: '61', hips: '90', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '67', hips: '92', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '73', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '79', hips: '109', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '86', hips: '116', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    fullHourGlass: [
      {
        name: 'XS',
        chest: '82', waist: '61', hips: '90', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '67', hips: '92', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '73', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '79', hips: '109', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '86', hips: '116', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ]
  },
  male: {
    trapezoid: [
      {
        name: 'S',
        chest: '93', waist: '77', hips: '87', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '101', waist: '84', hips: '94', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '110', waist: '92', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '120', waist: '101', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '131', waist: '111', hips: '120', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    invertedTriangle: [
      {
        name: 'S',
        chest: '94', waist: '76', hips: '87', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '102', waist: '83', hips: '94', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '111', waist: '91', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121', waist: '100', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132', waist: '110', hips: '120', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    ractangle: [
      {
        name: 'S',
        chest: '94', waist: '76', hips: '87', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '102', waist: '83', hips: '94', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '111', waist: '91', hips: '102', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121', waist: '100', hips: '111', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132', waist: '110', hips: '120', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    triangle: [
      {
        name: 'S',
        chest: '88', waist: '81', hips: '93', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '95', waist: '89', hips: '101', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '103', waist: '93', hips: '110', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '112', waist: '101', hips: '119', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '122', waist: '111', hips: '128', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    oval: [
      {
        name: 'S',
        chest: '91', waist: '81', hips: '93', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '101', waist: '89', hips: '101', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '109', waist: '93', hips: '110', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '118', waist: '101', hips: '119', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '130', waist: '111', hips: '128', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ]
  }
};

var commonSizeTypes = ['chest','waist','hips', 'height'];

function _convertCmAndInc(obj, fromScale, toScale) {
  console.log('convert', obj, fromScale, toScale);
  commonSizeTypes.map((sizeType) => {
    const value = obj[sizeType];
    obj[sizeType] = convert(value).from(fromScale).to(toScale);
  });
  obj.measurements_scale = toScale;
  return obj;
}

// Action Handlers
const ACTION_HANDLERS = {
  [TOGGLE_CM_INCH]: (state, action) => {
    const isCheck = action.payload.checked
    const sizeResult = state.current;
    const measurements_scale = isCheck ? 'in' :'cm';
    if (measurements_scale != sizeResult.measurements_scale) {
      _convertCmAndInc(sizeResult, sizeResult.measurements_scale, measurements_scale);
    }
    return ({ ...state, isInchSelect: isCheck , current: sizeResult})
  },
  [TOGGLE_SIZE]: (state, action) => {
    return ({ ...state, sizeList: state.sizeList.map((item) => {
        item.select = false;
        if(item.name === action.payload.sizeType) {
          item.select = true;
          const measurements_scale = state.isInchSelect ? 'in' :'cm';
          if (measurements_scale != item.measurements_scale) {
            _convertCmAndInc(item, item.measurements_scale, measurements_scale);
          }
          state.current = Object.assign({}, item);
        }
        return item;
      })
    })
  },
  [TOGGLE_EDIT_SIZE]: (state, action) => {
    return ({
      ...state,
      isEdit: action.payload.isEdit,
      typeEdit: action.payload.typeEdit,
      sizeInitValue: action.payload.sizeInitValue
    });
 },
 [INITIAL_MYBODY_MEASURE]: (state, action) => {
    return ({
      ...state,
      sizeList: sizeList[action.payload.gender][action.payload.bodyType],
      current: sizeList[action.payload.gender][action.payload.bodyType][2]
    });
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
