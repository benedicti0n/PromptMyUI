"use client";

import { useState, useEffect } from "react";
import {
  Type,
  Image,
  ExternalLink,
  Copy,
  Check,
  Palette,
  Search,
  Loader2,
} from "lucide-react";
import { useGeneratorStore } from "@/store/generatorStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface UnsplashPhoto {
  id: string;
  url: string;
  regularUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
}

function UnsplashPreview({ query }: { query: string }) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPhotos() {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/searchAssets?q=${encodeURIComponent(query)}&per_page=4`
        );
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        if (!cancelled) {
          setPhotos(data.photos || []);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load previews");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Trigger re-fetch by toggling a dummy state or just re-run effect logic
    // Since effect depends on query, we can just re-mount or re-trigger
    // Simpler: manually re-fetch inline
    async function retry() {
      try {
        const res = await fetch(
          `/api/searchAssets?q=${encodeURIComponent(query)}&per_page=4`
        );
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch {
        setError("Could not load previews");
      } finally {
        setLoading(false);
      }
    }
    retry();
  };

  if (loading) {
    return (
      <div className="flex h-24 items-center justify-center rounded-xl bg-muted/50">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || photos.length === 0) {
    return (
      <div className="flex h-24 flex-col items-center justify-center rounded-xl bg-muted/50 text-center">
        <p className="text-xs text-muted-foreground">
          {error || "No previews found"}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-7 text-xs"
          onClick={handleRetry}
        >
          <Search className="mr-1 h-3 w-3" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photo.unsplashUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg"
          title={`Photo by ${photo.photographer} on Unsplash`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.alt}
            className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="truncate text-[10px] text-white">
              {photo.photographer}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={handleCopy}
      title="Copy"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}

export function AssetsTab() {
  const { result } = useGeneratorStore();

  if (!result) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Generate a prompt to see detected fonts and visual assets.
        </p>
      </div>
    );
  }

  const { detectedFonts, fontPairing, visualAssets } = result.designTokens;
  const hasFonts = detectedFonts && detectedFonts.length > 0;
  const hasAssets = visualAssets && visualAssets.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Typography Section */}
      {hasFonts && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Type className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Typography
            </h3>
          </div>

          {fontPairing && (
            <div className="mt-3 rounded-lg bg-muted/50 p-3">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Recommended Pairing
              </span>
              <p className="mt-1 text-sm font-medium text-foreground">
                {fontPairing}
              </p>
            </div>
          )}

          <div className="mt-4 space-y-4">
            {detectedFonts.map((font, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {font.role}
                      </Badge>
                      <span className="text-sm font-semibold text-foreground">
                        {font.detectedName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({font.category})
                      </span>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Closest Google Font:
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {font.closestGoogleFont}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <code className="max-w-[300px] truncate rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                          {font.googleFontsUrl}
                        </code>
                        <CopyButton text={font.googleFontsUrl} />
                        <a
                          href={font.googleFontsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="mr-0.5 h-3 w-3" />
                          Open
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Similar:
                        </span>
                        {font.alternatives.map((alt) => (
                          <a
                            key={alt}
                            href={`https://fonts.google.com/?query=${encodeURIComponent(alt)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground transition-colors hover:bg-primary/10"
                          >
                            {alt}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Assets Section */}
      {hasAssets && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Image className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Visual Assets
            </h3>
            <span className="text-xs text-muted-foreground">
              Similar resources to match the design language
            </span>
          </div>

          <div className="mt-4 space-y-5">
            {visualAssets.map((asset, index) => (
              <div
                key={index}
                className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-[10px] uppercase"
                  >
                    {asset.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {asset.location}
                  </span>
                </div>

                <p className="mt-2 text-sm text-foreground">
                  {asset.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {asset.moodKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="mt-3">
                  <UnsplashPreview query={asset.unsplashQuery} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={asset.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-[#E60023] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <Palette className="h-3 w-3" />
                    Pinterest
                  </a>
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(asset.unsplashQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80"
                  >
                    <Image className="h-3 w-3" />
                    Unsplash
                  </a>
                  <CopyButton text={asset.searchKeywords} />
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {asset.searchKeywords}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasFonts && !hasAssets && (
        <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No fonts or visual assets detected in this analysis.
          </p>
          <p className="text-xs text-muted-foreground">
            Try generating with &quot;Full Implementation&quot; depth for more detailed detection.
          </p>
        </div>
      )}
    </div>
  );
}
