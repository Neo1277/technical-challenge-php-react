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

export class AddPostComponent extends Component {

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
        this.props.registerPost({
            category_id: this.category.value, 
            title: this.title.value, 
            slug: this.slug.value, 
            short_text: this.short_text.value, 
            large_text: this.large_text.value
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
                        <h4>Add Post</h4>
                    </div>
                    <div className="col-12 col-md-9">

                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label for="category">Select</Label>
                                <Input type="select" name="category" id="category" 
                                    innerRef={(input) => this.category = input}>
                                {this.props.genres.genres.map((field, i) => { 
						            return(
                                        <>
                                            <option value={field.id}>{field.name}</option>
                                        </>
                                    );
                                }) }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title"
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="slug">Slug</Label>
                                <Input type="text" id="slug" name="slug"
                                    innerRef={(input) => this.slug = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="short_text">Short text</Label>
                                <Input type="text" id="short_text" name="short_text"
                                    innerRef={(input) => this.short_text = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="large_text">Large text</Label>
                                <Input type="textarea" id="large_text" name="large_text"
                                    innerRef={(input) => this.large_text = input}  />
                            </FormGroup>
                            
                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class EditPostComponent extends Component {

    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

    handleUpdate(event) {
        
        this.props.editPost({
            postId: this.props.post.id, 
            category_id: this.category.value, 
            title: this.title.value, 
            slug: this.slug.value, 
            short_text: this.short_text.value, 
            large_text: this.large_text.value
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
                        <h4>Update Post</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleUpdate}>
                            <FormGroup>
                                <Label for="category">Select</Label>
                                <Input type="select" name="category" id="category" defaultValue={this.props.post.category_id}
                                    innerRef={(input) => this.category = input}>
                                {this.props.genres.genres.map((field, i) => { 
						            return(
                                        <>
                                            <option value={field.id}>{field.name}</option>
                                        </>
                                    );
                                }) }
                                </Input>
                            </FormGroup>                            
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title" defaultValue={this.props.post.title}
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="slug">Slug</Label>
                                <Input type="text" id="slug" name="slug" defaultValue={this.props.post.slug}
                                    innerRef={(input) => this.slug = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="short_text">Short text</Label>
                                <Input type="text" id="short_text" name="short_text" defaultValue={this.props.post.short_text}
                                    innerRef={(input) => this.short_text = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="large_text">Large text</Label>
                                <Input type="textarea" id="large_text" name="large_text" defaultValue={this.props.post.large_text}
                                    innerRef={(input) => this.large_text = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="success">Edit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export class DeletePostComponent extends Component {

    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


    /**
     * 
     * Send parameters to do the post request and clear fields in the view
     */

	 handleDelete(event) {
         
        this.props.deletePost({
            postId: this.props.post.id
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
                        <h4>Delete Post</h4>
                    </div>
                    <div className="col-12 col-md-9">

					<Form onSubmit={this.handleDelete}>
                            <FormGroup>
                                <Label for="category">Select</Label>
                                <Input type="select" name="category" id="category" value={this.props.post.category_id}
                                    innerRef={(input) => this.category = input}>
                                {this.props.genres.genres.map((field, i) => { 
						            return(
                                        <>
                                            <option value={field.id}>{field.name}</option>
                                        </>
                                    );
                                }) }
                                </Input>
                            </FormGroup>   
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title" value={this.props.post.title}
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="slug">Slug</Label>
                                <Input type="text" id="slug" name="slug" value={this.props.post.slug}
                                    innerRef={(input) => this.slug = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="short_text">Short text</Label>
                                <Input type="text" id="short_text" name="short_text" value={this.props.post.short_text}
                                    innerRef={(input) => this.short_text = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="large_text">Large text</Label>
                                <Input type="text" id="large_text" name="large_text" value={this.props.post.large_text}
                                    innerRef={(input) => this.large_text = input}  />
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
 export const PostsView = (props) => {
	
	
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
							<BreadcrumbItem active>Posts</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>				
				<h2 align="center">Posts</h2>

				<Link to={`/postadd`} >
					<Button color="primary">Add post</Button>
				</Link>					

				<div className="row row-content">
					<Table>
						<thead>
							<tr>
							<th>#</th>
							<th>Category</th>
							<th>Title</th>
							<th>Slug</th>
							<th>Short text</th>
							<th>Large text</th>
							<th>Created on</th>
							<th>Updated on</th>
							<th>Action</th>
							</tr>
						</thead>
						<tbody>
					{props.posts.posts.map((field, i) => { 
						
						return(
							<tr>
								<th scope="row">{field.id}</th>
								<td>{field.category} </td>
								<td>{field.title}</td>
								<td>{field.slug}</td>
								<td>{field.short_text}</td>
								<td>{field.large_text}</td>
								<td>{field.created_on}</td>
								<td>{field.updated_on}</td>
								<td>
									<Link to={`/postedit/${field.id}`} >
										<Button color="success">Edit</Button>
									</Link>
									<Link to={`/postdelete/${field.id}`} >
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