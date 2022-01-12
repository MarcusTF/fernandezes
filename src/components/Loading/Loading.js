import Lottie from "react-lottie-player"

import globeLoadJSON from "../../assets/lottie/globe-load.json"

import "./Loading.scss"

const Loading = () => {
  return (
    <div className='loading-container'>
      <Lottie animationData={globeLoadJSON} play className='loading' />
    </div>
  )
}

export default Loading
