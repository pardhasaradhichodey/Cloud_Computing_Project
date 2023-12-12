import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PostForm from "./PostForm";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const userId=props.user.userId;
  const [count,setCount]=useState();
  useEffect(() => {
    console.log(props.user.userId);
    fetch(
      "https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/post?postedBy=" +
        props.user.userId
    )
      .then((response) => response.json())
      .then((data) => {setData(data);console.log(data);setCount(data.length)})
      .catch((error) => console.error("Error fetching data:", error));
  },[]);
  return (
    <div>
    <Container>
      <h1 className="mt-4 mb-4">Dashboard</h1>
      <p>Hello, {props.user.firstName}</p>
      <Row>
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Create Post</Card.Title>
              <Card.Text>
                <PostForm userId={userId} count={count}/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3>Your Posts</h3>
      {data.map((item)=>(
        <Row>
        <Col md={6} lg={{ span: 4, offset: 4 }}>
        <Card>
        <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.content}</Card.Text>
        </Card.Body>
        </Card>
        </Col>
      </Row>
      ))}
      
    </Container>
    </div>
  );
};

export default Dashboard;
