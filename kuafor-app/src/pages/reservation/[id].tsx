import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id, foo } = router.query

  return <p>Post: {id} Deneme : {foo}</p>
}

export default Post