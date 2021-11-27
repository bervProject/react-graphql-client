import { useMemo, useState } from "react";
import { Button, Columns, Form, Heading } from "react-bulma-components";
import { useQuery, gql } from "@apollo/client";

const NOTES_QUERY = gql`
  query GET_NOTES {
    notesFromEF {
      id
      message
    }
  }
`;

export default function Notes() {
  const [note, setNote] = useState<string>("");
  const { loading, data, refetch } = useQuery<Array<any>>(NOTES_QUERY);

  const addNote = () => {
    if (!!note) {
      console.log("OK");
      setNote("");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <>
      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Note</Form.Label>
            <Form.Control>
              <Form.Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Control>
          </Form.Field>
          <Button color="success" fullwidth onClick={addNote}>
            Add New Note
          </Button>
          <Button
            color="dark"
            fullwidth
            onClick={() => {
              refetch();
            }}
          >
            Refresh Data
          </Button>
        </Columns.Column>
        <Columns.Column>
          <Heading>Note List</Heading>
          <ul>
            {data && data.map((note) => <li key={note.id}>{note.message}</li>)}
          </ul>
        </Columns.Column>
      </Columns>
    </>
  );
}
