import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Challenges from './pages/challenges/challenges'
// import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import ChallengeHub from './pages/challengeHub/challengeHub';
import Store from './pages/store/store'
import AddChallenge from './pages/Admin/admin';
import AppNavbar from './components/react-bootstrap-nav/Navbar'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import './App.css'

// // Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [petData, setPetData] = useState({});

  return (
    // REPLACE WITH APOLLOPROVIDER WHEN WE CAN
    <ApolloProvider client={client}>
    <div className="App">
      <Router>
        <>
          <AppNavbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/challenges' component={ChallengeHub} />
            <Route exact path='/challenges/:questionId' component={Challenges}/>
            <Route exact path='/store' component={Store} />
            <Route exact path='/admin' component={AddChallenge} />
            

            {/* <Route exact path='/login' component={Login} /> */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <Footer />
        </>
      </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
