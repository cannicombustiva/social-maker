import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import  { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const { user } = useContext(AuthContext);
    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);
      

    return (
        <Grid columns={3} >
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm></PostForm>
          </Grid.Column>
        )}
          {loading ? (
              <h1>Loading Posts...</h1>
          ) : (
              data?.getPosts.map(post => (
                  <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                      <PostCard post={post} />
                  </Grid.Column>
              ))
          )}
        </Grid.Row>
    </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;