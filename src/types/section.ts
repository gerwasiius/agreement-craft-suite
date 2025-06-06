
export interface Section {
  id: string;
  name: string;
  description: string;
  groupId: string;
  version: string;
  content: string;
  createdAt: string;
  isActive: boolean;
}

export interface SectionFormData {
  name: string;
  description: string;
  version: string;
  content: string;
  isActive: boolean;
}
