import { BLOGS } from "@/constants/blogs";

import BlogCard from "@/components/cards/BlogCard";

export default function Blogs() {
  return (
    <section className="mb-section mx-container">
      <div className="text-4xl font-bold text-white md:text-8xl xl:-mt-6 xl:text-8xl mb-10">
        Read Our Blogs
      </div>
      <div className="mx-auto grid gap-14 max-w-[360px] md:max-w-[720px] md:grid-cols-1 2xl:max-w-none 2xl:grid-cols-2 justify-items-center">
        {BLOGS.map((blog, i) => (
          <BlogCard {...blog} key={`blog-${i}`} />
        ))}
      </div>
    </section>
  );
}
