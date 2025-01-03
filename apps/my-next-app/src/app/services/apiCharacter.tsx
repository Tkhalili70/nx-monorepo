import urlConfig from './urlConfig';

export async function apiGetCharacterList(queryString:string) {
  const response = await fetch(`${urlConfig.apiUrl}/${urlConfig.API_URL_CHARACTER}/?${queryString}` , { headers: new Headers({'content-type': 'application/json'})})
  return  await response.json();
}
export async function apiGetCharacterDetail(characterId:string | number) {
  const response = await fetch(`${urlConfig.apiUrl}/${urlConfig.API_URL_CHARACTER}/${characterId}` , { headers: new Headers({'content-type': 'application/json'})})
  return  await response.json();
}

