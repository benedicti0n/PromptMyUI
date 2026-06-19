"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Edit2,
  Check,
  X,
  Paintbrush,
  Sparkles,
  Palette,
} from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { applyThemeToDocument } from "@/lib/themeEngine";
import { AppShell } from "@/components/appShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ThemesPage() {
  const { themes, activeThemeId, setActiveTheme, removeTheme, renameTheme } =
    useThemeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleApply = (id: string) => {
    setActiveTheme(id);
    const theme = themes.find((t) => t.id === id);
    if (theme) {
      applyThemeToDocument(theme);
    }
  };

  const startEdit = (theme: { id: string; name: string }) => {
    setEditingId(theme.id);
    setEditName(theme.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      renameTheme(editingId, editName.trim());
    }
    setEditingId(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/generate"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Saved Themes
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage and switch between your applied UI designs.
          </p>
        </div>

        <div className="space-y-4">
          {themes.map((theme) => {
            const isActive = theme.id === activeThemeId;
            const isEditing = editingId === theme.id;

            return (
              <div
                key={theme.id}
                className={`rounded-2xl border p-6 transition-shadow ${
                  isActive
                    ? "border-primary/50 bg-primary/[0.02] shadow-sm"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 w-48 rounded-lg text-sm"
                            autoFocus
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={saveEdit}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={cancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-base font-semibold text-foreground">
                            {theme.name}
                          </h3>
                          {theme.isBuiltIn && (
                            <Badge variant="secondary" className="text-xs">
                              Built-in
                            </Badge>
                          )}
                          {isActive && (
                            <Badge className="gap-1 text-xs">
                              <Sparkles className="h-3 w-3" />
                              Active
                            </Badge>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.entries(theme.designTokens.colors)
                        .filter(([, values]) => values.length > 0)
                        .slice(0, 4)
                        .map(([key, values]) => (
                          <div key={key} className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground capitalize">
                              {key}:
                            </span>
                            <div className="flex gap-1">
                              {values.slice(0, 2).map((color) => (
                                <span
                                  key={color}
                                  className="inline-block h-5 w-5 rounded-md border border-border"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {theme.layoutRules.slice(0, 100)}
                      {theme.layoutRules.length > 100 ? "..." : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!theme.isBuiltIn && !isEditing && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => startEdit(theme)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeTheme(theme.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant={isActive ? "secondary" : "default"}
                      onClick={() => handleApply(theme.id)}
                      disabled={isActive}
                      className="gap-1.5 rounded-lg"
                    >
                      <Paintbrush className="h-3.5 w-3.5" />
                      {isActive ? "Applied" : "Apply"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {themes.length <= 1 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Palette className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-base font-medium text-foreground">
              No custom themes yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Generate a prompt and click &quot;Apply to App&quot; to save your first theme.
            </p>
            <Link href="/generate">
              <Button className="mt-4 gap-2 rounded-lg">
                <Sparkles className="h-4 w-4" />
                Generate a Prompt
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
