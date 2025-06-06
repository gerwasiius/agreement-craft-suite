
export interface Section {
  id: string;
  name: string;
  description: string;
  groupId: string;
  version: string;
  content: string;
  createdAt: string;
}

export interface SectionFormData {
  name: string;
  description: string;
  version: string;
  content: string;
}
