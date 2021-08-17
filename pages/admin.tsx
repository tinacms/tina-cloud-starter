import { useRouter } from "next/router";
import { Button } from "tinacms";
import { Container } from "../components/container";
import { Section } from "../components/section";
import { useEditState } from "tinacms/dist/edit-state";
import { ThemeContext } from "../components/theme";
import React from "react";
import {
  buttonColorClasses,
  invertedButtonColorClasses,
} from "../components/actions";

const GoToEditPage: React.FC = () => {
  const { edit, setEdit } = useEditState();
  const router = useRouter();
  const theme = React.useContext(ThemeContext);
  return (
    <Section className="flex-1">
      <Container size="large prose prose-xl">
        <h1 className="w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font">
          Welcome to the Admin page
        </h1>
        {!edit && (
          <>
            <p className="mt-5 mb-5">
              Thanks for using{" "}
              <a className="underline" href="https://tina.io">
                TinaCMS!
              </a>{" "}
              Please login with Tina Cloud. Once you are logged in you will be
              able to edit your site.
            </p>
          </>
        )}
        {edit && (
          <>
            <p className="mt-5 mb-5">
              You are now logged in and in edit mode! You can now to to the home
              page and begin to make content changes
            </p>
          </>
        )}
        <div className="flex flex-wrap items-center gap-y-4 gap-x-6 ">
          <button
            className={`z-10 relative flex items-center px-7 py-3 font-semibold text-lg transition duration-150 ease-out  rounded transform focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap ${
              invertedButtonColorClasses[theme.color]
            }`}
            onClick={() => {
              router.push("/");
            }}
          >
            Go to the home page
          </button>
          <button
            className={`z-10 relative flex items-center px-7 py-3 font-semibold text-lg transition duration-150 ease-out  rounded transform focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap ${
              buttonColorClasses[theme.color]
            }`}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "Logout of TinaCMS" : "Login with TinaCMS"}
          </button>
        </div>
        Or{" "}
        <span
          className="underline hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          Click here
        </span>{" "}
        to go back
      </Container>
    </Section>
  );
};

export default GoToEditPage;
