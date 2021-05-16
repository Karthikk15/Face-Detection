import './App.css';
import { Component } from 'react';
import Navigation  from './Components/Navigation/Navigation';
import Logo  from './Components/Logo/Logo';
import Rank  from './Components/Rank/Rank';
import FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import UploadImage  from './Components/UploadImage/UploadImage';
import Particles from 'react-particles-js';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
const particleOptions = {
  particles: {
    number: {
      "value": 80
  }
  }
} 

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
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      isfaceDetectionFailed: false,
      user: {
        'Id': '',
        'Email': '',
        'Name': '',
        'Password': '',
        'Entries': 0,
         'Joined': '' 
      }
    }
  }
  
  loaduser = (data) => {
    this.setState({user: {
      Id: data.id,
      Email: data.email,
      Name: data.name,
      Entries: data.entries,
      Joined:data.joined
    }})
  };
    
  
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onRouterChange = (type) => {
    if (type === 'home')
    this.setState({isSignedIn: true});
    else
    this.setState({isSignedIn: false, imageURL: ''});
    this.setState({route: type})
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

  onImageDetected = () => {
    fetch('https://safe-springs-72553.herokuapp.com/image', {
    method:'put',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
        Id: this.state.user.Id,
        entries : parseInt(this.state.user.Entries) + this.state.boxes.length
    })
    }).then(response => response.json())
    .then(entries => this.setState(
      {
        isfaceDetectionFailed: false,  
      user: {
      Id: this.state.user.Id,
      Email: this.state.user.Email,
      Name: this.state.user.Name,
      Entries: entries,
      Joined:this.state.user.Joined
    }}))
}

  onButtonSubmit = () => {
  if(ctx) {
    ctx.clearRect(0,0,parseInt(imageDetails.width), parseInt(imageDetails.height));
  }
  this.setState({boxes: []});
  this.setState({imageURL: this.state.input});
  var obj = this;
  fetch('https://safe-springs-72553.herokuapp.com/imageUrl', {
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      imageUrl: this.state.input
    })
    }).then(response=>  response.json()).then( resOutput => {
    var data = resOutput['outputs'][0]['data']['regions'];
      obj.calculateBoundingBox(data);
      obj.onImageDetected();
    }
   ).catch(err => this.setState({isfaceDetectionFailed: true}))
  }

  render() {
  return (
    <div className="App">
      <Particles className='particles'
                params={particleOptions} />
      <Navigation onRouterChange={this.onRouterChange}  isSignedIn = {this.state.isSignedIn} />
      { this.state.route === 'home' ?
        <div>
          <Logo />
          <Rank name = {this.state.user.Name} entries = {this.state.user.Entries}/>
          <UploadImage onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
          <FaceRecognition isfaceDetectionFailed = {this.state.isfaceDetectionFailed} imageURL={this.state.imageURL} />
        </div>   
       : (this.state.route === 'signin' ? <SignIn loaduser= {this.loaduser}  onRouterChange={this.onRouterChange}/> : <Register loaduser= {this.loaduser} onRouterChange={this.onRouterChange}/>)   
  }
    </div>
  );
  }
}

export default App;
