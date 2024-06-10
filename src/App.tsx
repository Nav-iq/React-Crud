import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [id, setId] = useState(0);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [username, setUsername] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const handleEdit = (id: any) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirst(dt[0].name);
      setSecond(dt[0].last);
      setUsername(dt[0].user);
    }
  };

  const handledelete = (id: any) => {
    if (id) {
      if (confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
        localStorage.setItem("data", JSON.stringify(dt));
      } else {
        return;
      }
    }
  };

  const add = (e) => {
    e.preventDefault();

    let error = "";
    if (!second) error += "Please enter last name. ";
    if (!first) error += "Please enter first name. ";
    if (!username) error += "Please enter user name. ";

    if (error === "") {
      e.preventDefault();
      if (first && second && username) {
        const dt = [...data];
        dt.push({ id: dt.length + 1, name: first, last: second, user: username });
        setData(dt);
        localStorage.setItem("data", JSON.stringify(dt));
        clear();
      }
    } else {
      alert(error);
    }
  };

  const clear = () => {
    setIsUpdate(false);
    setId(0);
    setFirst("");
    setSecond("");
    setUsername("");
  };

  const update = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];

    dt[index].name = first;
    dt[index].last = second;
    dt[index].user = username;

    setData(dt);
    localStorage.setItem("data", JSON.stringify(dt));
    clear();
    setIsUpdate(false);
    setId(0);
    setFirst("");
    setSecond("");
    setUsername("");
    return dt[index];
  };

  return (
    <>
      <Container>
        <h1 className="text-center text-tertiary text-uppercase text-lg mt-5">Crud</h1>
        <Row direction="horizontal" gap={3} className="mt-5 align-items-center">
          <Col>
            <Form.Control
              placeholder="First"
              aria-label="First"
              aria-describedby="basic-addon1"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Last"
              aria-label="Last"
              aria-describedby="basic-addon1"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="User Name"
              aria-label="User Name"
              aria-describedby="basic-addon1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col className="d-flex justify-content-end gap-3 align-items-center">
            {isUpdate ? (
              <Button variant="outline-secondary" onClick={() => update()}>
                Update
              </Button>
            ) : (
              <Button variant="outline-secondary" onClick={(e) => add(e)}>
                Add
              </Button>
            )}
            <Button variant="outline-warning" onClick={() => clear()}>
              clear
            </Button>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.last}</td>
                <td>{item.user}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="m-1"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    className="m-1"
                    onClick={() => handledelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
