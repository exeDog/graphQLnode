const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;
// 2
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: ()=>links,
        link:(parent,args)=>links.filter(link=>link.id === args.id)[0]
    },
    Mutation:{
        post: (parent,args) =>{
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },
        update:(parent,args)=>{
            let linkToUpdate = links.filter(link=>link.id === args.id)[0];
            if(args.description){
                linkToUpdate.description = args.description;
            }
            if(args.url){
                linkToUpdate.url = args.url;
            }
            return linkToUpdate;
        }
    }
};

// 3
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`))