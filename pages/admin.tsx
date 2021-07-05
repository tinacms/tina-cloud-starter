import { useEffect } from "react";
import { useRouter } from "next/router";

import { Wrapper } from "../components/helper-components";
import { useEditState } from "tina-graphql-gateway";

const GoToEditPage: React.FC = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(true);
    router.back();
  }, []);
  return (
    <Wrapper data={{}}>
      <div>Going into edit mode...</div>
    </Wrapper>
  );
};

export default GoToEditPage;
