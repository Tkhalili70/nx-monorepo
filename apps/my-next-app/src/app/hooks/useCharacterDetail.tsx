import { useEffect, useState } from 'react';
import { CharacterType } from '../components/Home/Home';

export function useCharacterDetail(characterId: number) {
  const [characterDetail, setCharacterDetail] = useState<CharacterType | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        const data = await res.json();
        setCharacterDetail(data);
      } catch (err: any) {
        setError(err?.message || 'Something went wrong');
      }
    };
    if (characterId) fetchCharacterDetail();
  }, [characterId]);
  return { characterDetail , error };
}
