import { useContext } from "react"
import Lottie from "react-lottie-player"
import { loadingLottieData } from "../../assets/lottie"

import { DetailsContext } from "../../context"
import { prettyCoords } from "../../utils/utils"

import "./Details.scss"

const Details = () => {
  const {
    panel,
    stop: { data: stop, loading, error },
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
      ) : (
        panel || (
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
          </>
        )
      )}
    </div>
  ) : null
}

export default Details
