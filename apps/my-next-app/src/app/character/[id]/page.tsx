"use client";
import {
  StyledCharacterDetail,
  StyledCharacterSec,
  StyledCharacterName,
  StyledInfoSection,
  EpisodeContainer, EpisodeSection, StyledCharacterContainer, StyledLink, StyledLoading
} from './styles';
import Image from "next/image";
import { useCharacterDetail } from '../../hooks/useCharacterDetail';


export default function Page({params}: { params: { id: number } }) {
  const { isLoading,characterDetail, error } = useCharacterDetail(params.id);

  if (!params.id) {
    return <div>Error: Invalid character ID.</div>;
  }
  if (error) {
    return (
      <>
        <h1>Some Error Occurred!</h1>
        <div>{error.message}</div>
      </>
    );
  }
  if (isLoading) {
    return <StyledLoading>Loading character details...</StyledLoading>;
  }
  return (
        <>
          <StyledLink href='/'>Back To Main List</StyledLink>
          <StyledCharacterContainer>
            <StyledCharacterDetail>
              <Image
                width={200}
                height={200}
                src={characterDetail?.image}
                alt={characterDetail?.name}
                className="character-image"
                loading="lazy"
              />
              <StyledCharacterSec>
                <StyledCharacterName>
                  {characterDetail?.name}
                  <span
                    className={`status ${characterDetail.status?.toLowerCase()}`}
                  >
                {characterDetail.status}
              </span>
                </StyledCharacterName>
                <StyledInfoSection>
                  <div className="label">Last Known Location:</div>
                  <span className="value">{characterDetail?.location?.name}</span>
                </StyledInfoSection>
                <StyledInfoSection>
                  <div className="label">First Seen In:</div>
                  <span className="value">{characterDetail?.origin?.name}</span>
                </StyledInfoSection>
              </StyledCharacterSec>
            </StyledCharacterDetail>
            <EpisodeContainer>
              {characterDetail.episode?.map((episode, index) => {
                return <EpisodeSection key={index}>{episode}</EpisodeSection>;
              })}
            </EpisodeContainer>
          </StyledCharacterContainer>
        </>
  );
}
