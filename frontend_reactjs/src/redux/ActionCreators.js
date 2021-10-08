import * as ActionTypes from './ActionTypes';
import { baseUrlApiRest, categories, posts, users, user } from '../shared/baseUrl';

/* Request to PHP Rest framework and show error or proceed to dispatch the data  */
export const fetchGenres = () => (dispatch) => {
    // http://localhost/technical-challenge-php-react/backend_php/categories.php/categories/2
    dispatch(genresLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrlApiRest + categories + '/categories', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
    })
		.then(response => {
		  if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
		})
		.then(response => response.json())
    .then(genres => dispatch(addGenres(genres)))
    .catch(error => dispatch(genresFailed(error.message)));
}

/* Call action type from genre reducer */
export const genresLoading = () => ({
    type: ActionTypes.GENRES_LOADING
});

/* Call action type from genre reducer */
export const genresFailed = (errmess) => ({
    type: ActionTypes.GENRES_FAILED,
    payload: errmess
});

/* Call action type from genre reducer */
export const addGenres = (genres) => ({
    type: ActionTypes.ADD_GENRES,
    payload: genres
});


/**
 * Register genre
 */
 export const registerGenre = (dataGenre) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');
  
  return fetch(baseUrlApiRest +  categories + '/categories', {
      method: "POST",
      body: JSON.stringify(dataGenre),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Genre post', response); alert('Thank you for your registration!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Genre post', error.message); alert('Genre could not be registered\nError: '+error.message); });
};

/**
 * Edit genre
 */
 export const editGenre = (dataGenre) => (dispatch) => {
  
  var genreId = dataGenre.genreId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');
  //alert(postId);
  return fetch(baseUrlApiRest +  categories + '/categories/' + genreId, {
      method: "PUT",
      body: JSON.stringify(dataGenre),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Edit genre', response); alert('Thank you for your motification!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Edit genre', error.message); alert('Genre could not be edited\nError: '+error.message); });
};

/**
 * Delete genre
 */
 export const deleteGenre = (dataGenre) => (dispatch) => {
  
  var genreId = dataGenre.genreId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');
  
  return fetch(baseUrlApiRest +  categories + '/categories/' + genreId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Delete genre', response); alert('Thank you for your action!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Delete genre', error.message); alert('Post could not be deleted\nError: '+error.message); });
};

/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchPosts = () => (dispatch) => {

  dispatch(postsLoading(true));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest + posts + '/posts', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .then(posts => dispatch(addPosts(posts)))
  .catch(error => dispatch(postsFailed(error.message)));
}

/* Call action type from post reducer */
export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING
});

/* Call action type from post reducer */
export const postsFailed = (errmess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errmess
});

/* Call action type from post reducer */
export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts
});

/**
 * Register post
 */
 export const registerPost = (dataPost) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest +  posts + '/posts', {
      method: "POST",
      body: JSON.stringify(dataPost),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Register post', response); alert('Thank you for your registration!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Register post', error.message); alert('Post could not be registered\nError: '+error.message); });
};

/**
 * Edit post
 */
 export const editPost = (dataPost) => (dispatch) => {
  
  var postId = dataPost.postId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');

  //alert(postId);
  return fetch(baseUrlApiRest +  posts + '/posts/' + postId, {
      method: "PUT",
      body: JSON.stringify(dataPost),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Edit post', response); alert('Thank you for your motification!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Edit post', error.message); alert('Post could not be edited\nError: '+error.message); });
};

/**
 * Delete post
 */
 export const deletePost = (dataPost) => (dispatch) => {
  
  var postId = dataPost.postId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest +  posts + '/posts/' + postId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Delete post', response); alert('Thank you for your action!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Delete post', error.message); alert('Post could not be deleted\nError: '+error.message); });
};
/**
 ***********************************************
 * Login/Logout user JSON web token requests
 ***********************************************
 */

export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))

  return fetch(baseUrlApiRest + user +  '/user/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok) {
          return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
      },
      error => {
          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          // Save user id in local storage to make post requests with id (comments)
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('creds', JSON.stringify(creds));
          // Dispatch the success action
          dispatch(receiveLogin(response));
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => { console.log('Login user', error.message); alert('User could not be authenticated\nError: '+error.message);dispatch(loginError(error.message)); }   ) 
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(receiveLogout())
}

/**
 * Register user
 */
export const registerUser = (dataUser) => (dispatch) => {
  
  return fetch(baseUrlApiRest +  user +  '/user/register', {
      method: "POST",
      body: JSON.stringify(dataUser),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Register user', response); alert('Thank you for your registration!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Register user', error.message); alert('User could not be registered\nError: '+error.message); });
};

/* Request to Django Rest framework and show error or proceed to dispatch the data  */
export const fetchUserData = () => (dispatch) => {

  dispatch(UserDataLoading(true));
  
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest + users + '/users', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .then(user_data => dispatch(addUserData(user_data)))
  .catch(error => dispatch(UserDataFailed(error.message)));
}

/* Call action type from UserData reducer */
export const UserDataLoading = () => ({
    type: ActionTypes.USER_DATA_LOADING
});

/* Call action type from UserData reducer */
export const UserDataFailed = (errmess) => ({
    type: ActionTypes.USER_DATA_FAILED,
    payload: errmess
});

/* Call action type from UserData reducer to add one UserData */
export const addUserData = (user_data) => ({
  type: ActionTypes.ADD_USER_DATA,
  payload: user_data
});

/**
 * Register users
 */
 export const registerUsers = (dataUser) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');
  
  return fetch(baseUrlApiRest +  users +  '/users', {
      method: "POST",
      body: JSON.stringify(dataUser),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Register user', response); alert('Thank you for your registration!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Register user', error.message); alert('User could not be registered\nError: '+error.message); });
};

/**
 * Edit users
 */
 export const editUsers = (dataUser) => (dispatch) => {
  console.log(dataUser);

  var userId = dataUser.userId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest +  users +  '/users/' + userId, {
      method: "PUT",
      body: JSON.stringify(dataUser),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Edited user', response); alert('Thank you for your editation!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Edited user', error.message); alert('User could not be edited\nError: '+error.message); });
};

/**
 * Delete users
 */
 export const deleteUsers = (dataUser) => (dispatch) => {
  
  // Link set formdata to send post request 
  // https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
  var userId = dataUser.userId + '';

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrlApiRest +  users +  '/users/' + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Delete user', response); alert('Thank you for your delete!\n'+JSON.stringify(response)); })
  .catch(error =>  { console.log('Delete user', error.message); alert('User could not be deleted\nError: '+error.message); });
};