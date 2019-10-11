import React from 'react';
import gql from 'graphql-tag';
import {
    Button,
    Label,
    Grid,
    Cell
} from 'react-foundation';
import { Form as FinalForm, Field } from 'react-final-form';
import client from './apollo';
import { GET_POSTS } from './PostViewer';

const SUBMIT_POST = gql`
  mutation SubmitPost($input: PostInput!) {
    submitPost(input: $input) {
      id
    }
  }
`;

const PostEditor = ({ post, onClose }) => (
    <FinalForm
        onSubmit={async ({ id, author, body }) => {
            const input = { id, author, body };

            await client.mutate({
                variables: { input },
                mutation: SUBMIT_POST,
                refetchQueries: () => [{ query: GET_POSTS }],
            });

            onClose();
        }}
        initialValues={post}
        render={({ handleSubmit, pristine, invalid }) => (
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid small={6}>
                        {post.id ? 'Edit Post' : 'New Post'}
                    </Grid>
                    <Grid>
                        <Cell small={1}>
                            <Label>Author</Label>
                        </Cell>
                        <Cell small={6}>
                            <Field
                                required
                                name="author"
                                className="form-control"
                                component="input"
                            />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell small={1}>
                            <Label>Body</Label>
                        </Cell>
                        <Cell small={6}>
                            <Field
                                required
                                name="body"
                                className="form-control"
                                component="input"
                            />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Button type="submit" disabled={pristine} color="primary">Save</Button>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>
                    </Grid>
                </form>
            </div>
        )}
    />
);

export default PostEditor;