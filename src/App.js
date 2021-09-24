import { useState } from 'react';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';


const app = new Clarifai.App({
 apiKey: 'a33fd588b204434eaf367389859ab579'
});
function App() {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [signin, setSignin] = useState(false)
  const [user, setUser] = useState({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  } 
  const onInputChange = (e) => {
    setInput(e.target.value)
  }
  const calculateFaceLoc = (data) => { 
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
  const displayFaceBox = (box) => {
    setBox(box)
  }
  const onSubmit = () => {
    setImageUrl(input) 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(res => {
      if (res) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: user.id,
            })
          })
          .then(res => res.json())
          .then(count => {
            setUser(Object.assign(user,{
              entries:count
            }))
          })
      }
      displayFaceBox(calculateFaceLoc(res))
    })
    .catch(err => console.log(err))
  }
  const onRouteChange = (route) => {
    route === 'signout' ?
      setSignin(false)
      : (route === 'home' &&
      setSignin(true) 
      )
    setRoute(route)
  }

  const particlesOption = {
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
  return (
    <div className="App">
      <Particles className="particles" params={particlesOption}
              />
      <Navigation isSignedin={signin} onRouteChange={onRouteChange}/>
      
      {
      route === 'home' ?
      <>
      <Logo/>
      <Rank name={user.name} entries={user.entries}/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition box={box} img={imageUrl}/>
      </>
      : (route === 'signin'
      ?
      <Signin onRouteChange={onRouteChange} loadUser={loadUser}/> :
      <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
      ) 
      }
    </div>
  );
}

export default App;
