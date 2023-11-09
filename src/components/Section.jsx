import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import '../App.css';
import AWSConfig from './AWSConfig';
;

const Section = ({ text, setText }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

  const convertToSpeech = () => {
    AWS.config.update(AWSConfig); // Set AWS Config

    const Polly = new AWS.Polly();

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Joanna'
    };

    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      }
    });
  };

  return (
    <div className="section-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn-convert"
        onClick={convertToSpeech}
      >
        Convert to Speech
      </button>

      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default Section;
