import { useRouter } from 'next/router';
import UserForm from '@/components/UserForm'
import { User } from '@/types/User'
import Link from 'next/link';

const initialValue = {
  id: 0,
  name: '',
  username: '',
  password: '',
  status: '1'
} as User

export default function CreateUser () {
  const router = useRouter()

  const handleSubmit = async (val: User) => {
    
    fetch('http://localhost:5245/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response or do any other necessary actions
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
        title="Create User"
        initialValue={initialValue}
        onSubmit={handleSubmit}
      />
            <Link href="/" className="underline">
        &gt; cd ..
      </Link>
    </main>
  )
}