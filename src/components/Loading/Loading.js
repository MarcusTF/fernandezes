import Lottie from "react-lottie-player"
import { globeLoadLottieData } from "../../assets/lottie"

import "./Loading.scss"

const Loading = () => {
  return (
    <div className='loading-container'>
      <Lottie animationData={globeLoadLottieData} play className='loading' />
    </div>
  )
}

export default Loading
