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

export class AddGenreComponent extends Component {

    constructor(props){
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleRegister(event) {
        //this.toggleModal();
        this.props.registerGenre({
            name: this.name.value
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
                        <h4>Add Category</h4>
                    </div>
                    <div className="col-12 col-md-9">

                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="name">Category</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class EditGenreComponent extends Component {

    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleUpdate(event) {
        //this.toggleModal();
        this.props.editGenre({
            genreId: this.props.genre.id, 
            name: this.name.value
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
                        <h4>Edit Category</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleUpdate}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" defaultValue={this.props.genre.name}
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="success">Edit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class DeleteGenreComponent extends Component {

    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

	 handleDelete(event) {
         
        this.props.deleteGenre({
            genreId: this.props.genre.id
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
                        <h4>Delete Category</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleDelete}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" value={this.props.genre.name}
                                    innerRef={(input) => this.name = input} />
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
 export const GenresView = (props) => {
	
	
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
							<BreadcrumbItem active>Categories</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Categories</h2>

				<Link to={`/genreadd`} >
					<Button color="primary">Add Category</Button>
				</Link>					

				<div className="row row-content">
					<Table>
						<thead>
							<tr>
							<th>#</th>
							<th>Name</th>
							<th>Created on</th>
							<th>Updated on</th>
							<th>Action</th>
							</tr>
						</thead>
						<tbody>
					{props.genres.genres.map((field, i) => { 
						
						return(
							<tr>
								<th scope="row">{field.id}</th>
								<td>{field.name} </td>
								<td>{field.created_on}</td>
								<td>{field.updated_on}</td>
								<td>
									<Link to={`/genreedit/${field.id}`} >
										<Button color="success">Edit</Button>
									</Link>
									<Link to={`/genredelete/${field.id}`} >
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



//export default GenreContent2;