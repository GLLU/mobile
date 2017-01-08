import { COMPLETE_EDIT_BODY_MEASURE, SET_MIN_MAX_BODY_MEASURE } from '../actions/myBodyMeasure';

// Data sample
const sizeList = {
  female: {
    triangle: [
      {
        name: 'XS',
        chest: '82', waist: '62', hips: '87', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '68', hips: '93', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '74', hips: '99', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '80', hips: '105', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '87', hips: '112', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    leanColumn: [
      {
        name: 'XS',
        chest: '78', waist: '63', hips: '86', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '84', waist: '69', hips: '92', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '90', waist: '75', hips: '98', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '96', waist: '81', hips: '104', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '103', waist: '88', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    rectangle: [
      {
        name: 'XS',
        chest: '82', waist: '66', hips: '86', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '72', hips: '92', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '78', hips: '98', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '85', hips: '104', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '94', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    apple: [
      {
        name: 'XS',
        chest: '82', waist: '82', hips: '86', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '88', hips: '92', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '94', hips: '98', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '101', hips: '104', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '109', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    pear: [
      {
        name: 'XS',
        chest: '77', waist: '66', hips: '90', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '83', waist: '72', hips: '96', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '89', waist: '78', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '95', waist: '85', hips: '109', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '102', waist: '94', hips: '116', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    neatHourGlass: [
      {
        name: 'XS',
        chest: '82', waist: '61', hips: '90', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '67', hips: '92', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '73', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '79', hips: '109', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '86', hips: '116', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    fullHourGlass: [
      {
        name: 'XS',
        chest: '82', waist: '61', hips: '90', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'S',
        chest: '88', waist: '67', hips: '92', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '94', waist: '73', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'L',
        chest: '101', waist: '79', hips: '109', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XL',
        chest: '109', waist: '86', hips: '116', height: '170',
        minValue: '0',
        maxValue: '300',
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
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '101', waist: '84', hips: '94', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '110', waist: '92', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '120', waist: '101', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '131', waist: '111', hips: '120', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    invertedTriangle: [
      {
        name: 'S',
        chest: '94', waist: '76', hips: '87', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '102', waist: '83', hips: '94', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '111', waist: '91', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121', waist: '100', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132', waist: '110', hips: '120', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    ractangle: [
      {
        name: 'S',
        chest: '94', waist: '76', hips: '87', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '102', waist: '83', hips: '94', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '111', waist: '91', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '121', waist: '100', hips: '111', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '132', waist: '110', hips: '120', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ],
    triangle: [
      {
        name: 'S',
        chest: '88', waist: '81', hips: '93', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        chest: '95', waist: '89', hips: '101', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        minValue: '0',
        maxValue: '300',
        chest: '103', waist: '93', hips: '110', height: '170',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        minValue: '0',
        maxValue: '300',
        chest: '112', waist: '101', hips: '119', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        minValue: '0',
        maxValue: '300',
        chest: '122', waist: '111', hips: '128', height: '170',
        measurements_scale: 'cm',
        select: false
      }
    ],
    oval: [
      {
        name: 'S',
        minValue: '0',
        maxValue: '300',
        chest: '91', waist: '81', hips: '93', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'M',
        minValue: '0',
        maxValue: '300',
        chest: '101', waist: '89', hips: '101', height: '170',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'L',
        chest: '109', waist: '93', hips: '110', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
      },
      {
        name: 'XL',
        chest: '118', waist: '101', hips: '119', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      },
      {
        name: 'XXL',
        chest: '130', waist: '111', hips: '128', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: false
      }
    ]
  }
};

var commonSizeTypes = ['chest','waist','hips', 'height'];

// Action Handlers
const ACTION_HANDLERS = {
  [COMPLETE_EDIT_BODY_MEASURE]: (state, action) => {
    return ({ ...state, current: action.payload.sizeInfo})
  },
  [SET_MIN_MAX_BODY_MEASURE]: (state, action) => {
    return ({ ...state, sliderMinValue: action.payload.min,
                        sliderMaxValue: action.payload.max})
  }
}

// Reducer
const initialState = {
  sizeList: sizeList,
  sizeTypes: commonSizeTypes,
  current: null,
  sliderMinValue: 0,
  sliderMaxValue: 400
}

export default function myBodyMeasureReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
