import { component$, Resource, useClientEffect$, useResource$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { userService } from "../../services/user-service";

import Hero from "~/components/widgets/Hero";

export default component$(() => {
  const userInfo = useStore({ email: '' });
  const nav = useNavigate();

  useClientEffect$(async () => {
    try {
      userInfo.email = await userService.getUser({}).then((res) => {
        if (res.user?.email) {
          return res.user.email
        } 
        else { 
          window.localStorage.removeItem('token');
          nav.path = ('/login');
          return '';
        }
      });
    } catch (err) {
      window.localStorage.removeItem('token');
      console.log(err);
      nav.path = ('/login');
    }
  });

  return (
    <>
      <h2 class="text-center">Welcome {userInfo.email}</h2>
      <Hero />
    </>
  );
});

export const head: DocumentHead = {
  title: "Home - Welcome",
  meta: [
    {
      name: "description",
      content:
        "Home page of basic user login and registration with Qwik.",
    },
  ],
};

function useTask$(arg0: () => Promise<void>) {
  throw new Error("Function not implemented.");
}

