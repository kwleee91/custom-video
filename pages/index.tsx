import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import styled from "styled-components";
import Image from "next/image";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHoveredProgressControl, setIsHoveredProgressControl] =
    useState(false);
  const [isHoveredVolumeControl, setIsHoveredVolumeControl] = useState(false);
  const [isAds, setIsAds] = useState(false);

  const [volume, setVolume] = useState<string | number>(1);
  const [seekValue, setSeekValue] = useState<string | number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [srcVideo, setSrcVideo] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const elapsedTime =
    (videoRef && videoRef.current && videoRef.current.currentTime) || 0;
  const totalTime =
    (videoRef && videoRef.current && videoRef.current.duration) || 0;

  const onClick = () => {
    progressRef.current?.focus();
  };

  const addTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current) {
      progressRef.current?.focus();
    }

    playingAds();
  };

  const playingAds = () => {
    if (Math.floor(videoRef.current?.currentTime) === 3 && !isAds) {
      setIsAds(!isAds);
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    if (isAds && videoRef.current) {
      setSrcVideo(
        "https://ak.picdn.net/shutterstock/videos/1058114491/preview/stock-footage-close-up-of-an-young-active-sporty-athlete-smiling-woman-is-taking-a-break-after-making-running-and.webm"
      );
      videoRef.current?.load();
      videoRef.current?.play();
      videoRef.current.onended = () => {
        setSrcVideo(
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        );
        videoRef.current?.load();
        videoRef.current?.play();
        setSeekValue(0);
        videoRef.current.onended = null;
      };
    }
  }, [isAds, videoRef]);

  const playingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seek = videoRef.current?.duration * (+e.target.value / 100);
    videoRef.current.currentTime = seek;
    setSeekValue(e.target.value);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setVolume(videoRef.current.volume);
      } else {
        videoRef.current.muted = true;
        setVolume(0);
      }
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      videoRef?.current?.offsetParent?.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const showProgressControl = () => {
    setIsHoveredProgressControl(!isHoveredProgressControl);
    if (controlRef.current) {
      if (!isHoveredProgressControl) {
        controlRef.current.hidden = false;
      } else {
        controlRef.current.hidden = true;
      }
    }
  };

  const showVolumeControl = () => {
    setIsHoveredVolumeControl(!isHoveredVolumeControl);
    if (volumeRef.current) {
      if (isHoveredVolumeControl) {
        volumeRef.current.hidden = true;
      } else {
        volumeRef.current.hidden = false;
      }
    }
  };

  const controlVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = e.target.value;
    videoRef.current.volume = volume;
    setVolume(e.target.value);
  };

  const toTimeString = (second: number) => {
    const date = new Date(second * 1000);

    const mm = date.getUTCMinutes();
    const ss = date.getSeconds();

    const formattedMinute = mm + ":";
    const formattedSecond = (ss < 10 ? "0" : "") + ss;

    return formattedMinute + formattedSecond;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    switch (e.keyCode) {
      case 32:
        togglePlay();
        break;
      case 37:
        break;
      case 39:
        break;
    }
  };

  return (
    <Container>
      <VideoWrapper //
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={showProgressControl}
        onMouseLeave={showProgressControl}
      >
        {videoRef.current?.networkState !== 1 ? (
          <ImgWrapper>
            <Image //
              src="/loading.jpg"
              alt="loading"
              width={100}
              height={100}
            />
          </ImgWrapper>
        ) : null}
        <video //
          ref={videoRef}
          onTimeUpdate={addTimeUpdate}
        >
          <source src={srcVideo} ref={sourceRef} type="video/mp4" />
        </video>
        <ControlWrapper ref={controlRef}>
          <ProgressBar>
            <input
              id="progress-bar"
              ref={progressRef}
              onChange={playingTime}
              value={seekValue}
              type="range"
              min="0"
              step="1"
            />
          </ProgressBar>

          <ControlBar>
            <ControlBarColumn>
              <Image //
                onClick={togglePlay}
                src={isPlaying ? "/pause.png" : "/play-button.png"}
                alt={isPlaying ? "pause" : "play-button"}
                width={30}
                height={30}
              />
              <VolumeWrapper //
                id="volume-wrapper"
                onMouseEnter={showVolumeControl}
                onMouseLeave={showVolumeControl}
              >
                <Image //
                  onClick={toggleMute}
                  src={isMuted ? "/mute.jpg" : "/speaker.jpg"}
                  alt={isMuted ? "mute" : "speaker"}
                  width={38}
                  height={38}
                />
                <input
                  hidden
                  ref={volumeRef}
                  defaultValue={1}
                  onChange={controlVolume}
                  value={volume}
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                />
              </VolumeWrapper>
            </ControlBarColumn>
            <ControlBarColumn>
              <TimeTable>
                <span>{toTimeString(elapsedTime)}&nbsp;</span>
                <span>/&nbsp;{toTimeString(totalTime)}</span>
              </TimeTable>
              <Image //
                onClick={toggleFullScreen}
                src="/full-screen.png"
                alt="full-screen"
                width={30}
                height={30}
              />
            </ControlBarColumn>
          </ControlBar>
        </ControlWrapper>
      </VideoWrapper>
    </Container>
  );
};

const Container = styled.div``;

const VideoWrapper = styled.div`
  max-width: 800px;
  max-height: 800px;
  position: relative;
  margin: 0 auto;
  video {
    width: 100%;
    height: 100%;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 800px;
  height: 450px;
`;

const ControlWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px 0;
  background-color: white;
`;
const ProgressBar = styled.div`
  padding: 0 10px;
  input {
    width: 100%;
  }
`;
const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const ControlBarColumn = styled.div`
  display: flex;
  align-items: center;
`;
const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const TimeTable = styled.div`
  margin-right: 15px;
`;

export default Video;
