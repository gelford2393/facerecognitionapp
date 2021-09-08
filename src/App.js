import { useState } from 'react';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';

const app = new Clarifai.App({
 apiKey: 'a33fd588b204434eaf367389859ab579'
});
function App() {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
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
    .then(res => displayFaceBox(calculateFaceLoc(res)))
    .catch(err => console.log(err))
  }
  const particlesOption = {
    particles: {
      number : {
        value: 30,
        density: {
          enable: true,
          value_area: 300
        }
      }
    }
  }
  return (
    <div className="App">
      <Particles className="particles" params={particlesOption}
              />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition box={box} img={imageUrl}/>
    </div>
  );
}

export default App;
