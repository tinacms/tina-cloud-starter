import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "../components/container";
import { Wrapper } from "../components/wrapper";
import { useEditState } from "../utils/editState";

const GoToEditPage: React.FC = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(true);
    router.back();
  }, []);
  return (
    <Wrapper>
      <Container size="large prose prose-xl">
        <h2>Going into edit mode...</h2>
      </Container>
    </Wrapper>
  );
};

export default GoToEditPage;
