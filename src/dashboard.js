import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PostForm from "./PostForm";
import Post from "./Posts";
//import { useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const userId = props.user;
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //const navigate = useNavigate();
  useEffect(() => {
    console.log(userId);
    fetch(
      "https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/user?userId=" +
        userId
    )
      .then((response) => response.json())
      .then((userdata) => {
        setUserData(userdata);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(
      "https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/post?postedBy=" +
        userId
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCount(data.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);
  const HandleSignOut = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
  };
  if (isLoading) {
    return (
      <div>
        <h3>loading...</h3>
      </div>
    );
  }
  else{
  return (
    <div>
      <Container>
        <Row>
          <Col lg={10}>
            <h1 className="mt-4 mb-4">Dashboard</h1>
          </Col>
          <Col>
            <Button style={{ marginTop: "40px" }} onClick={HandleSignOut}>
              Log Out
            </Button>
          </Col>
        </Row>
        <p>Hello, {userData.firstName}</p>
        <Row>
          <Col lg={6}>
            <Container>
              <Row>
                <Col md={6} lg={8}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Create Post</Card.Title>
                      <Card.Text>
                        <PostForm userId={userId} count={count} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <h3>Your Posts</h3>
              {data.map((item) => (
                <Row>
                  <Col lg={11}>
                    <Post post={item} />
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
          <Col>
            <h3>Feed</h3>
            {post.posts.map((item) => (
              <Row>
                <Col lg={11}>
                  <Post post={item} />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );}
};

export default Dashboard;
