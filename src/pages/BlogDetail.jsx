import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import {
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  blogPostingSchema,
  breadcrumbSchema,
} from "@/lib/seo"

export default function BlogDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      try {
        const data = await base44.entities.BlogPost.get(id)
        if (!cancelled) setPost(data)
      } catch (error) {
        console.error("Error loading blog post:", error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (id) loadPost()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
        <div className="max-w-[1400px] mx-auto text-center py-16">
          <h1 className="font-display text-2xl font-light mb-4">Post Not Found</h1>
          <Link to="/blog" className="font-body text-accent hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const postImage = post.featured_image || DEFAULT_OG_IMAGE
  const postDescription = post.excerpt || post.description || SITE_DESCRIPTION

  return (
    <>
      <Seo
        title={post.title}
        description={postDescription}
        image={postImage}
        url={`/blog/${post.id}`}
        schema={[
          blogPostingSchema({
            headline: post.title,
            description: postDescription,
            author: post.author
              ? { type: "Person", name: post.author }
              : undefined,
            datePublished: post.created_date,
            dateModified: post.updated_date || post.created_date,
            image: postImage,
            slug: post.slug || post.id,
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://citywalkrealestatellc.com" },
            { name: "Blog", url: "https://citywalkrealestatellc.com/blog" },
            { name: post.title, url: `https://citywalkrealestatellc.com/blog/${post.id}` },
          ]),
        ]}
      />

      <div className="min-h-screen bg-white py-12 md:py-24 px-[4%] md:px-[2%]">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center font-body text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            ← Back to Blog
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-display text-display-xl font-light mt-3">
              {post.title}
            </h1>

            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-lg"
              />
            )}

            {post.category && (
              <p className="font-body text-xs tracking-label uppercase text-accent">
                {post.category}
                {post.read_time && ` · ${post.read_time} min read`}
              </p>
            )}

            <div
              className="font-body text-muted-foreground leading-[1.8]"
              dangerouslySetInnerHTML={{
                __html: post.content || post.body || post.excerpt || "",
              }}
            />
          </article>
        </div>
      </div>
    </>
  )
}
