import { useState, useEffect } from 'react'
import './App.css';


const BOX_RATIO = 800; // let remove pixels from borders
const CUBE_RATIO = 20;

function Cubes () {
  const boxes = new Array(Math.pow((BOX_RATIO/CUBE_RATIO), 2)).fill(0).map(function (value, index) {
    return <div className="snake-path" key={index}/>
  })
  return boxes
}

const Food = (props) => { 
  const { coordinates } = props;
  return <div className="snake-food" id="snake-food" style={{top: coordinates.longitude, left: coordinates.latitude}} />
}

const Snake = (props) => {
  const { coordinates, snakeLength } = props;
  const snakeSkin = coordinates.map(function (coordinate, index) {
    if (index ===  snakeLength-1) {
      return <div className="snake-body red" style={{top: coordinate.longitude, left: coordinate.latitude}} key={index} />
    }else{
       return <div className="snake-body" style={{top: coordinate.longitude, left: coordinate.latitude}} key={index} />
    }
  });
  return snakeSkin
}

function App() {
  const [ foodPosition, setfoodPosition ] = useState({
    longitude: Math.floor(Math.random() * (BOX_RATIO/CUBE_RATIO)) * CUBE_RATIO,
    latitude: Math.floor(Math.random() * (BOX_RATIO/CUBE_RATIO)) * CUBE_RATIO
  })

  const [ snakePosition, setSnakePosition] = useState([{
    longitude: 0,
    latitude: 0
  }])

  const [ snakeLength, setSnakeLength ] = useState(5)

  useEffect(() => {
    window.addEventListener('keydown', moveSnake);
    if(snakePosition[0].longitude === foodPosition.longitude && snakePosition[0].latitude === foodPosition.latitude) {
      setSnakeLength(snakeLength + 1)
      snakePosition.unshift({
        longitude: snakePosition[0].longitude,
        latitude: snakePosition[0].latitude
      })
      setfoodPosition({
        longitude: Math.floor(Math.random() * (BOX_RATIO/CUBE_RATIO)) * CUBE_RATIO,
        latitude: Math.floor(Math.random() * (BOX_RATIO/CUBE_RATIO)) * CUBE_RATIO
      })
    }
    return () => {
      window.removeEventListener('keydown', moveSnake);
    }
  }, [snakePosition])

  function moveData(head) {
    console.log(head);
    let my_snake = [];
      snakePosition.forEach((element, index) => {
        if(index === snakeLength-1) {
          my_snake.push(head)
        }else{
          my_snake.push(snakePosition[index+1])
        }
      });
      return my_snake;
  }

  function moveSnake(event){
    // if(event.key === 'ArrowUp' && snakePosition.longitude === 0) {
    //   console.log('Dead Snake');
    //   return;
    // }
    // if(event.key === 'ArrowDown' && snakePosition.longitude === BOX_RATIO-CUBE_RATIO) {
    //   console.log('Dead Snake');
    //   return;
    // }
    // if(event.key === 'ArrowLeft' && snakePosition.latitude === 0) {
    //   console.log('Dead Snake');
    //   return;
    // }
    // if(event.key === 'ArrowRight' && snakePosition.latitude === BOX_RATIO-CUBE_RATIO) {
    //   console.log('Dead Snake');
    //   return;
    // }
    let new_coordonates;
    switch (event.key) {
      case 'ArrowUp':
        new_coordonates = moveData({
          longitude: snakePosition[snakeLength-1].longitude - CUBE_RATIO,
          latitude: snakePosition[snakeLength-1].latitude
        })
        setSnakePosition(new_coordonates)
        break;
      case 'ArrowDown':
        new_coordonates = moveData({
          longitude: snakePosition[snakeLength-1].longitude + CUBE_RATIO,
          latitude: snakePosition[snakeLength-1].latitude
        })
        setSnakePosition(new_coordonates)
        break;
      case 'ArrowLeft':
        new_coordonates = moveData({
          longitude: snakePosition[snakeLength-1].longitude,
          latitude: snakePosition[snakeLength-1].latitude - CUBE_RATIO
        })
        setSnakePosition(new_coordonates)
        break;
      case 'ArrowRight':
        new_coordonates = moveData({
          longitude: snakePosition[snakeLength-1].longitude,
          latitude: snakePosition[snakeLength-1].latitude + CUBE_RATIO
        })
        setSnakePosition(new_coordonates)
        break;
      default:
        break;
    }
  }
  

  return (
    <div className="snake-box">
        <Cubes />
        <Food coordinates={{...foodPosition}}  />
        <Snake coordinates={snakePosition} snakeLength={snakeLength} />
      </div>
  );
}


export default App;

