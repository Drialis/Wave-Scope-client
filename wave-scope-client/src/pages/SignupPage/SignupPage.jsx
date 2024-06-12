import { Container } from "react-bootstrap"

import SignupForm from "../../components/SignupForm/SignupForm"


const SignupPage = () => {



  return (

    <Container className="signupPage">

      <h1 className="m-3 text-center">Sign Up</h1>

      <SignupForm />

    </Container>
  )
}

export default SignupPage