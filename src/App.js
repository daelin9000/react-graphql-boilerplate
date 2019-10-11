import React, { Component } from 'react';
import {
  Button,
  Grid,
  Cell
} from 'react-foundation';

import PostViewer from './PostViewer'
import PostEditor from './PostEditor';

class App extends Component {
  state = {
    editing: null,
  };

  render() {
    const { editing } = this.state;

    return (
      <div>
        <Grid>
          <Cell small={12}>
            <PostViewer
              canEdit={() => true}
              onEdit={(post) => this.setState({ editing: post })}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell small={12}>
            {editing && (
              <PostEditor
                post={editing}
                onClose={() => this.setState({ editing: null })}
              />
            )}
          </Cell>
        </Grid>
        <Grid>
          <Cell small={6}>
            <Button
              className="my-2"
              color="primary"
              onClick={() => this.setState({ editing: {} })}
            >
              New Post
            </Button>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default App;
