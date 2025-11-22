const router = require('express').Router();
const Blog = require('../Schema/blogSchema'); 

router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = 'https://jozzycodes.com';

        const staticPaths = [
            '/',
            '/pricing',
            '/portfolio',
            "/website-developer-in-lagos",
            "/website-developer-in-nigeria",
            "/affordable-website-design-lagos",
            '/blog',
            '/gb',
            '/gb/pricing',
            '/gb/portfolio',
            '/gb/blog',
        ];

        // Fetch blog slugs
        const blogs = await Blog.find({}, 'slug updatedAt');

        const blogPaths = blogs.map(blog => ({
            path: `/blog/${blog.slug}`,
            lastmod: blog.updatedAt || new Date()
        }));

        const gbBlogPaths = blogs.map(blog => ({
            path: `/gb/blog/${blog.slug}`,
            lastmod: blog.updatedAt || new Date()
        }));

        const staticUrlObjects = staticPaths.map(path => ({
            path,
            lastmod: new Date()
        }));

        const allPaths = [...staticUrlObjects, ...blogPaths, ...gbBlogPaths];

        // Build XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${allPaths.map(item => `
  <url>
    <loc>${baseUrl}${item.path}</loc>
    <lastmod>${new Date(item.lastmod).toISOString()}</lastmod>
  </url>
`).join('\n')}
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);

    } catch (err) {
        console.error('Error generating sitemap:', err);
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
