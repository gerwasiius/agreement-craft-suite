
export interface PlaceholderGroup {
  id: string;
  name: string;
  placeholders: Placeholder[];
}

export interface Placeholder {
  id: string;
  name: string;
  displayName: string;
  value: string;
  description?: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  isNullable: boolean;
  enumValues?: string[];
  group?: string;
}
