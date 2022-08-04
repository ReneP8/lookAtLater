import { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Stack } from 'react-bootstrap';

interface LalLink {
  title: string;
  url: string;
}

function App() {
  const [links, setLinks] = useState<LalLink[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    // Todo unlimited loop.
    chrome.storage.local.get(['lalLinks'], function (result: any) {
      let tmpLinks: LalLink[] = [];
      tmpLinks = result.lalLinks ? result.lalLinks as LalLink[] : [];
      console.log(tmpLinks);
      setLinks(tmpLinks);
    })
  }, [reload]);

  return (
    <Container className="m-3">
      <h4>Meine Links</h4>
      {links.length != 0 && links.map((link, index) => (
        <Row className="my-1">
          <Col><Row className="align-content-center"><p>{link.title}</p></Row></Col>
          <Col></Col>
          <Col>
            <Row className="align-content-center">
              <Stack direction="horizontal" gap={1}>
                <Button size="sm" target="_blank" href={link.url}>Watch</Button>
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
    setReload(!reload);
  }
}

export default App;
