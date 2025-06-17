
export interface Section {
  id: string;
  name: string;
  description: string;
  groupId: string;
  version: string;
  content: string;
  createdAt: string;
  isActive: boolean;
  previousVersions?: SectionVersion[];
}

export interface SectionVersion {
  id: string;
  version: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface SectionFormData {
  name: string;
  description: string;
  version: string;
  content: string;
  isActive: boolean;
}
