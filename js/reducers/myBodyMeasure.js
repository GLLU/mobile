// Data sample
const sizeList = {
  female: {
    invertedTriangle: {
        chest: '94', waist: '74', hips: '99', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
    },
    rectangle: {
        chest: '94', waist: '78', hips: '98', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
    },
    apple: {
        chest: '94', waist: '94', hips: '98', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
    },
    pear: {
        chest: '89', waist: '78', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
    },
    hourglass: {
        chest: '94', waist: '73', hips: '102', height: '170',
        minValue: '0',
        maxValue: '300',
        measurements_scale: 'cm',
        select: true
    }
  },
  male: {
    invertedTriangle: {
      chest: '102', waist: '83', hips: '94', height: '170',
      minValue: '0',
      maxValue: '300',
      measurements_scale: 'cm',
      select: false
    },
    rectangle: {
      chest: '102', waist: '83', hips: '94', height: '170',
      minValue: '0',
      maxValue: '300',
      measurements_scale: 'cm',
      select: false
    },
    triangle: {
      chest: '95', waist: '89', hips: '101', height: '170',
      minValue: '0',
      maxValue: '300',
      measurements_scale: 'cm',
      select: false
    },
    oval: {
      minValue: '0',
      maxValue: '300',
      chest: '101', waist: '89', hips: '101', height: '170',
      measurements_scale: 'cm',
      select: false
    },
  }
};

const commonSizeTypes = ['chest','waist','hips', 'height'];

// Reducer
const initialState = {
  sizeList: sizeList,
  sizeTypes: commonSizeTypes,
}

const myBodyMeasureReducer=()=>initialState;

export default myBodyMeasureReducer
