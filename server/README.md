# Blue Ocean Chat Proxy

A minimal Express server that keeps your `GROQ_API_KEY` out of the browser.
The frontend chat widget talks to this server; this server talks to Groq.
Never call Groq (or any LLM provider) directly from client-side code —
the API key would be visible to anyone who opens dev tools.

The system prompt is built at startup from the site's own data files
(`src/data/*.js`), so the assistant automatically knows about every
species, research project, conservation project, destination, community,
and news article published on the site — no manual syncing required.

## Local development

```bash
cd server
npm install
cp .env.example .env
# edit .env and paste in your Groq API key (https://console.groq.com/keys)
npm run dev
```

The server runs on `http://localhost:3001` by default. In the project root,
set `VITE_CHAT_API_URL=http://localhost:3001/api/chat` in a `.env` file (see
the root `.env.example`) and run `npm run dev` as usual — the chat widget
will pick it up.

## Deploying to DigitalOcean

### Option A — App Platform (recommended)

App Platform can host the React static site and this API as two components
of one app, on one domain, which avoids CORS entirely.

1. Push this repo to GitHub/GitLab.
2. In the DigitalOcean control panel, create a new App and point it at the repo.
3. Add two components:
   - **Static Site**: source directory `/` (repo root), build command
     `npm run build`, output directory `dist`.
   - **Service**: source directory `/server`, build command `npm install`,
     run command `npm start`, HTTP port `3001`.
4. Under the app's **Settings → App-Level Environment Variables**, or on the
   Service component directly, set:
   - `GROQ_API_KEY` — mark it **encrypted**.
   - `GROQ_MODEL` (optional).
   - `ALLOWED_ORIGINS` — your app's public URL, e.g. `https://blue-ocean.ondigitalocean.app`.
5. Under **Settings → Routes** (or the app spec's `routes` field), route
   `/api` to the Service component and `/` to the Static Site component.
   With this in place, the frontend can call same-origin `/api/chat` and
   you don't need `VITE_CHAT_API_URL` or CORS configuration at all.

A starting app spec looks like this (fill in your repo details, or use the
control panel UI instead — either produces the same result):

```yaml
name: blue-ocean
services:
  - name: chat-api
    source_dir: /server
    github:
      repo: your-org/blue_ocean
      branch: main
    build_command: npm install
    run_command: npm start
    http_port: 3001
    envs:
      - key: GROQ_API_KEY
        type: SECRET
        value: "REPLACE_ME"
      - key: ALLOWED_ORIGINS
        value: "${APP_URL}"
static_sites:
  - name: web
    source_dir: /
    github:
      repo: your-org/blue_ocean
      branch: main
    build_command: npm run build
    output_dir: dist
routes:
  - path: /api
    component: chat-api
  - path: /
    component: web
```

### Option B — a Droplet (systemd or pm2)

1. SSH into the droplet, install Node 20+, and clone the repo.
2. `cd server && npm install --production`
3. Create `/etc/systemd/system/blue-ocean-chat.service`:

   ```ini
   [Unit]
   Description=Blue Ocean chat proxy
   After=network.target

   [Service]
   WorkingDirectory=/path/to/blue_ocean/server
   ExecStart=/usr/bin/node index.js
   Restart=always
   EnvironmentFile=/path/to/blue_ocean/server/.env
   User=www-data

   [Install]
   WantedBy=multi-user.target
   ```

4. `systemctl enable --now blue-ocean-chat`
5. Put Nginx (or DigitalOcean's Load Balancer) in front, reverse-proxying
   `/api/` on your domain to `http://127.0.0.1:3001/api/`, and serving the
   built `dist/` folder for everything else. This again gives you same-origin
   `/api/chat` with no CORS setup needed.
6. If you don't reverse-proxy under the same domain, set `ALLOWED_ORIGINS`
   to your site's actual origin and set `VITE_CHAT_API_URL` at build time to
   the API's public URL (e.g. `https://api.blueoceansomalia.com/api/chat`).

## Getting a Groq API key

1. Go to https://console.groq.com and sign up / log in.
2. Open **API Keys** in the left sidebar, click **Create API Key**.
3. Copy the key immediately (it's shown once) and put it in `.env` locally,
   or as an encrypted environment variable on your host — never in the
   frontend code or a committed file.

## Rate limiting

The server includes a basic in-memory per-IP rate limit (30 requests / 10
minutes) to blunt casual abuse of a public endpoint. It resets if the
process restarts and doesn't share state across multiple instances — fine
for a single small droplet or one App Platform instance, but swap in a
shared store (e.g. Redis) if you scale to multiple instances.
