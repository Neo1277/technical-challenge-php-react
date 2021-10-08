import React from 'react';
import { 
	Breadcrumb, 
	BreadcrumbItem
} from 'reactstrap';

/**
 * Show this website if the user is not authenticated
 */
const Index = (props) => {
	
		return(
			<>
			
				<br />
				<div className="container">

					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem active>Home</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</div>
					<div className="row row-content">
						
						<div className="col-12 col-sm order-sm-last col-md">

							<h5 align="center">Star session or if you are not registered, get registered to see the posts!</h5>
							
						</div>
					</div>			
				</div>
			</>
        );
	
}



export default Index;