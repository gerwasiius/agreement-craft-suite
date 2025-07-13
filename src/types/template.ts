
export interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  sections: TemplateSection[];
}

export interface TemplateSection {
  id: string;
  name: string;
  content: string;
  conditions?: SectionCondition[];
}

export interface SectionCondition {
  id: string;
  type: 'variable_equals' | 'variable_not_equals' | 'variable_contains' | 'always_visible' | 'always_hidden' | 'group';
  variableName?: string;
  expectedValue?: string;
  description: string;
  operator?: 'AND' | 'OR';
  children?: SectionCondition[];
}

export interface Section {
  id: string;
  name: string;
  description: string;
  content: string;
  groupName: string;
}
