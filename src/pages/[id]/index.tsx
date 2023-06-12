import { GetServerSideProps } from "next";
import { User } from "@/types/User";
import Link from "next/link";

type Props = {
  data: User
}

export default function UserDetails ({ data }: Props) {
  return (
    <main className="max-w-screen-sm mx-auto p-5">
      <div>
        <Link href="/">
          cd ..
        </Link>
        <h2 className="text-lg font-bold">USER DETAILS</h2>
        <table>
          <tbody>
            <tr>
              <td className="pr-2">Name</td>
              <td className="pr-2">:</td>
              <td className="pr-2">{data.name}</td>
            </tr>
            <tr>
              <td className="pr-2">Username</td>
              <td className="pr-2">:</td>
              <td className="pr-2">{data.username}</td>
            </tr>
            <tr>
              <td className="pr-2">Password</td>
              <td className="pr-2">:</td>
              <td className="pr-2">{data.password}</td>
            </tr>
            <tr>
              <td className="pr-2">Status</td>
              <td className="pr-2">:</td>
              <td className="pr-2">{data.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<{
  data: User
}> = async (ctx) => {
  const { params } = ctx;
  const userId = params?.id as 'string';



  const response = await fetch(`http://localhost:5245/Users/${userId}`);
  const data = await response.json();

  // const data = await response.json();



  return {
    props: {
      data
    }
  }
}