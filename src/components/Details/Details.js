import { useContext } from "react"
import Lottie from "react-lottie-player"
import { loadingLottieData } from "../../assets/lottie"
import { XIcon } from "../../assets/vector"

import { DetailsContext } from "../../context"
import { prettyCoords } from "../../utils/utils"

import "./Details.scss"

const Details = () => {
  const {
    panel,
    stop: { data: stop, loading, error },
    closePanel,
  } = useContext(DetailsContext)

  return stop || panel || loading ? (
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
      ) : (
        <>
          <div className='details-title'>
            <h2>{stop?.title?.split(",")[0]}</h2>
            <div className='address-coords-wrapper'>
              <p className='coordinates'>{prettyCoords(stop)}</p>
              <p className='address'>{stop?.location?.address || stop?.title}</p>
            </div>
          </div>
          {stop?.images?.thumbnail?.mediaItemUrl ? (
            <div className='details-image'>
              <img src={stop?.images?.thumbnail?.mediaItemUrl} alt='featured' />
            </div>
          ) : null}
          {stop?.text?.description ? (
            <div className='details-description'>
              {stop?.text?.title ? <h3 className='title'>{stop?.text?.title}</h3> : null}
              <p className='description'>{stop?.text?.description}</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  ) : null
}

export default Details
