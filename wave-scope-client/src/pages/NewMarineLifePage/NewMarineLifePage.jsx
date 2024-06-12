import { Container } from "react-bootstrap"
import NewSpecimenForm from "../../components/NewSpecimenForm/NewSpecimenForm"

const NewMarineLifePage = () => {

  return (
    <Container className="NewMarineLifePage text-align-center mt-5 mb-5">

      <h1 className="text-center mt-3 mb-5">Add a new specimen to our list !</h1>

      <NewSpecimenForm />
    </Container>
  )
}

export default NewMarineLifePage