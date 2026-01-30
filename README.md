# letschat-frontend

This is a Next js application that can connect to an llm server. Authentication, authorization, and data access is handled by supabase.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setup

Get access to the common library `letschat-types`, and add your ssh key to the ssh-agent:

```bash
  # Start SSH agent if needed
  eval "$(ssh-agent -s)"

  # Add your GitHub SSH key
  ssh-add ~/.ssh/id_rsa  # or whatever key you use for GitHub
```

Create a supabase project at [supabase.com](https://supabase.com).

Create a `.env` file in the root directory with the following environment variables:

```bash
# Node environment
NODE_ENV=development

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Backend server URL
NEXT_PUBLIC_SERVER=http://localhost:5050

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

You will also need to setup the server of this project which can be found [here](https://github.com/pdotsani/letschat-server).

## Deploy with Docker

Build and run the Docker container:

```bash
# Build the image (with SSH key for private dependencies)
docker build --ssh default=$SSH_AUTH_SOCK --secret id=dotenv,src=.env -t letschat-frontend .

# Run the container
docker run -p 3000:3000 letschat-frontend
```

The application will be available at [http://localhost:3000](http://localhost:3000).
