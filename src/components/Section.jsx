import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import '../App.css';
import AWSConfig from './AWSConfig';

const Section = ({ text, setText }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState('Joanna'); 

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

  const convertToSpeech = () => {
    AWS.config.update(AWSConfig); 

    const Polly = new AWS.Polly();

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: selectedVoice
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
      <div className="voice-selector">
        <label htmlFor="voiceSelector">Select a Voice:</label>
        <select

          id="voiceSelector"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option value="Joanna">Joanna</option>
          <option value="Matthew">Matthew</option>
          <option value="Salli">Salli</option>
         
        </select>
      </div>
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
