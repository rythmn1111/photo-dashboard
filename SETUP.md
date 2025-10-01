# Photo Dashboard Setup

## Environment Configuration

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Database Schema

Make sure your Supabase database has a table called `links` with the following structure:

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  links TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Features

- Beautiful responsive photo grid layout
- Automatic image loading with error handling
- Hover effects and smooth transitions
- Loading states and error recovery
- Mobile-friendly design

## Running the Application

1. Install dependencies: `bun install`
2. Configure your `.env.local` file with Supabase credentials
3. Run the development server: `bun dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

The photo album will automatically fetch and display all images from your `links` table.
