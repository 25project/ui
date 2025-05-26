import { useState } from 'react';
import './Voice.css';

export default function VoiceChat() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  
  const startRecording = () => {
    setIsRecording(true);
    // 음성 인식 시작 코드 추가 (SpeechRecognition API 또는 다른 음성 인식 라이브러리)
    console.log("Recording started...");
  };

  const stopRecording = () => {
    setIsRecording(false);
    // 음성 인식 종료 코드 추가
    console.log("Recording stopped...");
    // 예시: 음성 결과를 메시지로 추가 (실제로 음성 인식 결과는 API를 통해 받음)
    setMessages([...messages, "AI's response based on recorded speech"]);
  };

  return (
    <div className="voice-chat-container">
      <div className="voice-chat-box">
        <div className="voice-chat-header">
          🎤 음성 채팅
        </div>

        <div className="voice-chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              <span>{msg}</span>
            </div>
          ))}
        </div>

        <div className="voice-chat-controls">
          <button
            className={`record-btn ${isRecording ? 'active' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>
    </div>
  );
}
