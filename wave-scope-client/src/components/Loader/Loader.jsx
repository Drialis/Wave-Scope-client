import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="Loader">
      <Spinner animation="grow" variant="dark" />
    </div>
  )
}

export default Loader