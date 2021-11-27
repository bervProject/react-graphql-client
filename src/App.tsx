import { Box, Container, Heading, Section } from "react-bulma-components";
import AppHeader from "./AppHeader";
import Notes from "./Notes";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Section>
        <Container>
          <Heading>GraphQL Client Example</Heading>
          <Heading subtitle>
            Notes App
          </Heading>
          <Box>
            <Notes />
          </Box>
        </Container>
      </Section>
    </div>
  );
}

export default App;
