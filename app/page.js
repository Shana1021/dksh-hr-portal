import clientPromise from '../lib/mongodb'

export default async function Home() {
  const client = await clientPromise;
  console.log(client);

  return (
    <h1>test</h1>
  )
}
