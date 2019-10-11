import React, { Fragment, useState } from "react";
import {
    Button,
    Grid,
    Cell
} from 'react-foundation';
import PostViewer from './PostViewer'
import PostEditor from './PostEditor';

const Posts = () => {

    const [editing, setEditing] = useState();

    return (
        <Fragment>
            <Grid>
                <Cell small={12}>
                    <PostViewer
                        canEdit={() => true}
                        onEdit={(post) => setEditing(post)}
                    />
                </Cell>
            </Grid>
            <Grid>
                <Cell small={12}>
                    {editing && (
                        <PostEditor
                            post={editing}
                            onClose={() => setEditing(null)}
                        />
                    )}
                </Cell>
            </Grid>
            <Grid>
                <Cell small={6}>
                    <Button
                        className="my-2"
                        color="primary"
                        onClick={() => setEditing({})}
                    >
                        New Post
            		</Button>
                </Cell>
            </Grid>
        </Fragment>
    );
};

export default Posts;