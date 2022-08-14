import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import Card from '../components/Card';
import { useStore } from '../state/loginState';

const getUsers = async () => {
  return axios
    .get('https://random-data-api.com/api/users/random_user?size=10')
    .then((res) => res.data);
};

export function Index() {
  const { isAuth, login, logout } = useStore();

  const { data, isLoading, error, isFetching } = useQuery(['users'], getUsers);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error?.message;

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block"> Welcome to the App 👀</span>

          <div>{isFetching ? 'Updating...' : ''}</div>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              onClick={() => logout()}
            >
              Logout
            </a>
          </div>
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-800 hover:bg-purple-600"
              onClick={() => login()}
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {isAuth && (
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
