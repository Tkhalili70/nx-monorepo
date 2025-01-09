import { apiGetCharacterList } from '../services/apiCharacter';
import { useQuery } from '@tanstack/react-query';

export function useCharacterList(queryString: string) {
  const { isLoading, data: characterList = [], error } = useQuery(
    {
      queryKey:['characters' , queryString],
      queryFn: () => apiGetCharacterList(queryString),
      keepPreviousData : true,
    }
  )
  return { characterList, isLoading , error };

}
