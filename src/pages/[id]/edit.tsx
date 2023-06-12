import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { User } from '@/types/User'
import UserForm from '@/components/UserForm'
import Link from 'next/link';

type Props = {
  data: User
}

export default function EditUser ({ data }: Props) {
  const router = useRouter()

  const handleSubmit = (val: User) => {
    fetch(`http://localhost:5245/Users/${val.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    })
    .then((res) => {
      router.push('/')
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
  }

  return (
    <main className="max-w-screen-sm mx-auto p-5">
      
      <UserForm
        title="Update User"
        initialValue={data}
        onSubmit={handleSubmit}
      />
      <Link href="/" className="underline">
        &gt; cd ..
      </Link>
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

