import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { userService } from "../../services/user-service";

export async function deleteAccount() {
  try {
    await userService.deleteUser({});
    return true;
  } catch (err) {
    console.log(err)
    alert("There wasa problem deleting your account.")
    return false;
  }
}

export default component$(() => {
  const nav = useNavigate();
  const store = useStore({
    showModal: false,
  });

  return (
    <>
      <div class="max-w-sm mx-auto pt-8 px-4 sm:pt-6 sm:px-6 h-[60vh]">
        <button 
          onClick$={() => { store.showModal = true; }}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Delete Account
        </button>

        { store.showModal && <div class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
          <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800">Modal title</h5>
              </div>
              <div class="modal-body relative p-4">
                <p>This is a vertically centered modal.</p>
              </div>
              <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button 
                  onClick$={() => { store.showModal = false; }}
                  type="button"
                  class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                  Cancel
                </button>
                <button 
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  onClick$={ async () => {
                    store.showModal = false;
                    const res = await deleteAccount();
                    if (res) {
                      window.localStorage.removeItem('token'); 
                      nav.path = ('/register');
                    }
                  }}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div> }

      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Account",
  meta: [
    {
      name: "description",
      content:
        "Manage account details",
    },
  ],
};
