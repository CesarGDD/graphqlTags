import { useQuery, gql, useSubscription } from '@apollo/client';
import  {useEffect, useState} from 'react';
import { onCreatePost, Post } from '../graphql';

interface Props {

}
const RE_POSTS = gql `
subscription onCreatePost {
  onCreatePost {
    createdAt
    id
    postBody
    postOwnerId
    postOwnerUsername
    postTitle
  }
}
`;

const LIST_POSTS = gql`
query {
  listPosts{
    items{
      id
      postOwnerUsername
      postBody
      createdAt
      postTitle
    }
  }
}
`;


export const DisplayPosts = ({}: Props) => {
    const { data, error, loading } = useQuery(LIST_POSTS);
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    //@ts-ignore
    const { data: pushData, error: errorData, loading: loadingData } = useSubscription(RE_POSTS);

    useEffect(()=> {
        if(data) {
            setPosts(data.listPosts.items)
        }
    },[data]);

    return (
        <div>
            {loading ? 'Loading...': null}
            {posts?.map((post: any) => {
                return (
                <div key={post.id} >
                    <h2> {post.postTitle} </h2>
                    <h3> {post.postBody} </h3>
                    <p>wrote by : {post.postOwnerUsername} on {new Date(post.createdAt).toDateString()} </p>
                </div>
                )
            }
            )}
            {console.log(pushData, errorData, loadingData)}
        </div>
    )
}
