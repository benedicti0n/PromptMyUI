"use client";

import { useGeneratorStore } from "@/store/generatorStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AssetsTab } from "./assetsTab";

export function ResultTabs() {
  const { result, activeTab, setActiveTab } = useGeneratorStore();

  if (!result) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Your generated prompt will appear here after analysis.
        </p>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid h-auto w-full grid-cols-3 gap-1 sm:grid-cols-6">
        <TabsTrigger value="summary" className="text-xs sm:text-sm">Summary</TabsTrigger>
        <TabsTrigger value="tokens" className="text-xs sm:text-sm">Tokens</TabsTrigger>
        <TabsTrigger value="components" className="text-xs sm:text-sm">Components</TabsTrigger>
        <TabsTrigger value="assets" className="text-xs sm:text-sm">
          Assets
          {result.designTokens.visualAssets?.length > 0 && (
            <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
              {result.designTokens.visualAssets.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="fullPrompt" className="text-xs sm:text-sm">Prompt</TabsTrigger>
        <TabsTrigger value="checklist" className="text-xs sm:text-sm">Checklist</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="animate-fade-in">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Style Summary</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {result.styleSummary}
          </p>
          <Separator className="my-5" />
          <h4 className="text-sm font-semibold text-foreground">Layout Rules</h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {result.layoutRules}
          </p>
          <Separator className="my-5" />
          <h4 className="text-sm font-semibold text-foreground">Responsive Rules</h4>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {result.responsiveRules}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="tokens" className="animate-fade-in">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Colors</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Object.entries(result.designTokens.colors).map(([key, values]) => (
                <div key={key}>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {key}
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {values.map((color) => (
                      <div key={color} className="flex items-center gap-1.5">
                        <span
                          className="inline-block h-6 w-6 rounded-md border border-border shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-muted-foreground">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Typography</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Direction:</strong> {result.designTokens.typography.fontDirection}</p>
              <p><strong className="text-foreground">Headings:</strong> {result.designTokens.typography.headingStyle}</p>
              <p><strong className="text-foreground">Body:</strong> {result.designTokens.typography.bodyStyle}</p>
              <p><strong className="text-foreground">Scale:</strong> {result.designTokens.typography.scale}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Spacing</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.designTokens.spacing}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Border Radius</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.designTokens.radius}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Shadows</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.designTokens.shadows}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Effects</h3>
              <p className="mt-2 text-sm text-muted-foreground">{result.designTokens.effects}</p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="components" className="animate-fade-in">
        <div className="space-y-4">
          {Object.entries(result.componentRules).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold capitalize text-foreground">{key}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="assets" className="animate-fade-in">
        <AssetsTab />
      </TabsContent>

      <TabsContent value="fullPrompt" className="animate-fade-in">
        <div className="rounded-2xl border border-border bg-card">
          <pre className="max-h-[600px] overflow-auto p-6 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {result.fullPrompt}
          </pre>
        </div>
      </TabsContent>

      <TabsContent value="checklist" className="animate-fade-in">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground">Validation Checklist</h3>
          <ul className="mt-4 space-y-3">
            {result.validationChecklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5 shrink-0">
                  {index + 1}
                </Badge>
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-5" />
          <h4 className="text-sm font-semibold text-foreground">Do Not Use</h4>
          <ul className="mt-3 space-y-2">
            {result.doNotUse.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}
