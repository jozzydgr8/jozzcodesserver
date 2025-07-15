
const router = require('express').Router();
const Blog = require('../Schema/blogSchema'); // adjust path as needed

router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = 'https://jozzycodes.com'; // Replace with your domain
        const staticPaths = [
            '/',
            '/pricing',
            '/portfolio',
            '/blog',
            '/gb',
            '/gb/pricing',
            '/gb/portfolio',
            '/gb/blog',
        ];

        // Fetch blog slugs from MongoDB
        const blogs = await Blog.find({}, 'slug'); // Only fetch the slug field
        const blogPaths = blogs.map(blog => `/blog/${blog.slug}`);
        const gbBlogPaths = blogs.map(blog => `/gb/blog/${blog.slug}`);

        const allPaths = [...staticPaths, ...blogPaths, ...gbBlogPaths];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(path => `
  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`).join('\n')}
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (err) {
        console.error('Error generating sitemap:', err);
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
