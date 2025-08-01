import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "./RichTextEditor";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

// Types pour les tables blog (à défaut des types Supabase)
interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  slug?: string;
  published: boolean;
  category_id?: string;
  author_id?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    slug: "",
    published: false,
    category_id: "",
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories(name, color)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data as BlogPost[] || []);
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      slug: "",
      published: false,
      category_id: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      image_url: post.image_url || "",
      slug: post.slug || "",
      published: post.published || false,
      category_id: post.category_id || "",
    });
    setShowForm(true);
  };

  const handleCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = formData.slug || generateSlug(formData.title);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || null,
        image_url: formData.image_url || null,
        slug: slug,
        published: formData.published,
        category_id: formData.category_id || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingId);

        if (error) throw error;
        
        toast({
          title: "Article modifié",
          description: "L'article a été mis à jour avec succès.",
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);

        if (error) throw error;
        
        toast({
          title: "Article créé",
          description: "Le nouvel article a été ajouté avec succès.",
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès.",
      });
      
      fetchPosts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Chargement des articles...</div>;
  }

  // Filtrer les posts selon le filtre sélectionné
  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'published':
        return post.published;
      case 'draft':
        return !post.published;
      case 'all':
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestion du Blog</h2>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel article
        </Button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          onClick={() => setFilter('all')}
        >
          Tous ({posts.length})
        </Button>
        <Button 
          variant={filter === 'published' ? "default" : "outline"} 
          onClick={() => setFilter('published')}
        >
          Publiés ({posts.filter(p => p.published).length})
        </Button>
        <Button 
          variant={filter === 'draft' ? "default" : "outline"} 
          onClick={() => setFilter('draft')}
        >
          Brouillons ({posts.filter(p => !p.published).length})
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? "Modifier l'article" : "Nouvel article"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug: prev.slug || generateSlug(title)
                    }));
                  }}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="mon-article-de-blog"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  placeholder="Résumé court de l'article..."
                />
              </div>
              
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Écrivez le contenu de votre article..."
                label="Contenu"
              />
              
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Publier l'article</Label>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  {editingId ? "Mettre à jour" : "Créer"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {post.title}
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publié" : "Brouillon"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                  {post.slug && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Slug: {post.slug}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content.substring(0, 200)}...
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Créé le {new Date(post.created_at).toLocaleDateString("fr-FR")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}