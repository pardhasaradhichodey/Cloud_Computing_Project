import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostForm = ({userId,count}) => {
  let temp=count+1
  const [post, setPost] = useState({
    title: '',
    content: '',
    postedBy: userId,
    postId:userId+temp.toString()
  });
  console.log(post);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to send the post data to a server here
    if(post.content===''||post.title===''){
      alert('Missing title or content');
    }
    else{
      try {
        const response =fetch(
          "https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/post",
          {
            mode: "no-cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          }
        );
        window.location.reload(false);
        console.log('Submitted Post:', post);
    // Reset the form
    temp=temp+1;
    setPost({
      title: '',
      content: '',
      postedBy: userId,
      postId:userId+temp.toString()
    });
      } catch (error) {
        console.error("Error during user registration:", error);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={post.content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
