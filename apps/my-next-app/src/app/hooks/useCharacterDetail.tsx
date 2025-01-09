import { apiGetCharacterDetail } from '../services/apiCharacter';
import { useQuery } from '@tanstack/react-query';

export function useCharacterDetail(characterId: number) {
  const { isLoading, data: characterDetail, error } = useQuery(
    {
      queryKey:['characters' ,characterId],
      queryFn: () => apiGetCharacterDetail(characterId),
      keepPreviousData : true
    }
  );

  return { characterDetail ,isLoading, error };
}
