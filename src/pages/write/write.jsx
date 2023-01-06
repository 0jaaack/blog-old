import { useState } from "react";
import ConfirmPasswored from "../../components/sections/ConfirmPassword";
import PostWritingSection from "../../components/sections/PostWritingSection";

function Write() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {authenticated ? (
        <PostWritingSection />
      ) : (
        <ConfirmPasswored
          onConfirm={() => setAuthenticated(true)}
        />
      )}
    </>
  );
}

export default Write;
