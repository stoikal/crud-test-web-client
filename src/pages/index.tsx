import Link from 'next/link';
import { useState } from 'react'
import { Status, User } from '@/types/User'

type Props = {
  data: User[]
}

function Home({ data }: Props) {
  const [users, setUsers] = useState(data)

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5245/Users');
    const data = await response.json();

    setUsers(data)
  }


  const getStatus = (status: Status) => {
    const statusMap: Record<Status, string> = {
      0: 'Inactive',
      1: 'Active'
    }

    return statusMap[status]
  }

  const handleDelete = (id: number) => () => {
    fetch(`http://localhost:5245/Users/${id}`, {
      method: 'DELETE'
    })
    .then((res) => {
      fetchUsers()
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
  }

  return (
    <div
      className="max-w-screen-sm mx-auto p-4"
    >
      <header
        className="flex justify-between items-center mb-6"
      >
        <h1
          className="text-xl font-bold uppercase"
        >
          Users
        </h1>
        <Link
          href="/create"
          className="bg-blue-500 px-3 py-2 rounded text-white"
        >
          +add user
        </Link>
      </header>

      <div>
        <table
          className="border w-full"
        >
          <thead
            className="border font-bold"
          >
            <tr>
              <td className="border p-2">ID</td>
              <td className="border p-2">Name</td>
              <td className="border p-2">Username</td>
              <td className="border p-2">Status</td>
              <td className="border p-2">Action</td>
            </tr>
          </thead>

          <tbody>
            {
              users.map((user) => (
                <tr
                  key={user.id}
                >
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">
                    <Link
                      href={`/${user.id}`}
                      className="underline"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{getStatus(user.status)}</td>
                  <td className="border p-2">
                    <Link
                      href={`/${user.id}/edit`}
                      className="underline pr-3"
                    >
                      edit
                    </Link>
                    <button
                      type="button"
                      className="underline text-red-800"
                      onClick={handleDelete(user.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  // Fetch data from an API or perform any asynchronous operations
  const response = await fetch('http://localhost:5245/Users');
  const data = await response.json();

  return { data };
};


export default Home;