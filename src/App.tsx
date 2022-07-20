import { useEffect, useState } from 'react';
import {Container, Button, Col, Row, Stack } from 'react-bootstrap';
import './App.css';

function App() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['lalLinks'], function (result: any) {
      setLinks(result.lalLinks);
    })
  }, [links]);

  return (
    <div className="App">
      <Container>
        <h4>Meine Links</h4>
        {links.length != 0 && links.map((link, index) => (
          <Row>
            <Col>Title</Col>
            <Col className="justify-content-end">
              <Stack direction="horizontal" gap={1}>
                <Button className="m" size="sm" target="_blank" href={link}>Watch</Button>
                <Button size="sm" onClick={async () => await deleteLink(index)}>Delete</Button>
              </Stack>
            </Col>
          </Row>))}

        {links.length == 0 &&
          <p>Keine Links verfügbar</p>
        }
      </Container>
    </div>
  );

  async function deleteLink(index: number) {
    links.splice(index, 1);
    chrome.storage.local.set({ 'lalLinks': links }, () => {
    });
    setLinks(links);
  }
}

export default App;
