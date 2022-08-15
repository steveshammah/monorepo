import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import Card from '../components/Card';
import { useStore } from '../state/loginState';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const getUsers = async () => {
  return axios
    .get('https://random-data-api.com/api/users/random_user?size=10')
    .then((res) => res.data);
};

const imageUrl = 'https://picsum.photos/200/300/?random';
export function Index() {
  const { isAuth, login, logout } = useStore();
  const { data: session } = useSession();

  // const router = useRouter();

  const { data, isLoading, error, isFetching } = useQuery(['users'], getUsers);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error?.message;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between ">
        <div className="flex-column ">
          <div className="mb-5">
            <img
              src={session ? session.user.image : imageUrl}
              alt="user profile"
              className="h-24 w-24 rounded-full shadow-xl"
            />
            <h2 className="text-black-800 font-bold text-lg">
              {session?.user.name}
            </h2>
            <p className="text-gray-500 text-sm">{session?.user?.email}</p>
          </div>
          <h2 className="font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-2xl"> Welcome to the App 👀</span>

            <div className="text-2xl">{isFetching ? 'Updating...' : ''}</div>
          </h2>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {session ? (
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                onClick={() => {
                  signOut();
                  logout();
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-800 hover:bg-purple-600"
                onClick={() => {
                  signIn();
                  login();
                }}
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>

      {session && (
        <>
          <div className="p-2 bg-gray-200 ">
            <h2 className="text-xl font-black block">Users</h2>
            <ul className="flex pt-3 flex-wrap justify-around align-start">
              {data.map((user) => (
                <Card key={user.id} person={user} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
