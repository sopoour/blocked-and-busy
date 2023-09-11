
import MoreStories from './more-stories'

import { getAllPosts } from '@/lib/api'




export default async function Page() {
  const allPosts = await getAllPosts()
  const morePosts = allPosts.slice(1)

  return (
    <div className="container mx-auto px-5">
     
      <MoreStories morePosts={morePosts} />
    </div>
  )
}
