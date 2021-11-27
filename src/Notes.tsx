import { useMemo, useState } from "react";
import { Button, Columns, Form, Heading } from "react-bulma-components";
import { gql, useMutation, useQuery } from "@apollo/client";

const NOTES_QUERY = gql`
  query GET_NOTES {
    notesFromEF {
      id
      message
    }
  }
`;

const NOTES_MUTATION = gql`
  mutation CREATE_NOTE($message: String!) {
    createNote(message: $message) {
      id
      message
    }
  }
`;

function mapToDataNotes(data: any): Array<any> {
  console.log(data);
  if (data && Array.isArray(data.notesFromEF)) {
    return data.notesFromEF;
  }
  return [];
}

export default function Notes() {
  const [note, setNote] = useState<string>("");
  const { loading, data, refetch } = useQuery(NOTES_QUERY);
  const [createNote, {loading: loadingAdd }] = useMutation(NOTES_MUTATION);

  const addNote = async () => {
    if (!!note) {
      console.log("OK");
      await createNote({
        variables: {
          message: note
        }
      });
      setNote("");
      await refetch();
    } else {
      console.log("ERROR");
    }
  };

  const getDataList = useMemo(() => mapToDataNotes(data), [data]);

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
          <div className="buttons">
            <Button
              color="success"
              fullwidth
              loading={loading || loadingAdd}
              onClick={addNote}
            >
              Add New Note
            </Button>
            <Button
              color="dark"
              fullwidth
              loading={loading || loadingAdd}
              onClick={async () => {
                await refetch();
              }}
            >
              Refresh Data
            </Button>
          </div>
        </Columns.Column>
        <Columns.Column>
          <Heading>Note List</Heading>
          <p className="content">
            <ul>
              {getDataList.map((note) => <li key={note.id}>{note.message}</li>)}
            </ul>
          </p>
        </Columns.Column>
      </Columns>
    </>
  );
}
