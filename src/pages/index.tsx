type Status = '0' | '1'

type User ={
  userid: string
  namalengkap: string
  username: string
  status: Status
}

type Props = {
  data: User[]
}

function Home({ data }: Props) {

  console.log('===~props~===', data)
  return (
    <main
      className="max-w-screen-sm mx-auto"
    >
      <div>
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>username</td>
              <td>status</td>
            </tr>
          </thead>

          <tbody>
            {
              data.map((user) => (
                <tr key={user.userid}>
                  <td>{user.userid}</td>
                  <td>{user.namalengkap}</td>
                  <td>{user.username}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}

Home.getInitialProps = async () => {
  // Fetch data from an API or perform any asynchronous operations
  const response = await fetch('http://localhost:5245/Users');
  const data = await response.json();

  return { data };
};


export default Home;