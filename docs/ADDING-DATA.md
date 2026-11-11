# Adding Data to the Website

Everything you see on the site (brands, categories, products, blog posts, business details) comes from plain text **JSON files**. You never edit page code. Add or change an entry in a JSON file, publish, and the new pages, links, sitemap entries and search-engine data are created automatically.

## 1. Where the data lives

| What you want to change | File | Pages it creates |
|---|---|---|
| Business name, phone, address, opening hours | `src/data/site.json` | Header, footer, contact page, Google business data |
| Brands (CenturyPly, Greenply…) | `src/data/brands.json` | `/brands/<slug>` and the home page brand wall |
| Categories (Plywood, Laminates…) | `src/data/categories.json` | `/categories/<slug>` and the home page category tiles |
| Products | `src/data/products.json` | `/products/<slug>` |
| Blog posts | `src/data/blog/<slug>.json` (one file per post) | `/blog/<slug>` |
| Images and logos | `public/img/`, `public/brands/` | Referenced from the JSON above |

Everything else is automatic: the menu, sitemap, page titles, Google structured data, the "related products" lists, product counts on cards and the reading time on blog posts.

## 2. The 60-second workflow

1. **Edit** the JSON file in any code editor (VS Code is ideal because it underlines JSON mistakes).
2. **Preview:** run `npm run dev` in the project folder and open http://localhost:3000.
3. **Check** the build catches no mistakes: run `npm run build`. If anything is wrong it stops and tells you exactly which file and entry (see section 8).
4. **Publish** with your normal deployment (for example, push to Git if the site is on Vercel).

## 3. JSON rules (the 5 things that cause most mistakes)

- Text goes in **double quotes**: `"name": "Greenply"`. Single quotes are not allowed.
- Numbers have **no quotes and no commas**: `"priceFrom": 1150` (not `"1,150"` or `"₹1150"`).
- Items in a list or object are separated by a **comma**, but there is **no comma after the last item**.
- Each entry in `brands.json`, `categories.json` and `products.json` sits inside the outer `[ ... ]`, wrapped in `{ ... }`, separated by commas.
- Don't put a line break inside a quoted text value. Keep each text on one line.

## 4. Slugs: the most important field

Every brand, category, product and post has a **`slug`**. It becomes the web address and is how things link to each other.

- Use only lowercase letters, numbers and hyphens: `greenply-bwp-marine-plywood`
- It must be **unique** within its file.
- Products point to brands and categories **by slug**. If a product says `"brand": "greenply"`, a brand with slug `greenply` must exist.
- **Don't change a slug after the page is live.** The old address will stop working (404) and anything linking to it breaks. If you must, tell your developer so a redirect can be added.

## 5. Adding things

### 5.1 Add a brand

Add this inside the `[ ]` of `src/data/brands.json` (remember the comma after the previous entry):

```json
{
  "slug": "newbrand",
  "name": "NewBrand",
  "tagline": "A short line under the brand name",
  "description": "Two or three sentences about what the brand offers and what you stock.",
  "website": "https://www.newbrand.com",
  "categories": ["laminates", "veneers-panels"],
  "featured": true
}
```

| Field | Required | Notes |
|---|---|---|
| `slug` | Yes | Unique, lowercase, hyphens |
| `name` | Yes | Shown everywhere |
| `tagline` | Yes | Short, one line |
| `description` | Yes | Shown on the brand page |
| `categories` | Yes | List of category **slugs** this brand covers. Every slug must exist in `categories.json`. Keep it in sync with the brand's products |
| `featured` | Yes | `true` or `false` (see below) |
| `website` | No | Full link starting with `https://` |
| `logo` | No | Path to a logo file, e.g. `"/brands/newbrand.png"`. Without it a monogram (initials) is shown |
| `seo` | No | See section 6 |

**What `featured` does:** every brand always appears on the home page brand wall. `featured: true` makes that brand's **products appear first** in the home page "Featured products" row (up to 8 products are shown).

**Adding a logo:** save the file in `public/brands/` (create the folder if needed), then set `"logo": "/brands/newbrand.png"`. Use a PNG, SVG or WebP with a transparent or white background. It is displayed at about 120 × 56 px, so a wide, simple logo works best.

### 5.2 Add a category

Add to `src/data/categories.json`:

```json
{
  "slug": "hardware-fittings",
  "name": "Hardware & Fittings",
  "image": "/img/hardware-fittings.svg",
  "description": "One or two sentences about this category."
}
```

