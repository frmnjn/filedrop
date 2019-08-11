import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const putihin = { color: 'white' }

class Menubar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      token: localStorage.getItem('jwtTokenValue')
    };
    this.test = this.test.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  test(e){
    e.preventDefault();
    console.log('hehe');
    localStorage.removeItem('jwtTokenValue');
    console.log(this.state.token);
    this.setState = {
      token: null
    }
    // this.props.history.push('/');
  }

  isLoggedIn(){
    if(this.state.token != null){
      console.log('Logged In');
      console.log(localStorage.length);
      return true;
    } else {
      return false;
    }
  }
  render() {
    if (this.isLoggedIn()) {
      return (
        <div>
          <Navbar color="lightblue" light expand="md">
            <NavbarBrand href="/" style={putihin}>FileDrop</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href='/register' style={putihin}>Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/'><a href='http://google.com' style={putihin} onClick={(e) => this.test(e)}>Sign Out</a></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
    } else {
      return (
        <div>
          <Navbar color="lightblue" light expand="md">
            <NavbarBrand href="/" style={putihin}>FileDrop</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href='/register' style={putihin}>Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/login' style={putihin}>Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

export default Menubar;