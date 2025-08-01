import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation côté client
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        throw new Error("Tous les champs sont requis");
      }

      // Obtenir l'adresse IP et user agent (optionnel)
      let ipData = null;
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        ipData = await ipResponse.json();
      } catch (ipError) {
        console.warn('Impossible d\'obtenir l\'adresse IP:', ipError);
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          ip_address: ipData?.ip || null,
          user_agent: navigator.userAgent || null
        });

      if (error) {
        console.error('Erreur Supabase:', error);
        throw new Error(`Erreur base de données: ${error.message}`);
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      toast({
        title: "Message envoyé !",
        description: "Votre message a été envoyé avec succès. Je vous répondrai rapidement.",
      });

      // Reset après 5 secondes
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
      toast({
        title: "Erreur",
        description: `Impossible d'envoyer le message: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 font-sans bg-background">
      <div className="max-w-2xl w-full bg-card border border-border rounded-lg shadow-lg p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-accent">Me contacter</h2>
          <p className="text-muted-foreground text-sm">N'hésitez pas à me laisser un message ou à utiliser les infos ci-dessous pour un contact direct.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs text-foreground">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs text-foreground">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs text-foreground">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-accent text-accent-foreground font-semibold hover:bg-accent-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sent || loading}
          >
            {loading ? "Envoi en cours..." : sent ? "Message envoyé !" : "Envoyer"}
          </button>
        </form>
        <div className="border-t border-border pt-6 flex flex-col gap-2 text-xs text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">Email :</span> contact@joelhassam.com
          </div>
          <div>
            <span className="font-semibold text-foreground">Téléphone :</span> 221 77 202 04 30
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/joel-gaetan-hassam-obah/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="https://github.com/Hojgaetan" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Github</a>
          </div>
        </div>
      </div>
    </section>
  );
};
