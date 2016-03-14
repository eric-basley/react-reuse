import flyd from 'flyd';
import _ from 'lodash';

const RP = 'paper-plane';
const colors = [ '#F34235', '#E81D62', '#9B26AF', '#6639B6', '#3E50B4', '#2095F2', '#02A8F3', '#00BBD3', '#009587', '#4BAE4F', '#FE5621', '#785447', '#9D9D9D', '#5F7C8A'];
const icons = [ RP, 'ambulance', 'automobile', 'bicycle', 'bus', 'cab', 'car', 'fighter-jet', 'motorcycle', 'plane', 'rocket', 'ship', 'space-shuttle', 'subway', 'train', 'truck'];

const count = 16;
const fruits = _.times(count, id => flyd.stream({id}));
const stream = flyd.combine( (...params) => {
  const fruits = params.slice(0, params.length-2);
  return _.map(fruits, fruit => fruit());
}, fruits);

const endStream = flyd.combine( fruits => {
  const isEnd = _.every(fruits(), fruit => fruit.icon === RP && !fruit.end);
  if(isEnd)return true;
}, [stream]);


function rollFruits(){
  _.each(fruits, fruit => rollFruit(fruit));
}

function rollFruit(fruit ){
  setTimeout( () => {
    const color = colors[_.random(0, colors.length-1)];
    const icon = icons[_.random(0, icons.length-1)];
    fruit({id: fruit().id, color, icon});
    if(icon !== RP) rollFruit(fruit);
  }, _.random(150, 150) );
}

function on(fn){
  flyd.on(fn, stream);
}

function onEnd(fn){
  flyd.on(fn, endStream);
}

export default {
  rollFruits,
  on,
  onEnd
}

onEnd( () => {
  _.each(fruits, fruit => fruit({id: fruit().id, color: "#cd4436", icon: RP, end: true}));
})


