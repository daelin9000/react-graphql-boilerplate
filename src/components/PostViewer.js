import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Grid, Cell } from 'react-foundation'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`

const rowStyles = (post, canEdit) => canEdit(post)
        ? { cursor: 'pointer', fontWeight: 'bold' }
        : {}

const PostViewer = ({ canEdit, onEdit }) => (
    <Query query={GET_POSTS}>
        {({ loading, data }) => !loading && (
            <div>
                <Grid>
                    <Cell small={6}>Author</Cell>
                    <Cell small={6}>Body</Cell>
                </Grid>
                {data.posts.map(post => (
                    <Grid
                        key={post.id}
                        style={rowStyles(post, canEdit)}
                        onClick={() => canEdit(post) && onEdit(post)}
                    >
                        <Cell small={6}>{post.author}</Cell>
                        <Cell small={6}>{post.body}</Cell>
                    </Grid>
                ))}
            </div>
        )}
    </Query>
)

PostViewer.defaultProps = {
    canEdit: () => false,
    onEdit: () => null,
}

export default PostViewer