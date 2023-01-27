import { Code, ConnectError } from "@bufbuild/connect-web";
import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { userService } from "../../services/user-service";

export async function submitUserInfo(email: string, password: string): Promise<boolean> {
  try {
    await userService.putUser({
      email: email,
      password: password,
    })
    return true;
  } catch (err) {
    console.log(err)
    if (err instanceof ConnectError) {
      switch (err.code) {
        case Code.InvalidArgument:
          alert('Invalid email or password');
          break;
        case Code.AlreadyExists:
          alert('User already exists');
          break;
        default:
          alert('Something went wrong');
          break;
      }
    } else {
      alert('Something went wrong');
    }
    return false;
  }
}

export default component$(() => {

  const nav = useNavigate();
  const userInfo = useStore({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useClientEffect$(async () => {
    if (window.localStorage.getItem('token')) {
      nav.path = ('/home');
    }
  });

  return (
    <>
      <section>
        <div class="max-w-sm mx-auto pt-8 px-4 sm:pt-6 sm:px-6 h-[60vh]">
          <div class="card rounded-none dark:bg-slate-800">
            <h1 class="text-2xl font-bold leading-tighter text-center tracking-tighter mb-4 mt-1 font-heading">Register</h1>
            <form preventdefault:submit onSubmit$={ async () =>  {
              if (userInfo.password.length < 6) {
                alert('Password must be at least 6 characters');
              } else if (userInfo.password !== userInfo.confirmPassword) {
                alert('Passwords don\'t match');
              } else {
                const res = await submitUserInfo(userInfo.email, userInfo.password);
                if (res) {
                  nav.path = ('/home');
                }
              }
            }}>
              <div class="mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  onInput$={(ev) => { userInfo.email = (ev.target as HTMLInputElement).value; }}
                />
              </div> 
              <div class="mb-4">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  onInput$={(ev) => (userInfo.password = (ev.target as HTMLInputElement).value)}
                />
              </div> 
              <div class="mb-8">
                <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  onInput$={(ev) => (userInfo.confirmPassword = (ev.target as HTMLInputElement).value)}
                />
              </div> 
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            </form>
            <div class="text-center mt-4">
              <a href="/login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Register",
  meta: [
    {
      name: "description",
      content: "Register for an account",
    },
  ],
};
