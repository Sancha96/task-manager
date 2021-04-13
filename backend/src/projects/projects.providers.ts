import { Project } from './entities/project.entity';

export const projectsProviders = [
  {
    provide: 'PROJECTS_REPOSITORY',
    useValue: Project,
  },
];
