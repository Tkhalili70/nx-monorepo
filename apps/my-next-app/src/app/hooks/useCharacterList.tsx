import { useEffect, useState } from 'react';
import { CharacterType } from '../components/Home/Home';
import { useLoader } from '../contexts/loader-context';
import { apiGetCharacterList } from '../services/apiCharacter';

export function useCharacterList(initialPage = 1, initialPageSize = 20) {
  const [characterList, setCharacterList] = useState<CharacterType[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    current: initialPage,
    pageSize: initialPageSize,
    total: 0,
  });
  const {isLoading, setIsLoading}= useLoader();

  const fetchCharacter = async (page = pagination.current, pageSize = pagination.pageSize, filterParams = filters) => {
    setIsLoading(true);
    try {
      const queryString = new URLSearchParams({ ...filterParams, page: String(page), pageSize: String(pageSize) }).toString();
      const data = await apiGetCharacterList(queryString);
      setTotalCount(data.info.count);
      if (Array.isArray(data.results)) {
        const formattedData = data.results.map((character: CharacterType) => ({
          ...character,
          key: character.id.toString(),
        }));
        setCharacterList(formattedData);
        const generatePageSizeOptions = (total: number) => {
          const baseOptions = [10, 20, 50, 100];
          return total > 100 ? [...baseOptions, total] : baseOptions;
        };
        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize,
          total: data.info.count,
          pageSizeOptions:generatePageSizeOptions(data.info.count)
        }));
      } else {
        setCharacterList([]);
      }
    } catch (err) {
      console.error(err);
      setCharacterList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [pagination.current, pagination.pageSize, filters]);

  const updatePagination = (page: number, pageSize: number) => {
    setIsLoading(true);
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };
  const applyFilters = (newFilters: Record<string, string>) => {
    setIsLoading(true);
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to the first page
  };
  return { characterList: characterList,
    totalCount,
    pagination,
    isLoading,
    updatePagination,
    applyFilters,
  };
}
