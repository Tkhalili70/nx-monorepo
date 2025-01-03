import { useEffect, useState } from 'react';
import { CharacterType } from '../components/Home/Home';
import { apiGetCharacterDetail } from '../services/apiCharacter';

export function useCharacterDetail(characterId: number) {
  const [characterDetail, setCharacterDetail] = useState<CharacterType | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const data = await apiGetCharacterDetail(characterId);
        setCharacterDetail(data);
      } catch (err: any) {
        setError(err?.message || 'Something went wrong');
      }
    };
    if (characterId) fetchCharacterDetail();
  }, [characterId]);
  return { characterDetail , error };
}
