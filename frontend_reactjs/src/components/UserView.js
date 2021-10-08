import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Breadcrumb, 
	BreadcrumbItem,
	Button,
	Table,
	Form, 
	FormGroup, 
	Input, 
    Label, 
} from 'reactstrap';

export class AddUserComponent extends Component {

    constructor(props){
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleRegister(event) {
        
        this.props.registerUsers({
            name: this.name.value, 
            email_address: this.email_address.value, 
            password: this.password.value, 
            cell_phone_number: this.cell_phone_number.value, 
            user_type: this.user_type.value
        });
        
        event.preventDefault();

    }    
    

    /**
     * Render form with their respective validations
     */
    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Add User</h4>
                    </div>
                    <div className="col-12 col-md-9">

                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email_address">Email Address</Label>
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
                            <FormGroup>
                                <Label for="user_type">Select</Label>
                                <Input type="select" name="user_type" id="user_type" 
                                    innerRef={(input) => this.user_type = input} defaultValue="1">
                                    <option value="0">Administrator</option>
                                    <option value="1">User</option>
                                </Input>
                            </FormGroup>   

                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class EditUserComponent extends Component {

    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleUpdate(event) {
        
        this.props.editUsers({
            userId: this.props.user.id, 
            name: this.name.value, 
            email_address: this.email_address.value, 
            password: this.password.value, 
            cell_phone_number: this.cell_phone_number.value, 
            user_type: this.user_type.value
        });
        
        event.preventDefault();

    }    
    

    /**
     * Render form with their respective validations
     */
    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Edit User</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleUpdate}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" defaultValue={this.props.user.name}
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email_address">Email Address</Label>
                                <Input type="email" id="email_address" name="email_address" defaultValue={this.props.user.email_address}
                                    innerRef={(input) => this.email_address = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="cell_phone_number">Cell phone number</Label>
                                <Input type="text" id="cell_phone_number" name="cell_phone_number" defaultValue={this.props.user.cell_phone_number}
                                    innerRef={(input) => this.cell_phone_number = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="user_type">Select</Label>
                                <Input type="select" name="user_type" id="user_type" 
                                    innerRef={(input) => this.user_type = input} defaultValue={this.props.user.user_type}>
                                    <option value="0">Administrator</option>
                                    <option value="1">User</option>
                                </Input>
                            </FormGroup>   
                            <Button type="submit" value="submit" color="success">Edit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class DeleteUserComponent extends Component {

    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

	 handleDelete(event) {
        //this.toggleModal();
        this.props.deleteUsers({
            userId: this.props.user.id
        });
        
        event.preventDefault();

    }    
    

    /**
     * Render form with their respective validations
     */
    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h4>Delete User</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleDelete}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" value={this.props.user.name}
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email_address">Email Address</Label>
                                <Input type="email" id="email_address" name="email_address" value={this.props.user.email_address}
                                    innerRef={(input) => this.email_address = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="cell_phone_number">Cell phone number</Label>
                                <Input type="text" id="cell_phone_number" name="cell_phone_number" value={this.props.user.cell_phone_number}
                                    innerRef={(input) => this.cell_phone_number = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="user_type">Select</Label>
                                <Input type="select" name="user_type" id="user_type" 
                                    innerRef={(input) => this.user_type = input} value={this.props.user.user_type}>
                                    <option value="0">Administrator</option>
                                    <option value="1">User</option>
                                </Input>
                            </FormGroup> 
                            <Button type="submit" value="submit" color="danger">Delete</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
 export const UsersView = (props) => {
	
	
	if (props.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <h4>{props.errMess}</h4>
        );
    }
	else{ 
		/**
		 * Iterate over object that is in the store
		 */
		return(
			<div className="container">
				<br />
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
							<BreadcrumbItem active>Users</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Users</h2>

				<Link to={`/useradd`} >
					<Button color="primary">Add User</Button>
				</Link>					

				<div className="row row-content">
					<Table>
						<thead>
							<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email address</th>
							<th>Cell phone number</th>
							<th>User type</th>
							<th>Created on</th>
							<th>Updated on</th>
							<th>Action</th>
							</tr>
						</thead>
						<tbody>
					{props.users.user_data.map((field, i) => { 
						let text_user_type;
                        if (field.user_type == "0") {
                            text_user_type = <>Administrador</>;
                        } else {
                            text_user_type = <>User</>;
                        }
						return(
							<tr>
								<th scope="row">{field.id}</th>
								<td>{field.name} </td>
								<td>{field.email_address} </td>
								<td>{field.cell_phone_number} </td>
								<td>{text_user_type}</td>
								<td>{field.created_on}</td>
								<td>{field.updated_on}</td>
								<td>
									<Link to={`/useredit/${field.id}`} >
										<Button color="success">Edit</Button>
									</Link>
									<Link to={`/userdelete/${field.id}`} >
										<Button color="danger">Delete</Button>
									</Link>
								</td>
							</tr>
						);
					}) }
						</tbody>
						</Table>

				</div>

							
			</div>
        );
	}
}

