
import { getTechs, getProjects } from "@/actions";

import { ProjectsPage } from "@/components/admin/ProjectsPage";
export default async function ProyectsPage() {

  const technologies = await getTechs();

  const projects = await getProjects();

  return (
    <ProjectsPage technologies={technologies} projects={projects}/>
  );
}