let directions = {
  top: [0, -1],
  bottom: [0, 1],
  left: [-1, 0],
  right: [1, 0]
};

const dictionary = object.keys(directions).map(key=>{return{key,value:directions[key]}})

dictionary.forEach(dirX=>{
  dictionary.forEach(dirY=>{

  })
});

export default directions;