import React, { Component, useState } from 'react';
import { 
	Navbar, 
	NavbarBrand, 
	Nav, 
	NavbarToggler, 
	Collapse, 
	NavItem, 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody,
	Form, 
	FormGroup, 
	Input, 
    Label, 
    TabContent, 
    TabPane, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const DropdownMenuComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    let menu;
    let menu2;
    let menu3;
    let user_type = localStorage.getItem('user_type');
    if (user_type== "0") {
        menu = <DropdownItem>
                    <NavLink className="linkGenre" to="/users">
                        Users
                    </NavLink>
                </DropdownItem>;
        menu2 = <DropdownItem>
                    <NavLink className="linkGenre" to="/genres">
                        Genres
                    </NavLink>
                </DropdownItem>;
        menu3 = <DropdownItem>
                    <NavLink className="linkGenre" to="/posts">
                        Posts
                    </NavLink>
                </DropdownItem>;
    } else {
        menu = <></>;
        menu2 = <></>;
        menu3 = <></>;
    }

    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>{props.auth.user.username}</DropdownItem>
          
          {menu}
          {menu2}
          {menu3}
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          {/*<DropdownItem>Foo Action</DropdownItem>*/}
          <DropdownItem>
            <a onClick={props.handleLogout} id="loginButton" role="button">
                <span className="fa fa-sign-out fa-lg"></span> Logout
            </a>
            {props.auth.isFetching ?
                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                : null
            }
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

class Header extends Component{
	constructor(props) {
	    super(props);

	    this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.toggleTab = this.toggleTab.bind(this);

	    this.state = {
		  isNavOpen: false,
          isModalOpen: false,
          activeTab: '1'
	    };
	}

	toggleNav() {
	    this.setState({
	      isNavOpen: !this.state.isNavOpen
	    });
    }

    //Open modal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
    }
    //Call loginUser functions
    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({email_address: this.email_address.value, password: this.password.value});
        event.preventDefault();

    }

    handleImageChange = (e) => {
        this.setState({
            profile_image: e.target.files[0]
        })
    };

    handleLogout() {
        this.props.logoutUser();
    }

    handleRegister(event) {
        this.toggleModal();
        this.props.registerUser({
            name: this.name.value, 
            email_address: this.email_address.value, 
            password: this.password.value, 
            cell_phone_number: this.cell_phone_number.value
        });
        /*
        this.props.registerUser(
            this.username.value, 
            this.email.value, 
            this.first_name.value, 
            this.last_name.value, 
            this.password.value, 
            this.state.profile_image
        );*/
        event.preventDefault();

    }    
    
	render(){
		return(
			<>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto">
							<img src="/assets/images/logo1.jpg" height="30" width="41" alt="My blog" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span> Home  
									</NavLink>
								</NavItem>
							</Nav>
                            <Nav className="ml-auto navbar-dark" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        /*
                                        Button outline changed to <a> button (more visible)
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>*/
                                        <span class="navbar-text">
                                            <a onClick={this.toggleModal} id="loginButton" role="button">
                                            <span className="fa fa-sign-in fa-lg"></span> Login</a>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </span>    
                                        :
                                        /*<div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>*/
                                        /*
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <a onClick={this.handleLogout} id="loginButton" role="button">
                                            <span className="fa fa-sign-out fa-lg"></span> Logout</a>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                           
                                        </div> */
                                        <div>
                                            <DropdownMenuComponent auth={this.props.auth} handleLogout={this.handleLogout} />
                                        </div>
                                        
                                    }

                                </NavItem>
                            </Nav>							
						</Collapse>
					</div>
				</Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <Nav tabs>
                            <NavItem className="userNav"> 
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}  to="/"
                                >
                                    Login        
                                </NavLink>
                            </NavItem>
                            <NavItem className="userNav">
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}  to="/"
                                >
                                    Sign up  
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </ModalHeader>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            { this.state.activeTab == 1 ? 
                                <ModalBody>
                                    <Form onSubmit={this.handleLogin}>
                                        <FormGroup>
                                            <Label htmlFor="email_address">Email address</Label>
                                            <Input type="email" id="email_address" name="email_address"
                                                innerRef={(input) => this.email_address = input} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" id="password" name="password"
                                                innerRef={(input) => this.password = input}  />
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name="remember"
                                                innerRef={(input) => this.remember = input}  />
                                                Remember me
                                            </Label>
                                        </FormGroup>
                                        <Button type="submit" value="submit" color="secondary">Login</Button>
                                    </Form>
                                </ModalBody>
                            : null 
                            
                            }
                        </TabPane>
                        <TabPane tabId="2">
                            { this.state.activeTab == 2 ? 
                            
                                <ModalBody>
                                    <Form onSubmit={this.handleRegister}>
                                        <FormGroup>
                                            <Label htmlFor="name">Name</Label>
                                            <Input type="text" id="name" name="name"
                                                innerRef={(input) => this.name = input} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="email_address">Email address</Label>
                                            <Input type="email" id="email_address" name="email_address"
                                                innerRef={(input) => this.email_address = input} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" id="password" name="password"
                                                innerRef={(input) => this.password = input} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="cell_phone_number">Cell phone number</Label>
                                            <Input type="text" id="cell_phone_number" name="cell_phone_number"
                                                innerRef={(input) => this.cell_phone_number = input} />
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name="remember"
                                                innerRef={(input) => this.remember = input}  />
                                                Remember me
                                            </Label>
                                        </FormGroup>
                                        <Button type="submit" value="submit" color="secondary">Sign up</Button>
                                    </Form>
                                </ModalBody>
                            : null }
                        </TabPane>
                    </TabContent>
                </Modal>				
			</>
		);
	}
}

export default Header;