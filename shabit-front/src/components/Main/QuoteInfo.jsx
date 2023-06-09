import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';
import { typedUseSelector } from '../../store';
import { FiAlertCircle } from 'react-icons/fi';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import { fetchAlarmTime } from '../../services/admin/get';
import WebSocketComponent from './WebSocketComponent';
import { FireAlert } from '../../services';

import { setMode } from '../../store/modeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setInitUsedTime, setInitStretchingTime } from '../../store/timeSlice';

export const wsc = new WebSocketComponent();

export default function QuoteInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultQuote =
    'SHabit의 트래킹 기능을 사용해보세요! 바른자세가 될 수 있도록 도와드립니다.';
  const duplicate = '이미 서비스를 이용 중인 계정입니다.';

  const quote = typedUseSelector((state) => {
    if (state.chart.quote.length === 0) return defaultQuote;
    return state.chart.quote;
  });
  const initStretchingMin = useSelector((state) => {
    return state.admin.stretchingTime / 60;
  });

  const email = JSON.parse(sessionStorage.getItem('user')).email; // user 불러오기
  const refreshToken = JSON.parse(sessionStorage.getItem('refreshToken')); // user 불러오기

  const onStart = async () => {
    if (wsc.connected === false) await wsc.asyncConnect(email, refreshToken);

    await wsc.checkDuplicated().then((res) => {
      if (res === 'Not Duplicated') {
        //TODO 처리(시작)
        fetchAlarmTime().then(() => {
          dispatch(setInitStretchingTime(1));
          // dispatch(setInitStretchingTime(initStretchingMin));
          dispatch(setMode('startLive'));
          dispatch(setInitUsedTime());

          wsc.startHeartbeat();
          navigate('/posture/live');
        });
      } else FireAlert(duplicate);
    });
  };

  return (
    <Wrapper>
      <InfoBox>
        <InfoTitle>
          <FiAlertCircle />
          알고 계셨나요?
        </InfoTitle>
        <div>{quote}</div>
      </InfoBox>

      <Start onClick={onStart}>
        <BsFillCaretRightSquareFill />
        <div>자세교정 시작하기</div>
      </Start>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  padding: 1.5rem 1rem;

  display: flex;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const InfoBox = styled.div`
  width: 60%;
  color: ${(props) => props.theme.color.primary};
  font-size: 1.1rem;
  font-weight: 600;

  & > div:last-child {
    width: 20rem;
    height: 5.5rem;
    overflow: hidden;
    word-break: keep-all;
    word-wrap: break-word;
  }
`;

const InfoTitle = styled.div`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  display: flex;
  align-items: center;
`;

const Start = styled.div`
  color: ${(props) => props.theme.color.primary};
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  font-size: 0.7rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  &:active {
    transform: translateY(0.3rem);
  }

  & > svg {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;