All four fields are required (`seo` is optional). Put the image file in `public/img/` and make sure the `image` path matches the file name exactly. A good image is landscape, about 1200 × 900 px. Text on the category tile sits over a dark gradient, so avoid very bright images with important detail at the bottom.

A new category appears on the home page, the categories page, the products page (as a group with a jump button), the footer and the sitemap. It stays empty until at least one product uses its slug.

### 5.3 Add a product

Add to `src/data/products.json`:

```json
{
  "slug": "greenlam-matte-laminate",
  "name": "Greenlam Matte Laminate",
  "brand": "greenlam",
  "category": "laminates",
  "priceFrom": 1250,
  "priceUnit": "per sheet",
  "sizes": ["0.8 mm", "1 mm"],
  "specs": [
    { "label": "Thickness", "value": "0.8 / 1 mm" },
    { "label": "Finish", "value": "Matte" },
    { "label": "Sheet size", "value": "8 x 4 ft" },
    { "label": "Warranty", "value": "As per brand warranty" }
  ],
  "features": [
    "Fingerprint-resistant surface",
    "Suited to wardrobe shutters and kitchen units"
  ],
  "description": "Two or three sentences describing the product and where it is used."
}
```

| Field | Required | Notes |
|---|---|---|
| `slug` | Yes | Unique, lowercase, hyphens |
| `name` | Yes | Include the brand name for better search results |
| `brand` | Yes | Brand **slug**; the brand must already exist |
| `category` | Yes | Category **slug**; the category must already exist |
| `specs` | Yes | A table of `label` / `value` pairs. 3 to 6 rows work best. Put **Thickness** or **Finish** first because the product cards show it |
| `description` | Yes | Also used as the Google description (first 160 characters) |
| `priceFrom` | No | A plain number in rupees. Leave it out to show "Ask for a quote" |
| `priceUnit` | No | Shown after the price, e.g. `"per sheet"` or `"per sq ft"`. Use it together with `priceFrom` |
| `sizes` | No | Short list of thickness or size options. Shown as chips (cards show the first two) |
| `features` | No | Bullet points with a tick on the product page |
| `images` | No | See 5.5. If left out, the category image is used |
| `seo` | No | See section 6 |

**Prices:** only enter prices you can honour. The page tells visitors that prices vary by thickness and stock, so a starting price is enough. Only `priceFrom` is checked as a number; don't write the ₹ symbol, the site adds it.

### 5.4 Add a blog post

Create a **new file** in `src/data/blog/`. Name it after the slug, e.g. `src/data/blog/choosing-a-kitchen-laminate.json`:

```json
{
  "slug": "choosing-a-kitchen-laminate",
  "title": "How to Choose a Laminate for Your Kitchen",
  "excerpt": "One or two sentences shown on the blog list and in Google results.",
  "cover": "/img/laminates.svg",
  "date": "2026-11-20",
  "author": "Comfort Nest Team",
  "content": [
    { "type": "p", "text": "An opening paragraph." },
    { "type": "h2", "text": "A section heading" },
    { "type": "p", "text": "A paragraph under that heading." },
    { "type": "ul", "items": ["First point", "Second point", "Third point"] }
  ]
}
```

The `content` list is built from three block types, in the order you want them:

| Block | Looks like | Example |
|---|---|---|
| `p` | A paragraph | `{ "type": "p", "text": "..." }` |
| `h2` | A section heading (these also build the "On this page" contents list) | `{ "type": "h2", "text": "..." }` |
| `ul` | A bullet list | `{ "type": "ul", "items": ["...", "..."] }` |

Notes:
- `date` must be written `YYYY-MM-DD`. The newest post is shown first and as the featured post.
- Reading time and the contents list are created automatically.
- Use at least two or three `h2` headings. Search engines and readers both like a clear structure.
- No other block types exist. Don't invent `"type": "image"` and similar; the build will fail.
- Aim for useful, accurate content of 300 words or more, written about a real question customers ask.

### 5.5 Images

- Put image files in `public/img/` (or `public/brands/` for logos). A file `public/img/my-photo.jpg` is referenced in JSON as `"/img/my-photo.jpg"`, with a **leading slash** and **no `public`** in the path.
- **Images must be stored in the project.** Pasting a link to an image on another website does not work.
- Use JPG, PNG, WebP or SVG. Photos are best as **WebP or JPG, about 1200 × 900 px, under 300 KB**. Compress large photos first (for example at squoosh.app).
- File names: lowercase, hyphens, no spaces.
- **Product photos:** list them in `"images": ["/img/my-product.jpg"]`. At the moment only the **first** image in the list is displayed, so put the best one first. If you leave `images` out, the product uses its category's image.
- Social networks (WhatsApp, Facebook) can't show SVG previews, so the site automatically uses a generated preview image instead when a page's picture is an SVG. For the best link previews, use JPG/WebP photos.

