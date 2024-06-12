import { useContext } from "react"
import BeachesList from "../../components/BeachesList/BeachesList"
import { Button, } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import Search from "../../components/Search/Search"

const BeachesPage = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="BeachesPage">
      <Search />
      <h1 className="mt-3 text-center"> Beaches</h1>
      {
        loggedUser.role === "admin" &&

        <div className="text-center">
          <Link to='/beaches/new'>
            <Button className="custom-color-button mb-3 mt-3">Add a new beach</Button>
          </Link>
        </div>
      }

      <BeachesList />
    </div>
  )
}

export default BeachesPage