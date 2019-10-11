const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');
const jwtAuthz = require('express-jwt-authz');

const POSTS = [
	{ author: "John Doe", body: "Hello world" },
	{ author: "Jane Doe", body: "Hi, planet!" },
];

const schema = buildASTSchema(gql`
	type Query {
		posts: [Post]
		post(id: ID!): Post
	}

	type Mutation {
		submitPost(input: PostInput!): Post
	}

	input PostInput {
		id: ID
		author: String!
		body: String!
	}

	type Post {
		id: ID
		author: String
		body: String
	}
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
	posts: () => POSTS.map(mapPost),
	post: ({ id }) => mapPost(POSTS[id], id),
	submitPost: ({ input: { id, author, body } }) => {
		const post = { author, body };
		let index = POSTS.length;

		if (id != null && id >= 0 && id < POSTS.length) {
			if (POSTS[id].author !== author) return null;

			POSTS.splice(id, 1, post);
			index = id;
		} else {
			POSTS.push(post);
		}

		return mapPost(post, index);
	},
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true,
}));
// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const authConfig = {
	domain: "daelin9000.auth0.com",
	audience: "boilerplate"
};

// Create middleware for checking the JWT
const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
	}),

	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithm: ["RS256"]
});

app.get("/api/external", checkJwt, jwtAuthz(['view:posts']), (req, res) => {
	res.send({
		msg: "Your Access Token was successfully validated!"
	});
});

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);