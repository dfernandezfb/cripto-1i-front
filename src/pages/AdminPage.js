import { Container } from "react-bootstrap";
import CoinManagement from "../components/CoinManagement/CoinManagement";
import InternHeader from "../components/InternHeader/InternHeader";

const AdminPage = () => {
  return ( 
    <>
    {/* <InternHeader/> */}
    <Container className="mt-5">
      <CoinManagement/>
    </Container>
    </>
  );
}
 
export default AdminPage;