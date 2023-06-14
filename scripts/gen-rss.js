const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Your Name',
    site_url: 'https://tannerb.dev',
    feed_url: 'https://tannerb.dev/feed.xml'
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', 'posts'))
  const allPosts = []
  await Promise.all(
    posts.map(async (name) => {
      const filepath = path.join(__dirname, '..', 'pages', 'posts', name);
      const stat = await fs.stat(filepath);

      if (stat.isFile()) {
        const content = await fs.readFile(filepath)
        const frontmatter = matter(content)

        allPosts.push({
          title: frontmatter.data.title,
          url: '/posts/' + name.replace(/\.mdx?/, ''),
          date: frontmatter.data.date,
          description: frontmatter.data.description,
          categories: frontmatter.data.tag.split(', '),
          author: frontmatter.data.author
        })
      }
    })
  )

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  allPosts.forEach((post) => {
    feed.item(post)
  })
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
