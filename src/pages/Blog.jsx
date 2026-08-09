import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import Seo from "@/components/Seo"
import { DEFAULT_OG_IMAGE, breadcrumbSchema } from "@/lib/seo"

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await base44.entities.BlogPost.list("-created_date", 50)
        setPosts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading blog posts:", error)
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

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

  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%]">
      <Seo
        title="Insights & Analysis"
        description="Market insights, analysis, and trends from our team of UAE real estate experts."
        image={DEFAULT_OG_IMAGE}
        url="/blog"
        schema={breadcrumbSchema([
          { name: "Home", url: "https://citywalkrealestatellc.com" },
          { name: "Blog", url: "https://citywalkrealestatellc.com/blog" },
        ])}
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-display-xl font-light mt-3">
            Insights & <span className="italic">Analysis</span>
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Market insights, analysis, and trends from our team of experts.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block"
              >
                <article className="flex flex-col h-full">
                  {post.featured_image && (
                    <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-full w-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-body text-xs tracking-label uppercase text-accent mb-3">
                      {post.category}
                      {post.read_time && ` · ${post.read_time} min read`}
                    </p>
                    <h2 className="font-display text-xl md:text-2xl font-light mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-body text-xs tracking-label uppercase text-foreground">
                      Read More <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
