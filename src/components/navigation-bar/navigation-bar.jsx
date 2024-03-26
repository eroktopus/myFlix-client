import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
    expand="lg"
    style={{
      background: 'linear-gradient(to right, #208DC7, #142787)',
      paddingTop: '10px', // Increase the top padding to make the navbar thicker
      paddingBottom: '10px', // Increase the bottom padding to make the navbar thicker
    }}
  >
    <Container>
      <Navbar.Brand as={Link} to="/" style={{ color: 'white', fontWeight: '800' }}>
        myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" style={{ fontSize: '20px' }}> {/* Set the font size for all Nav.Link components */}
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  

  );
};
