import { useContext } from "react"
import Lottie from "react-lottie-player"

import { DetailsContext } from "../../context"
import { prettyCoords } from "../../utils/utils"
import { Description, Images } from "./DetailComponents"

import { loadingLottieData } from "../../assets/lottie"
import { XIcon } from "../../assets/vector"
import "./Details.scss"

const Details = () => {
  const {
    panel,
    stop: { data: stop, loading, error },
    closePanel,
  } = useContext(DetailsContext)

  return (
    <div className='details'>
      {loading ? (
        <div className='details-loading'>
          <Lottie
            role='img'
            aria-label='loading animation'
            animationData={loadingLottieData}
            play
            className='loading-lottie'
          />
        </div>
      ) : panel ? (
        <div className='panel-wrapper'>
          <XIcon role='button' aria-label='clear search' className='close' onClick={() => closePanel()} />
          {panel}
        </div>
      ) : stop ? (
        <>
          <div className='details-title'>
            <h2>{stop?.title?.split(",")[0]}</h2>
            <div className='address-coords-wrapper'>
              <p className='coordinates'>{prettyCoords(stop)}</p>
              <p className='address'>{stop?.location?.address || stop?.title}</p>
            </div>
          </div>
          <Images data={{ stop, loading, error }} />
          <Description data={{ stop, loading, error }} />
        </>
      ) : null}
    </div>
  )
}

export default Details
