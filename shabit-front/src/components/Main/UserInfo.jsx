import React from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';

import ThemeBox from './ThemeBox';
import { BiUserCircle } from 'react-icons/bi';

export default function UserInfo({ user, lastDate, isModalOpen, setTheme }) {
  const { email, nickname, profile } = user;

  return (
    <Wrapper>
      <ImgWrapper
        style={profile?.length ? { backgroundImage: `url(${profile})` } : {}}
      >
        {profile ? <></> : <BiUserCircle />}
        <span onClick={() => isModalOpen(true)}>이미지 변경하기</span>
      </ImgWrapper>

      <ContentWrapper>
        <UserName>
          <span>{nickname}</span>
          <span>이메일 : {email}</span>
        </UserName>
        <LastLogin>마지막 접속일 : {lastDate}</LastLogin>
        <ThemeBox setTheme={setTheme} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ImgWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.secondary};
  background-size: cover;
  object-fit: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 4%;
  left: 7%;
  animation: 0.8s ease-in ${loadEffect.down};
  z-index: 1;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 8rem;
  }

  span {
    visibility: hidden;
    padding: 5px 10px;
    text-align: center;
    position: absolute;
    min-width: 9rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.color.whiteColor};
    text-shadow: 0px 0px 3px black;
    cursor: pointer;
  }
  &:hover span {
    visibility: visible;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};

  animation: 0.8s ease-in ${loadEffect.down};
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 1rem;
  margin: 0.3rem 0;

  & > span:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const LastLogin = styled.div`
  padding: 0.3rem;
  margin: 0.7rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  border-radius: 0.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
`;
