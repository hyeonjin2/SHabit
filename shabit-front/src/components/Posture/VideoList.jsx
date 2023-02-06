import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/videoSlice';

import { fetchVods } from '../../services/vod/get';

export default function VideoList() {
  const [videoList, setVideoList] = useState(); // 비디오 리스트
  const [isClicked, setIsClicked] = useState();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVods(user.email).then((res) => {
      setVideoList(res);
    });
  }, []);

  // 선택한 비디오 정보 redux로 보냄
  const selectVideo = (idx) => {
    dispatch(setSelected(videoList[idx]));
    setIsClicked(idx);
  };

  const style = {
    box: {
      border: `0.2rem solid ${theme.color.primary}`,
    },
    title: {
      backgroundColor: theme.color.primary,
      color: theme.color.secondary,
    },
  };

  if (videoList) {
    return (
      <VideoContainer>
        {videoList.map((video, idx) => {
          return (
            <Container
              key={idx}
              style={isClicked === idx ? style.box : null}
              onClick={() => {
                selectVideo(idx);
              }}
            >
              <Minute style={isClicked === idx ? style.title : null}>
                {video.length}분
              </Minute>
              <img src={video.thumbnail} alt="thumbnail" />
            </Container>
          );
        })}
      </VideoContainer>
    );
  }
}

const VideoContainer = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-evenly;
`;

const Container = styled.div`
  width: 30%;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
  position: relative;

  border: 0.2rem solid ${theme.color.secondary};

  display: flex;
  justify-content: center;

  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  & > img {
    border-radius: 0.5rem;
  }
`;

const Minute = styled.div`
  padding: 0.2rem 0;
  font-weight: bold;
  width: 40%;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};

  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};

  position: absolute;
  top: -10%;
`;