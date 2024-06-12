import { Link } from "react-router-dom"
import SightingsList from "../../components/SightingsList/SightingsList"
import { Button } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const SightingsPage = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="SightingsPage">

      <h1 className="text-center mt-3 mb-3">All Sightings</h1>

      < Link to={'/sightings/new'} style={{ textDecoration: 'none' }}>
        <Button className="custom-color-button d-block mx-auto">Add your own sighting</Button>
      </Link>

      <SightingsList />
    </div >
  )
}

export default SightingsPage