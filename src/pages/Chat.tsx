import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Chat.css'; // ✅ CSS 추가

type ChatRole = 'user' | 'ai';
type ChatMessage = {
  role: ChatRole;
  text: string;
};

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 추가
  const topic = location.state?.topic ?? 'default';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'text' | 'voice'>('text');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        role: 'ai',
        text: `(${topic})에 대한 응답: "${input}"`,
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">💬 Chat Room - {topic}</div>

        <div className="chat-mode-toggle">
          <button 
            className={mode === 'text' ? 'active' : ''} 
            onClick={() => setMode('text')}
          >
            💬 텍스트 채팅
          </button>
          <button 
            className={mode === 'voice' ? 'active' : ''} 
            onClick={() => setMode('voice')}
          >
            🎤 음성 채팅
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}-message`}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        {mode === 'text' ? (
          <div className="chat-input-area">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <button className="send-button" onClick={handleSend}>Send</button>
          </div>
        ) : (
          <div className="voice-mode">
            <p>🎤 음성 모드 활성화됨 (추후 음성 인식 기능 추가 예정)</p>
          </div>
        )}

        <button className="exit-button" onClick={() => navigate('/home')}>🚪 종료</button> {/* ✅ 종료 버튼 추가 */}
      </div>
    </div>
  );
}
