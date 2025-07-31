import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen, FileText, FileMusic, FileCode, FileStack, FileBarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Resizable } from "re-resizable";
import { useIsMobile } from "@/hooks/use-mobile";

export const AboutSection = () => {
  const isMobile = useIsMobile();
  const [selectedInfo, setSelectedInfo] = useState("bio");
  const [infoOpen, setInfoOpen] = useState(true);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [stagesOpen, setStagesOpen] = useState(false);
  const [emploisOpen, setEmploisOpen] = useState(false);

  const infoContents: Record<string, JSX.Element> = {
    bio: (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">1</span>
          <span className="text-code-comment">/**</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">2</span>
          <span className="text-code-comment">. Bio</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">3</span>
          <span className="text-code-comment">. **/</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-foreground">. </span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">5</span>
          <span className="text-foreground">. </span>
          <span className="text-foreground"> Passionné par le développement web et l'expérience utilisateur,</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">6</span>
          <span className="text-foreground">. </span>
          <span className="text-foreground"> je suis Developpeur web dans la création de sites internet et d'applications web responsives.</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">7</span>
          <span className="text-foreground">. </span>
          <span className="text-foreground"> Ma maîtrise des technologies HTML, CSS et JavaScript, combinée à une connaissance approfondie des frameworks modernes,</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">8</span>
          <span className="text-foreground">. </span>
            <span className="text-foreground"> me permet de transformer des maquettes graphiques en interfaces web performantes et esthétiques.</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">9</span>
          <span className="text-foreground">.</span>
            <span className="text-foreground"> Toujours à l'affût des dernières tendances et des meilleures pratiques en matière.</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">10</span>
          <span className="text-code-comment">*/</span>
        </div>
      </div>
    ),
    "centres-d_intérêts": (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">1</span>
          <span className="text-code-comment">/**</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">2</span>
          <span className="text-code-comment">* Centres d'intérêts</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">3</span>
          <span className="text-foreground">- Programmation</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-foreground">- Musique</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">5</span>
          <span className="text-foreground">- Lecture</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">6</span>
          <span className="text-foreground">- Sport</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">7</span>
          <span className="text-code-comment">*/</span>
        </div>
      </div>
    ),
    "éducation": (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">1</span>
          <span className="text-code-comment">/**</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">2</span>
          <span className="text-code-comment">* Éducation</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">3</span>
          <span className="text-foreground">- Bachelor en conception et développement de solutions digitales</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-foreground">- Formation continue en développement web</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">5</span>
          <span className="text-code-comment">*/</span>
        </div>
      </div>
    ),
    "lycée/collège": (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">1</span>
          <span className="text-code-comment">/**</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">2</span>
          <span className="text-code-comment">* Lycée / Collège</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">3</span>
          <span className="text-foreground">- Lycée d'Akwa Nord - Douala, Cameroun (2007 - 2010)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-foreground">- Lycée de Nkolnda, Nsimalen - Yaounde, Cameroun (2010 - 2011)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">5</span>
          <span className="text-foreground">- College Ndi Samba - Yaounde, Cameroun (2011 - 2013)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">6</span>
          <span className="text-foreground">- Lycée de Nkolndongo - Yaounde, Cameroun (2013 - 2015)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">7</span>
          <span className="text-foreground">- Lycée d'Akwa Nord - Douala, Cameroun (2015 - 2017) - <strong>Baccalaureat</strong></span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">8</span>
          <span className="text-code-comment">*/</span>
        </div>
      </div>
    ),
    "université": (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">1</span>
          <span className="text-code-comment">/**</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">2</span>
          <span className="text-code-comment">* Université</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">3</span>
          <span className="text-foreground">- Université de Douala, Cameroun (Mathematiques)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-foreground">- IUT de Douala, Cameroun (Genie Electrique et Informatique Industrielle)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">5</span>
          <span className="text-foreground">- ISM Dakar, Senegal (En cours)</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground mr-4 select-none w-6">4</span>
          <span className="text-code-comment">*/</span>
        </div>
      </div>
    ),
    "Developpeur Web / Responsable SEO": (
      <div className="space-y-2 min-w-max font-sans">
        <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">1.</span><span className="text-code-comment">/**</span></div>
        <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">2.</span><span className="text-code-comment">* Developpeur Web / Responsable SEO - MAJORANTS Academy </span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">3.</span><span className="text-code-comment">*/</span></div>
        <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">4.</span><span className="text-foreground"><i>Entreprise specialise dans la preparation de concours Nationaux au Cameroun</i></span></div>
        <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">5.</span><span className="text-foreground text-[#df3821]"><i>Stage pre-Emploi | Douala, Cameroun | Juin 2023 - Août 2023 | CDD</i></span></div>
        <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">6.</span><span className="text-foreground"></span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">7.</span><span className="text-foreground text-[#38b6ff]">Maintenance et optimisation du site web : </span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">8.</span><span className="text-foreground">Mise à jour régulière du contenu et des plugins WordPress pour garantir une disponibilité à 99,9%.</span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">9</span><span className="text-foreground text-[#38b6ff]">Stratégie SEO et visibilité : </span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">10</span><span className="text-foreground">Audit technique et optimisation des balises meta/titles (+50% de clics organiques en 02 mois).</span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">11</span><span className="text-foreground text-[#38b6ff]">Collaboration cross-fonctionnelle : </span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">12</span><span className="text-foreground">Refonte de l’UI/UX avec le designer (Figma), réduisant le taux de rebond de 30%.</span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">13</span><span className="text-foreground text-[#38b6ff]">Projets techniques : </span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">14</span><span className="text-foreground">Migration du site vers un hébergement plus performant (Hostinger), diminuant le temps de chargement de 2,5s à 0,8s.</span></div>
          <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">15</span><span className="text-foreground">Intégration de maquettes responsive pour mobile, augmentant le trafic mobile de 40%.</span></div>
      </div>
    ),
      "Responsable Informatique": (
          <div className="space-y-2 min-w-max font-sans">
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">1.</span><span className="text-code-comment">/**</span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">2.</span><span className="text-code-comment">* Responsable Informatique- MAJORANTS Academy </span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">3.</span><span className="text-code-comment">*/</span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">4.</span><span className="text-foreground"><i>Entreprise specialise dans la preparation de concours Nationaux au Cameroun</i></span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">5.</span><span className="text-foreground text-[#df3821]"><i>Travail a distance | Douala, Cameroun | Depuis Septembre 2023 | CDD</i></span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">6.</span><span className="text-foreground"></span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">7.</span><span className="text-foreground text-[#38b6ff]">Management d’équipe à distance : </span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">8</span><span className="text-foreground">Encadrement d’un developpeur en interne en mode remote</span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">9</span><span className="text-foreground text-[#38b6ff]">Innovation et transformation digitale : </span></div>
              <div className="flex"><span className="text-muted-foreground mr-4 select-none w-6">10</span><span className="text-foreground">Déploiement d’outils collaboratifs (Trello) pour améliorer la productivité en télétravail.</span></div>
          </div>
      ),
  };

  return (
    <div className="flex flex-col xl:flex-row h-full w-full font-sans">
      {/* Sidebar */}
      <Resizable
        size={isMobile ? { width: "100%", height: "auto" } : { width: 260, height: "100%" }}
        minWidth={isMobile ? "100%" : 140}
        maxWidth={isMobile ? "100%" : 480}
        enable={isMobile ? {} : { right: true }}
        handleStyles={isMobile ? {} : { right: { right: 0, width: 6, background: 'rgba(0,0,0,0.05)', cursor: 'col-resize', zIndex: 10 } }}
        className="relative h-full min-h-0 min-w-0 xl:h-full"
      >
        <div className="h-full min-h-0 min-w-0 bg-sidebar-background border-b border-r border-sidebar-border flex flex-col font-sans">
          <div className="space-y-2">
            <div className="space-y-2 sticky top-12 z-20 bg-sidebar-background">
              {/* Informations personnelles */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                  onClick={() => setInfoOpen((open) => !open)}
                >
                  {infoOpen ? (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1" />
                  )}
                  {infoOpen ? (
                    <FolderOpen className="w-4 h-4 mr-1" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-mono text-sm">_informations-personnelles</span>
                </Button>
                {infoOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    {[
                      { icon: <FileText className="w-4 h-4" />, label: "bio", color: "text-sidebar-foreground" },
                      { icon: <FileMusic className="w-4 h-4" />, label: "centres-d_intérêts", color: "text-sidebar-foreground" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center space-x-2 cursor-pointer rounded px-1 py-0.5 transition-colors duration-150 ${selectedInfo === item.label ? "bg-accent/20 text-accent font-semibold" : "hover:bg-accent/10"}`}
                        onClick={() => setSelectedInfo(item.label)}
                      >
                        <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>
                        <span className={`${item.color} font-sans text-sm`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                {/* Éducation */}
                <div className="mt-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                        onClick={() => setEducationOpen((open) => !open)}
                    >
                        {educationOpen ? (
                            <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                            <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        {educationOpen ? (
                            <FolderOpen className="w-4 h-4 mr-1" />
                        ) : (
                            <Folder className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-mono text-sm">_éducation</span>
                    </Button>
                    {educationOpen && (
                        <div className="ml-6 mt-2 space-y-1">
                            {[
                                { icon: <FileStack className="w-4 h-4" />, label: "lycée/collège", color: "text-sidebar-foreground" },
                                { icon: <FileBarChart2 className="w-4 h-4" />, label: "université", color: "text-sidebar-foreground" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center space-x-2 cursor-pointer rounded px-1 py-0.5 transition-colors duration-150 ${selectedInfo === item.label ? "bg-accent/20 text-accent font-semibold" : "hover:bg-accent/10"}`}
                                    onClick={() => setSelectedInfo(item.label)}
                                >
                                    <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>
                                    <span className={`${item.color} font-sans text-sm`}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

              {/* Expériences */}
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                  onClick={() => setExperiencesOpen((open) => !open)}
                >
                  {experiencesOpen ? (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1" />
                  )}
                  {experiencesOpen ? (
                    <FolderOpen className="w-4 h-4 mr-1" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-mono text-sm">_experiences</span>
                </Button>
                {experiencesOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    {/* Stages */}
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                        onClick={() => setStagesOpen((open) => !open)}
                      >
                        {stagesOpen ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        {stagesOpen ? (
                          <FolderOpen className="w-4 h-4 mr-1" />
                        ) : (
                          <Folder className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-mono text-sm">_stages</span>
                      </Button>
                      {stagesOpen && (
                        <div className="ml-6 mt-2 space-y-1">
                          {/* Fichiers entreprises de stage */}
                          {["Developpeur Web / Responsable SEO"].map((file) => (
                            <div
                              key={file}
                              className={`flex items-center space-x-2 cursor-pointer rounded px-1 py-0.5 transition-colors duration-150 ${selectedInfo === file ? "bg-accent/20 text-accent font-semibold" : "hover:bg-accent/10"}`}
                              onClick={() => setSelectedInfo(file)}
                            >
                              <span className="w-4 h-4 flex items-center justify-center"><FileText className="w-4 h-4" /></span>
                              <span className="text-sidebar-foreground font-sans text-sm">{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Emplois */}
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                        onClick={() => setEmploisOpen((open) => !open)}
                      >
                        {emploisOpen ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        {emploisOpen ? (
                          <FolderOpen className="w-4 h-4 mr-1" />
                        ) : (
                          <Folder className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-mono text-sm">_emplois</span>
                      </Button>
                      {emploisOpen && (
                        <div className="ml-6 mt-2 space-y-1">
                          {/* Fichiers entreprises d'emploi */}
                          {["Responsable Informatique"].map((file) => (
                            <div
                              key={file}
                              className={`flex items-center space-x-2 cursor-pointer rounded px-1 py-0.5 transition-colors duration-150 ${selectedInfo === file ? "bg-accent/20 text-accent font-semibold" : "hover:bg-accent/10"}`}
                              onClick={() => setSelectedInfo(file)}
                            >
                              <span className="w-4 h-4 flex items-center justify-center"><FileText className="w-4 h-4" /></span>
                              <span className="text-sidebar-foreground font-sans text-sm">{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Contacts */}
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-1 h-auto text-sidebar-foreground"
                  onClick={() => setContactsOpen((open) => !open)}
                >
                  {contactsOpen ? (
                    <ChevronDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1" />
                  )}
                  {contactsOpen ? (
                    <FolderOpen className="w-4 h-4 mr-1" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-mono text-sm">_contacts</span>
                </Button>
                {contactsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 flex items-center justify-center">📧</span>
                      <span className="text-sidebar-foreground font-sans text-xs break-all">contact@joelhassam.me</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 flex items-center justify-center">📱</span>
                      <span className="text-sidebar-foreground font-sans text-xs">+221 77 202 04 30</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 flex items-center justify-center">📱</span>
                      <span className="text-sidebar-foreground font-sans text-xs">+221 70 818 40 10</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Resizable>
      {/* Main Content */}
      <div className="flex-1 flex flex-col xl:flex-row h-full font-sans text-[13px] sm:text-[15px]">
        {/* Code Editor */}
        <div className="flex-1">
          <div className="border-b border-border bg-sidebar-background sticky top-1 z-10">
            <div className="flex items-center">
              <div className="px-4 py-1 bg-background border-r border-border">
                <span className="font-mono text-sm text-foreground">{selectedInfo}</span>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 font-sans text-[13px] sm:text-[15px] overflow-x-auto">
            {infoContents[selectedInfo]}
          </div>
        </div>
        {/* Skills Panel */}
        <div className="w-full xl:w-80 bg-background border-t xl:border-t-0 xl:border-l border-border font-sans">
          <div className="p-4">
            <div className="text-foreground font-sans text-xs sm:text-sm mb-4">
              // les langages de programmation que je maitrise et ceux que j'apprends encore
            </div>
            <div className="space-y-3">
              {[
                { name: "HTML", checked: true },
                { name: "CSS", checked: true },
                { name: "JavaScript", checked: true },
                { name: "TypeScript", checked: true },
                { name: "React.js", checked: true },
                { name: "Python", checked: true },
                { name: "Git", checked: true },
                { name: "Node.js", checked: true },
                { name: "Express.js", checked: false },
                { name: "MongoDB", checked: false },
                { name: "Next.js", checked: false },
                { name: "Vue.js", checked: false },
                { name: "Angular", checked: false },
              ].map((skill) => (
                <div key={skill.name} className="flex items-center space-x-3">
                  <Checkbox
                    checked={skill.checked}
                    className="border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <span className="text-foreground font-sans text-xs sm:text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
