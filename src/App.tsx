import { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Stack } from 'react-bootstrap';

function App() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['lalLinks'], function (result: any) {
      setLinks(result.lalLinks);
    })
  }, [links]);

  return (
    <Container className="m-3">
      <h4>Meine Links</h4>
      {links.length != 0 && links.map((link, index) => (
        <Row className="my-1">
          <Col><Row className="align-content-center"><p>Link</p></Row></Col>
          <Col></Col>
          <Col>
            <Row className="align-content-center">
              <Stack direction="horizontal" gap={1}>
                <Button size="sm" target="_blank" href={link}>Watch</Button>
                <Button size="sm" onClick={async () => await deleteLink(index)}>Delete</Button>
              </Stack>
            </Row>
          </Col>
        </Row>
      ))
      }

      {links.length == 0 &&
        <p>Keine Links verfügbar</p>
      }
    </Container>
  );

  async function deleteLink(index: number) {
    links.splice(index, 1);
    chrome.storage.local.set({ 'lalLinks': links }, () => {
    });
    setLinks(links);
  }
}

export default App;
