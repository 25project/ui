import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

type ChatRole = 'user' | 'ai';
type ChatMessage = {
  role: ChatRole;
  text: string;
};

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTopicSelected, setIsTopicSelected] = useState(false); // 주제 선택 여부 상태
  const [selectedTopic, setSelectedTopic] = useState('');

  // 주제 선택 후 화면 변경
  const handleTopicSelect = (topic: string) => {
    console.log(`Selected topic: ${topic}`); // 선택된 주제 확인
    setSelectedTopic(topic);
    setIsTopicSelected(true); // 주제 선택 후 화면을 채팅으로 변경
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        role: 'ai',
        text: `AI의 응답: "${input}"`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);

    setInput('');
  };

  // 종료 버튼 클릭 시 홈 화면으로 이동
  const handleEndChat = () => {
    navigate('/home');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          {isTopicSelected ? `💬 채팅 주제: ${selectedTopic}` : '💬 채팅 주제 추천'}
        </div>

        {/* 주제 선택 화면 */}
        {!isTopicSelected && (
          <div className="topic-selection">
            <p>어떤 주제로 대화할까요?</p>
            <button onClick={() => handleTopicSelect('여행')}>🌍 여행</button>
            <button onClick={() => handleTopicSelect('음악')}>🎶 음악</button>
            <button onClick={() => handleTopicSelect('영화')}>🎬 영화</button>
            <button onClick={() => handleTopicSelect('책')}>📚 책</button>
            <button onClick={() => handleTopicSelect('기타')}> 기타</button>
          </div>
        )}

        {/* 채팅 메시지 영역 */}
        {isTopicSelected && (
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}-message`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* 채팅 입력 영역 */}
        {isTopicSelected && (
          <div className="chat-input-area">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        )}

        {/* 종료 버튼 */}
        <button className="exit-button" onClick={handleEndChat}>🚪</button>
      </div>
    </div>
  );
}
