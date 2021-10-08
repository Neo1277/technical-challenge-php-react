import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { 
    Button, 
	Breadcrumb, 
	BreadcrumbItem ,
	Card, 
	CardText, 
	CardBody, 
	CardTitle, 
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
const PostContent = (props) => {
	
	if (props.postisLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.posterrMess) {
        return(
            <h4>{props.posterrMess}</h4>
        );
    }
	else{ 
		console.log(JSON.stringify(props  ) +   ' postcontent');
		return(

            
			<div className="container">
                <br />
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.post.slug}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>			
                <div className="row row-content">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <h2 align="center">{props.post.title}</h2>
                                
                                <h5>Category:</h5>
                                
                                <p>{props.post.category}</p>
                                
                            </div>                
                        </div>
                        <div className="row">
                            <div className="col-12">
                                
                                <h5>Created on:</h5>
                                <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date(Date.parse(props.post.created_on)))}</p>
                                
                                <h5>Short description:</h5>
                                <p className="textShortPost">{props.post.short_text}</p>
                                
                                <h5>Large description:</h5>
                                <p className="textPost">{props.post.large_text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col order-sm-last">
                        <div className="row row-content">
							{props.posts.posts.map((field, i) => { 
									return(
									
										<div key={field._id} className="col-12">
											<FadeTransform in 
												transformProps={{
													exitTransform: 'scale(0.5) translateY(-50%)'
												}}>
													<Card>
														<CardBody>
															<CardTitle className="postCardTitle">{field.title}</CardTitle>
															<CardText className="postCardDescription">
																{/*{(field.short_text).substr(0,150)}...*/}
																<strong>Description</strong>: {field.short_text}
																<br />
																<strong>Category</strong>: {field.category}
															</CardText>
															<div align="center">
																<Link to={`/post/${field.slug}`} >
																	<Button color="secondary">Read more</Button>
																</Link>
															</div>
														</CardBody>
														
													</Card>		
													{/*<RatePostWithStars totalStars={5} />*/}
													{/*<StarRating totalStars={5} starsSelected={3} />*/}
											</FadeTransform>
										</div>		
																		
									);
									
								}) 
							}
						</div>                        
                    </div>
				</div>
			</div>

        );
	}
}



export default PostContent;