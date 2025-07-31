import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { FigmaIcon } from "@/components/FigmaIcon";
import { GithubIcon } from "@/components/GithubIcon";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  technologies: string[] | null;
  featured: boolean | null;
  planning_url?: string | null;
  modelisation_url?: string | null;
  charte_url?: string | null;
  prototype_url?: string | null;
  category: "personnel" | "professionnel" | "academique";
}

const projectCategories: Record<string, string> = {
  professionnel: "Projets professionnels",
  personnel: "Projets personnels",
  academique: "Projets académiques",
};

export const ProjectsSection = () => {
  const [groupedProjects, setGroupedProjects] = useState<Record<string, Project[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ professionnel: true });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*, category")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const grouped = (data || []).reduce((acc, project) => {
        const category = project.category || "personnel";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(project);
        return acc;
      }, {} as Record<string, Project[]>);

      setGroupedProjects(grouped);

      if (data && data.length > 0) {
        const professionalProjects = grouped.professionnel || [];
        const firstProject = professionalProjects.length > 0 ? professionalProjects[0] : data[0];
        setSelectedProject(firstProject.id);
        setOpenFolders(prev => ({ ...prev, [firstProject.category]: true }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Phases dynamiques selon les liens présents dans le projet
  const projectPhases = [
    {
      key: "planning_url",
      title: "Plannification du projet",
      description: "Organisation, tâches, avancement, Trello, etc.",
      icon: "📅",
    },
    {
      key: "modelisation_url",
      title: "Modélisation & Analyse",
      description: "Diagrammes, analyse fonctionnelle, cahier des charges, etc.",
      icon: "🧩",
    },
    {
      key: "charte_url",
      title: "Charte Graphique",
      description: "Palette de couleurs, typographies, logos, etc.",
      icon: "🎨",
    },
    {
      key: "prototype_url",
      title: "Maquette & Prototype",
      description: "Wireframes, maquettes Figma, prototypes interactifs, etc.",
      icon: <FigmaIcon className="w-4 h-4" />,
    },
    {
      key: "github_url",
      title: "Code Github",
      description: "Lien vers le dépôt Github du projet.",
      icon: <GithubIcon className="w-4 h-4" />,
    },
  ];

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groupedProjects).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-muted-foreground font-mono">// aucun projet disponible</span>
      </div>
    );
  }

  const allProjects = Object.values(groupedProjects).flat();

  return (
    <div className="flex flex-col lg:flex-row h-full font-sans">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-sidebar-background border-b lg:border-b-0 lg:border-r border-sidebar-border flex flex-col font-sans">
        <div className="p-4">
          <div className="space-y-1">
            <div className="text-sidebar-foreground font-sans text-sm mb-4">_projets</div>
            {Object.entries(projectCategories).map(([categoryKey, categoryName]) => (
              <div key={categoryKey}>
                <div
                  className="flex items-center space-x-2 py-1 px-2 rounded cursor-pointer transition-colors duration-150 select-none hover:bg-accent/10"
                  onClick={() => toggleFolder(categoryKey)}
                >
                  {openFolders[categoryKey] ? (
                    <ChevronDown className="w-4 h-4 text-sidebar-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
                  )}
                  {openFolders[categoryKey] ? (
                    <FolderOpen className="w-5 h-5 text-sidebar-foreground" />
                  ) : (
                    <Folder className="w-5 h-5 text-sidebar-foreground" />
                  )}
                  <span className="text-sidebar-foreground font-sans text-sm">{categoryName}</span>
                </div>
                {openFolders[categoryKey] && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                    {(groupedProjects[categoryKey] || []).map((project) => (
                      <div key={project.id}>
                        <div
                          className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer transition-colors duration-150 select-none ${selectedProject === project.id ? "bg-accent/20 text-accent font-semibold" : "hover:bg-accent-red active:bg-accent-red/80"}`}
                          onClick={() => handleProjectClick(project.id)}
                        >
                          <div className="w-4 h-4" />
                          <Folder className="w-5 h-5 text-sidebar-foreground" />
                          <span className="text-sidebar-foreground font-sans text-xs sm:text-sm truncate">{project.title}</span>
                          {project.featured && (
                            <Badge variant="secondary" className="text-xs">★</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-sidebar-background">
          <div className="flex items-center">
            <div className="px-4 py-2 bg-background border-r border-border">
              <span className="font-sans text-sm text-foreground">
                {allProjects.find(p => p.id === selectedProject)?.title || "Sélectionnez un projet"}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          {/* Affiche uniquement le projet sélectionné */}
          {allProjects.filter(p => p.id === selectedProject).map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {project.image_url && (
                <div className="h-32 sm:h-48 bg-muted">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-sans text-xs sm:text-sm text-accent break-words">{project.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs mb-4">{project.description}</p>
                {/* Affichage des technologies utilisées */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {/* Grille des phases du projet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {projectPhases.filter(phase => project[phase.key as keyof Project]).map(phase => (
                    <div key={phase.key} className="bg-muted rounded-lg p-4 flex flex-col items-start border border-border shadow-sm">
                      <div className="text-2xl mb-2 flex items-center justify-center">{phase.icon}</div>
                      <div className="font-semibold text-sm mb-1">{phase.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">{phase.description}</div>
                      <a
                        href={project[phase.key as keyof Project] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline text-xs mt-auto"
                      >
                        Voir le lien
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};