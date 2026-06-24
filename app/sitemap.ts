import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes = ["", "/competences", "/projets", "/a-propos", "/hockey", "/blog", "/contact", "/quiz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    })),
  ];
}
