import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid work email").max(160),
  company: z.string().trim().min(1, "Company is required").max(120),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

type Ctx = { openLead: (source?: string, plan?: string) => void };
const LeadCtx = createContext<Ctx | null>(null);

export function useLeadDialog() {
  const ctx = useContext(LeadCtx);
  if (!ctx) throw new Error("useLeadDialog must be used inside LeadDialogProvider");
  return ctx;
}

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();
  const [plan, setPlan] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", website: "" },
  });

  const openLead = useCallback((src?: string, p?: string) => {
    setSource(src);
    setPlan(p);
    setOpen(true);
  }, []);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      email: values.email,
      company: values.company,
      website: values.website || null,
      plan: plan ?? null,
      source: source ?? null,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Couldn't submit. Please try again.");
      return;
    }
    toast.success("You're in. We'll be in touch within 24 hours.");
    form.reset();
    setOpen(false);
  };

  return (
    <LeadCtx.Provider value={{ openLead }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md glass-strong">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-5 w-5 text-primary" />
              Hire your Superstaff
            </DialogTitle>
            <DialogDescription>
              Tell us about your business. We'll set up your AI staff and reach out within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Ada Lovelace" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="ada@company.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." {...form.register("company")} />
              {form.formState.errors.company && (
                <p className="text-xs text-destructive">{form.formState.errors.company.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="website">
                Website <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input id="website" placeholder="https://acme.com" {...form.register("website")} />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-gradient-primary text-primary-foreground btn-glow border-0"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Hire your Superstaff"
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              No credit card required. We'll never share your info.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </LeadCtx.Provider>
  );
}
