# Sandpiper Landscapes Website

This project is built with [Eleventy](https://www.11ty.dev/) and uses an Express.js server for local editing with TinyMCE.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example` and add your TinyMCE API key:

```bash
cp .env.example .env
echo "TINYMCE_API_KEY=your-key" >> .env
```

Build the static site and start the editing server:

```bash
npm start
```

Visit `http://localhost:3000` to view the site.

Access the editor at `http://localhost:3000/admin?file=content/posts/new-post.md`. Adjust the `file` query parameter to edit or create Markdown files.

The homepage hero image is defined in `static/styles.css` using a remote Unsplash URL. Replace this URL with your own image if desired.
