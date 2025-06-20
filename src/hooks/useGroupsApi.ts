
import { useState, useEffect } from 'react';

interface Group {
  id: string;
  name: string;
  sectionCount: number;
}

interface GroupsApiResponse {
  groups: Group[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UseGroupsApiParams {
  page: number;
  pageSize: number;
  searchTerm: string;
}

// Simulacija serverside API poziva
export const useGroupsApi = ({ page, pageSize, searchTerm }: UseGroupsApiParams) => {
  const [data, setData] = useState<GroupsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - u produkciji bi ovo bile grupe iz baze
  const allGroups: Group[] = [
    { id: "1", name: "Ugovori o radu", sectionCount: 15 },
    { id: "2", name: "Licencni ugovori", sectionCount: 8 },
    { id: "3", name: "Ugovori o kupoprodaji", sectionCount: 12 },
    { id: "4", name: "Uslužni ugovori", sectionCount: 6 },
    { id: "5", name: "Aneksi ugovora", sectionCount: 10 },
    { id: "6", name: "Dopisi", sectionCount: 20 },
    { id: "7", name: "Zahtevi", sectionCount: 14 },
    { id: "8", name: "Obaveštenja", sectionCount: 9 },
    { id: "9", name: "Izveštaji", sectionCount: 7 },
    { id: "10", name: "Proceduralni dokumenti", sectionCount: 11 },
    // Dodajem više grupa za testiranje paginacije
    ...Array.from({ length: 40 }, (_, i) => ({
      id: `${11 + i}`,
      name: `Test grupa ${i + 1}`,
      sectionCount: Math.floor(Math.random() * 20) + 1
    }))
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulacija network delay-a
        await new Promise(resolve => setTimeout(resolve, 300));

        // Simulacija serverside pretrage
        const filteredGroups = allGroups.filter(group =>
          searchTerm === "" || 
          group.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Simulacija serverside paginacije
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedGroups = filteredGroups.slice(startIndex, endIndex);

        const totalCount = filteredGroups.length;
        const totalPages = Math.ceil(totalCount / pageSize);

        const response: GroupsApiResponse = {
          groups: paginatedGroups,
          totalCount,
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        };

        setData(response);
      } catch (err) {
        setError('Greška pri učitavanju grupa');
        console.error('Groups API error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [page, pageSize, searchTerm]);

  return { data, isLoading, error };
};
