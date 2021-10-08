import React from 'react';
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { 
	Card, 
	CardText, 
	CardBody, 
	CardTitle, 
	Breadcrumb, 
	BreadcrumbItem,
	Button
	
} from 'reactstrap';
//import Slider from './SliderComponent';
import { FadeTransform } from 'react-animation-components';

/**
 * Show status if the page is Loading shows spinner else shows error or the page content
 */
const Home = (props) => {
	
	
	if (props.genres.isLoading) {
		
        return(
            <Loading />
        );
    }
    else if (props.genres.errMess) {
        return(
            <h4>{props.genres.errMess}</h4>
        );
    }
	else{ 
		/**
		 * Iterate over object that is in the store
		 */
		//console.log(JSON.stringify(props.featured_posts  ) +   ' postcontent');
		return(
			<>
			
				{/*<Slider dataposts={props.featuredposts.featuredposts} />*/}
				<br />
				<div className="container">

					{/*<h2 align="center">Categories</h2>*/}
					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem active>Home</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</div>
					<div className="row row-content">
						
						<div className="col-12 col-sm order-sm-last col-md">

							{ !props.auth.isAuthenticated ?
							<h5 align="center">Star session or if you are not registered, get registered to see the posts!</h5>
							:
							<>
							<h5 align="center">Latest posts</h5>
							
							<div className="row row-content">
							{
								props.posts.posts.map((field, i) => { 
									return(
									
										<div key={field._id} className="col-12 col-md-4 m-20 postCard">
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
							</>
							}
						</div>
					</div>			
				</div>
			</>
        );
	}
}



export default Home;