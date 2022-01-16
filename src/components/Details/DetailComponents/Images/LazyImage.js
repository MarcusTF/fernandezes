import { useProgressiveImage } from "../../../../utils/hooks"

const LazyImage = ({ placeholder, src, ...rest }) => {
  const lazyImage = useProgressiveImage(src)
  return <img src={lazyImage || placeholder} {...rest} />
}

export default LazyImage
