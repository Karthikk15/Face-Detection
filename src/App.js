import './App.css';
import { Component } from 'react';
import Navigation  from './Components/Navigation/Navigation';
import Logo  from './Components/Logo/Logo';
import Rank  from './Components/Rank/Rank';
import FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import UploadImage  from './Components/UploadImage/UploadImage';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
const particleOptions = {
  particles: {
    number: {
      "value": 80
  }
  }
} 

const app = new Clarifai.App({
  apiKey: '1091f91d539d41ffa3dc565ecba993be'
 });
 var ctx = undefined;
 var imageDetails = {
  width: 0,
  height: 0
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL:'',
      boxes: []
    }
  } 
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  calculateBoundingBox = (data) => {
    var image = document.getElementById('face');
    let imageWidth = parseInt(image.width);
    imageDetails.width = imageWidth;
    let imageHeight = parseInt(image.height);
    imageDetails.height = imageHeight;
    for (let i = 0; i < data.length; i++) {
      let box = {};
      let boxRegion = data[i].region_info.bounding_box;
      box.x = boxRegion.left_col * imageWidth;
      box.y = boxRegion.top_row * imageHeight;
      box.width = (boxRegion.right_col * imageWidth) - box.x;
      box.height = (boxRegion.bottom_row * imageHeight) - box.y;
      this.state.boxes.push(box);
     }
     //this.state.setState(boxes);
     this.drawBoxes();
  }

  drawBoxes = () => {
    var canvasElement = document.getElementById('face-detect');
    canvasElement.setAttribute('width', imageDetails.width);
    canvasElement.setAttribute('height', imageDetails.height);
    canvasElement.style.width = imageDetails.width + 'px';
    canvasElement.style.height = imageDetails.height + 'px';
    ctx = canvasElement.getContext('2d');
    ctx.strokeStyle = '#ffbb11';
    let faces = this.state.boxes;
    for (let i = 0 ; i < faces.length; i++) {
      ctx.beginPath();
      ctx.rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
      ctx.stroke();
    }
  }

  onButtonSubmit = () => {
  if(ctx) {
    ctx.clearRect(0,0,parseInt(imageDetails.width), parseInt(imageDetails.height));
  }
  this.setState({boxes: []});
  this.setState({imageURL: this.state.input});
  var obj = this;
   app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
     function(response) {
      var data = response['outputs'][0]['data']['regions'];
      obj.calculateBoundingBox(data);
     },
     function(err) {
      console.log(`Sorry, COuldn't detect faces` );
    }
   );
  }

  render() {
  return (
    <div className="App">
      <Particles className='particles'
                params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <UploadImage onButtonSubmit = { this.onButtonSubmit } onInputChange = {this.onInputChange }/> 
      <FaceRecognition imageURL = { this.state.imageURL}/>
    </div>
  );
  }
}

export default App;