### 5.6 Change business details

Edit `src/data/site.json`. These feed the header, footer, contact page and the Google "local business" data, so they must be correct before launch:

| Field | Notes |
|---|---|
| `name`, `tagline`, `description` | Brand name and the default search-engine text |
| `siteUrl` | The real website address with `https://`, no trailing slash. **Must be changed before launch** or every canonical link and sitemap entry points to the wrong site |
| `phone` | Shown to visitors, e.g. `"+91 98765 43210"` |
| `whatsapp` | Digits only with country code, e.g. `"919876543210"` (used for the WhatsApp buttons) |
| `email` | Used for the Email button and footer |
| `address` | `street`, `city`, `region`, `postalCode`, `country` (2-letter code, e.g. `IN`) |
| `geo` | `lat` and `lng` numbers (find them by right-clicking your shop on Google Maps) |
| `hours` | List of `{ "days": "Monday-Saturday", "opens": "10:00", "closes": "20:00" }`. Use 24-hour times. For a range write the days with a hyphen, e.g. `Monday-Saturday`, or a single day, e.g. `Sunday` |
| `socials` | Full links; leave out any you don't use |

## 6. Optional: custom Google title and description

Brands, categories, products and posts can each carry an optional `seo` block to control how they look in Google results:

```json
"seo": {
  "title": "Greenlam Matte Laminate Price & Colours | Comfort Nest",
  "description": "Buy Greenlam matte laminate in Gurugram. See thickness options and request a quote."
}
```

If you leave it out, a good title and description are generated from the name and description fields. Add a custom one only for important pages. Keep titles under about 60 characters and descriptions under 160.

## 7. Removing or renaming

- **Remove a product, brand, category or post:** delete its entry (or file). The page disappears on the next publish.
- **Don't delete a brand or category that still has products.** Remove or move the products first, otherwise the build stops with an "unknown brand/category" error.
- **Hide something temporarily:** there is no "draft" switch. Move the entry out of the file until it's ready.

## 8. If the build fails: what the messages mean

Run `npm run build`. Mistakes are caught before anything goes live. The error always names the file and the entry.

| Message (shortened) | What it means | Fix |
|---|---|---|
| `Cannot read/parse ... Unexpected token` | A comma, quote or bracket is wrong in the JSON | Check the line shown; look for a missing or extra comma |
| `Invalid products.json (slug "...")` followed by a field name | A required field is missing or the wrong type (e.g. a price written as text) | Add the field or fix its type |
| `Duplicate slug "..." in ...` | Two entries share a slug | Make each slug unique |
| `product "..." references unknown brand "..."` | The product's `brand` doesn't match any brand slug | Fix the spelling or add the brand first |
| `product "..." references unknown category "..."` | Same, for category | Fix the spelling or add the category first |
| `brand "..." references unknown category "..."` | A brand lists a category slug that doesn't exist | Fix its `categories` list |
| `... must be an array` | The file doesn't start with `[` and end with `]` | Wrap the entries in `[ ]` |

Some mistakes are **not** caught by the build, so check them by eye in the preview:
- A wrong image path shows a broken or blank picture. Check the file name and the leading `/`.
- A brand's `categories` list that doesn't match the products it really has. The page won't fail but the chips will be inaccurate.
- Spelling, prices and specs. The site displays whatever you type.

## 9. Before you publish: checklist

- [ ] Every new entry has a unique slug (lowercase, hyphens)
- [ ] Product `brand` and `category` slugs exist
- [ ] New images are in `public/img/` (or `public/brands/`) and the path in JSON starts with `/`
- [ ] Prices are numbers with no ₹ and no commas, and match what you will honour
- [ ] Specs are accurate (thickness, grade, sheet size). Don't claim certifications or warranties you can't back up
- [ ] `npm run build` finishes with no errors
- [ ] Preview at http://localhost:3000: check the new page, the home page, and that links work
- [ ] Before launch only: `siteUrl`, phone, WhatsApp number, email, address and hours in `site.json` are the real ones
- [ ] Before launch only: sample brand websites (`.example` links), prices and descriptions are replaced with real information
