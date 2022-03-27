import "./Marker.scss"

const Marker = ({ left, top, children, data }) => {
  return (
    <div style={{ left, top }} className={`marker`}>
      <div className='marker-body'>
        <div className='marker-content'>
          <h6 className='marker-title'>{children || data?.title}</h6>
          <p>{data?.text?.description}</p>
        </div>
      </div>
      <span className='tail' />
    </div>
  )
}

export default Marker
