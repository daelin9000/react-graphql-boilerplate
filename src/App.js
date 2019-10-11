import React, { useState } from 'react';
import {
	Button,
	Grid,
	Cell
} from 'react-foundation';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-wrapper";
import PostViewer from './PostViewer'
import PostEditor from './PostEditor';

const App = (props) => {

	const [editing, setEditing] = useState();

	const { loading } = useAuth0();

	if (loading) {
		return (
			<div>Loading...</div>
		);
	}

	return (
		<div>
			<header>
				<NavBar />
			</header>
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
		</div>
	)
}

export default App;
