import { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
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
        {links.length != 0 && links.map((link, index) => (
          <Card>
            <Card.Body>Title <Button size="sm" target="_blank" href={link}>Watch</Button> <Button size="sm" onClick={async () => await deleteLink(index)}>Delete</Button></Card.Body>
          </Card>))}
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
