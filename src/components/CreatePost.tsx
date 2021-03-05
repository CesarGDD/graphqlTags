import React, { FormEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CreatePostInput } from '../graphql';

interface Props {
    
}
    const ADD_POST = gql`
    mutation CreatePost(
    $input: CreatePostInput!
  ) {
    createPost(input: $input) {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
    }
  }
    `;


export const CreatePost = (props: Props) => {
    const [postOwnerId, setPostOwnerId] = useState('');
    const [postOwnerUsername, setPostOwnerUsername] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [addPost] = useMutation<CreatePostInput>(ADD_POST);

const addPostHandle = (e: FormEvent) => {
   e.preventDefault();
   addPost({variables: {input: {
        postOwnerId: '55555',
        postOwnerUsername: 'Zafiperro',
        postTitle: postTitle,
        postBody: postBody,
        createdAt: new Date().toISOString()
   }}});
   setPostBody('')
   setPostTitle('')
}
    return (
        <div>
            <form action="" onSubmit={addPostHandle} >
                <input 
                    type="text" 
                    placeholder="title" 
                    name="postTitle" 
                    required 
                    value={postTitle} 
                    onChange={e => setPostTitle(e.target.value)} />
                <textarea 
                    name="postBody" 
                    id="" cols="30" 
                    rows="3" 
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                    placeholder="New Blog Post" />
                <input type="submit"/>
            </form>
        </div>
    )
}
