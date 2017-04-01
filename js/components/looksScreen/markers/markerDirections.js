//enum

let markerDirections=['top-left','top-right','bottom-left','bottom-right'];

markerDirections.reverse=(value)=>{
  switch (value) {
    case 'top-left':
      return 'bottom-right';
    case 'top-right':
      return 'bottom-left';
    case 'bottom-left':
      return 'top-right';
    case 'bottom-right':
    default:
      return 'top-left';
  }
}

export default markerDirections