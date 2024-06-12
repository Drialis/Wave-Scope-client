import { Container } from "react-bootstrap"
import NewBeachForm from "../../components/NewBeachForm/NewBeachForm.jsx"
import '../../contexts/auth.context.jsx'

const NewBeachPage = () => {

    return (
        <Container className="NewBeachPage">
            <br />
            <h4>Admin: </h4>
            <br />
            <NewBeachForm />
        </Container>
    )
}

export default NewBeachPage