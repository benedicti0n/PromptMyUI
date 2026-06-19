import { NextRequest, NextResponse } from "next/server";

interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const perPage = searchParams.get("per_page") || "6";

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter 'q'" },
      { status: 400 }
    );
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "UNSPLASH_ACCESS_KEY is not configured" },
      { status: 503 }
    );
  }

  try {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", query);
    url.searchParams.set("per_page", perPage);
    url.searchParams.set("orientation", "landscape");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Unsplash API error:", res.status, errorText);
      return NextResponse.json(
        { error: `Unsplash API returned ${res.status}` },
        { status: res.status }
      );
    }

    const data: UnsplashSearchResponse = await res.json();

    const photos = data.results.map((photo) => ({
      id: photo.id,
      url: photo.urls.small,
      regularUrl: photo.urls.regular,
      thumbUrl: photo.urls.thumb,
      alt: photo.alt_description || "Unsplash image",
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      unsplashUrl: photo.links.html,
    }));

    return NextResponse.json({ photos, total: data.total }, { status: 200 });
  } catch (error) {
    console.error("Unsplash search error:", error);
    return NextResponse.json(
      { error: "Failed to search Unsplash" },
      { status: 500 }
    );
  }
}
