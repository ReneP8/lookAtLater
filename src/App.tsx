import { useEffect, useState } from "react";
import { Container, Button, Col, Row, Stack, Table } from "react-bootstrap";

interface LalLink {
  title: string;
  url: string;
}

function App() {
  const [links, setLinks] = useState<LalLink[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    // Todo unlimited loop.
    chrome.storage.local.get(["lalLinks"], function (result: any) {
      let tmpLinks: LalLink[] = [];
      tmpLinks = result.lalLinks ? (result.lalLinks as LalLink[]) : [];
      console.log(tmpLinks);
      setLinks(tmpLinks);
    });
  }, [reload]);

  return (
    <Container className="p-3">
      <h4>My saved Links</h4>
      {links.length !== 0 && (
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr>
                <td>
                  <p>{index + 1}</p>
                </td>
                <td>
                  <p>{link.url}</p>
                </td>
                <td>
                  <Stack gap={1}>
                    <Button size="sm" target="_blank" href={link.url}>
                      Watch
                    </Button>
                    <Button
                      size="sm"
                      onClick={async () => await deleteLink(index)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {links.length === 0 && <p>No links available</p>}
    </Container>
  );

  async function deleteLink(index: number) {
    links.splice(index, 1);
    chrome.storage.local.set({ lalLinks: links }, () => {});
    setLinks(links);
    setReload(!reload);
  }
}

export default App;
