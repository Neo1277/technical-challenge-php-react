import React, { Component } from 'react';
import Index from './IndexComponent';
import Home from './HomeComponent';
import { PostsView, AddPostComponent, EditPostComponent, DeletePostComponent } from './PostsView';
import { GenresView, AddGenreComponent, EditGenreComponent, DeleteGenreComponent } from './GenresView';
import { UsersView, AddUserComponent, EditUserComponent, DeleteUserComponent } from './UserView';
import PostContent from './PostComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  fetchGenres, 
  fetchPosts,
  loginUser, 
  logoutUser,
  registerUser,
  fetchUserData,
  registerPost,
  editPost,
  deletePost,
  registerGenre,
  editGenre,
  deleteGenre,
  registerUsers,
  editUsers,
  deleteUsers
} from '../redux/ActionCreators';

/* Set data gotten from Django API with redux to the Cpmponent's props */
const mapStateToProps = state => {
  return{
    genres: state.genres,
    posts: state.posts,
    user_data: state.user_data,
    auth: state.auth
  }
}

/* Set functions from ActionCreators redux to the Cpmponent's props and dispatch */
const mapDispatchToProps = (dispatch) => ({
  fetchGenres: () => { dispatch(fetchGenres())},
  fetchPosts: () => { dispatch(fetchPosts())},
  fetchUserData: () => { dispatch(fetchUserData())},
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  registerUser: (dataUser) => dispatch(registerUser(dataUser)),

  
  registerPost: (dataPost) => dispatch(registerPost(dataPost)),
  editPost: (dataPost) => dispatch(editPost(dataPost)),
  deletePost: (postId) => dispatch(deletePost(postId)),

  
  registerGenre: (dataGenre) => dispatch(registerGenre(dataGenre)),
  editGenre: (dataGenre) => dispatch(editGenre(dataGenre)),
  deleteGenre: (genreId) => dispatch(deleteGenre(genreId)),

  
  registerUsers: (dataUser) => dispatch(registerUsers(dataUser)),
  editUsers: (dataUser) => dispatch(editUsers(dataUser)),
  deleteUsers: (dataUser) => dispatch(deleteUsers(dataUser)),
});


class Main extends Component {

  //Execute this before render
  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchPosts();
    this.props.fetchUserData();
  }

  render(){


    const PostWithId = ({match}) => {
      return(
        <EditPostComponent post={this.props.posts.posts.filter((post) => post.id === match.params.id)[0]}
          editPost={this.props.editPost}  genres={this.props.genres}
        />
      );
    };

    const DeletePostWithId = ({match}) => {
      return(
        <DeletePostComponent post={this.props.posts.posts.filter((post) => post.id === match.params.id)[0]}
          deletePost={this.props.deletePost}  genres={this.props.genres}
        />
      );
    };

    const GenreWithId = ({match}) => {
      return(
        <EditGenreComponent genre={this.props.genres.genres.filter((genre) => genre.id === match.params.id)[0]}
        editGenre={this.props.editGenre}
        />
      );
    };

    const DeleteGenreWithId = ({match}) => {
      return(
        <DeleteGenreComponent genre={this.props.genres.genres.filter((genre) => genre.id === match.params.id)[0]}
        deleteGenre={this.props.deleteGenre}
        />
      );
    };

    const UserWithId = ({match}) => {
      return(
        <EditUserComponent user={this.props.user_data.user_data.filter((user) => user.id === match.params.id)[0]}
        editUsers={this.props.editUsers}
        />
      );
    };

    const DeleteUserWithId = ({match}) => {
      return(
        <DeleteUserComponent user={this.props.user_data.user_data.filter((user) => user.id === match.params.id)[0]}
        deleteUsers={this.props.deleteUsers}
        />
      );
    };    
    
    //This calls PostContent and pass it all the properties
    const PostWithSlug = ({match}) => {
      //console.log("comment value: "+ JSON.stringify(this.props.comments.comments+ ' Comments props'))
      return(
        <PostContent post={this.props.posts.posts.filter((post) => post.slug === match.params.slugpost)[0]}
          postisLoading={this.props.posts.isLoading}
          posterrMess={this.props.posts.errMess} 
          posts={this.props.posts}
        />      
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/index',
              state: { from: props.location }
            }} />
      )} />
    );

    let user_type = localStorage.getItem('user_type');

    const PrivateRouteGenre = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user_type == "0"
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/index',
              state: { from: props.location }
            }} />
      )} />
    );

    const PrivateRoutePost = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user_type == "0"
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/index',
              state: { from: props.location }
            }} />
      )} />
    );

    const PrivateRouteUser = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user_type == "0"
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/index',
              state: { from: props.location }
            }} />
      )} />
    );

    /**
     * Set routes to open the different pages calling the components
     * And redirect to home if the url that the user type in the browser
     * does not match with any url from here
     */

    return (
      <div>
        <Header 
          auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          registerUser={this.props.registerUser} 
        />
          <Switch>
            <Route path='/index' component={() => <Index auth={this.props.auth} />}  />
            <PrivateRoute exact path="/home" component={() => <Home genres={this.props.genres} posts={this.props.posts} auth={this.props.auth} />} />
            {/*<Route path='/home' component={() => <Home genres={this.props.genres} posts={this.props.posts} auth={this.props.auth} />}  />*/}
            
            <Route path="/post/:slugpost" component={PostWithSlug} />

            <PrivateRoutePost exact path="/posts" component={() => <PostsView posts={this.props.posts} genres={this.props.genres} />} />
            <Route path='/postadd' component={() => <AddPostComponent genres={this.props.genres} registerPost={this.props.registerPost} />} />
            <Route path="/postedit/:id" component={PostWithId} />
            <Route path="/postdelete/:id" component={DeletePostWithId} />

            <PrivateRouteGenre exact path="/genres" component={() => <GenresView genres={this.props.genres} />} />
            <Route path='/genreadd' component={() => <AddGenreComponent registerGenre={this.props.registerGenre} />} />
            <Route path="/genreedit/:id" component={GenreWithId} />
            <Route path="/genredelete/:id" component={DeleteGenreWithId} />

            <PrivateRouteUser exact path="/users" component={() => <UsersView users={this.props.user_data} />} />
            <Route path='/useradd' component={() => <AddUserComponent registerUsers={this.props.registerUsers} />} />
            <Route path="/useredit/:id" component={UserWithId} />
            <Route path="/userdelete/:id" component={DeleteUserWithId} />
            
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

