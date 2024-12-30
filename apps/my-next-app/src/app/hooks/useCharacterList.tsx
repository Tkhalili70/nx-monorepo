import { useEffect, useState } from 'react';
import { CharacterType } from '../components/Home/Home';

export function useCharacterList(initialPage = 1, initialPageSize = 20) {
  const [characterList, setCharacterList] = useState<CharacterType[]>([]);
  const [filteredCharacterList, setFilteredCharacterList] = useState<CharacterType[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    current: initialPage,
    pageSize: initialPageSize,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchCharacter = async (page = pagination.current, pageSize = pagination.pageSize, filterParams = filters) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams({ ...filterParams, page: String(page), pageSize: String(pageSize) }).toString();
      const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryString}`);
      const data = await res.json();
      setTotalCount(data.info.count);
      if (Array.isArray(data.results)) {
        const formattedData = data.results.map((character: CharacterType) => ({
          ...character,
          key: character.id.toString(), // Assign the unique key
        }));
        setCharacterList(formattedData);
        setFilteredCharacterList(formattedData);
        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize,
          total: data.info.count,
        }));
      } else {
        setCharacterList([]);
        setFilteredCharacterList([]);
      }
    } catch (err) {
      console.error(err);
      setCharacterList([]);
      setFilteredCharacterList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [pagination.current, pagination.pageSize, filters]);

  // Callback to update pagination state
  const updatePagination = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };
  const applyFilters = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to the first page
  };
  return { characterList: filteredCharacterList,
    totalCount,
    pagination,
    loading,
    updatePagination,
    applyFilters,
  };
}
