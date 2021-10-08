import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import { Component } from 'react';


const app = new Clarifai.App({
 apiKey: 'a33fd588b204434eaf367389859ab579'
});
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  signin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super() 
      this.state = initialState;
  }

 loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
  })
  } 
 onInputChange = (e) => {
    this.setState({input: e.target.value})
  }
 calculateFaceLoc = (data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
 displayFaceBox = (box) => {
    this.setState({box: box})
  }
 onSubmit = () => {
    this.setState({imageUrl: this.state.input}) 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(res => {
      if (res) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{
              entries:count
            }))
          })
          .catch(err => console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLoc(res))
    })
    .catch(err => console.log(err))
  }
 onRouteChange = (route) => {
    if(this.state.route === 'signout') {
      this.setState(initialState)
    } else if(this.state.route === 'home') { 
      this.setState({signin: true})
    }
    this.setState({route: route})
  }

 particlesOption = {
    particles: {
      number : {
        value: 10,
        density: {
          enable: true,
          value_area: 80
        }
      }
    }
  }
  render () {
    return (
      <div className="App">
        <Particles className="particles" params={this.particlesOption}
        />
        <Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
        {
        this.state.route === 'home' ?
        <>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} img={this.state.imageUrl}/>
        </>
        : (this.state.route === 'signin'
        ?
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> :
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        ) 
        }
      </div>
    );
  }
}

export default App;
