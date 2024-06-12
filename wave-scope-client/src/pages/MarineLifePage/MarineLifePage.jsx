import { Link } from "react-router-dom"
import MarineLifeList from "../../components/MarineLifeList/MarineLifeList"
import { Button, Container } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const MarineLifePage = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="MarineLifePage">
      <h1 className="mt-3 mb-3 text-center">Specimens</h1>

      {
        loggedUser.role === 'admin' &&

        <div className="text-center">
          <Link to={'/marine-life/new'}>
            <Button className="custom-color-button mt-3 mb-3" >Add a new specimen</Button>
          </Link>
        </div>
      }
      <MarineLifeList />
    </div>
  )
}

export default MarineLifePage