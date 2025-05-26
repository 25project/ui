import { useState } from 'react';
import './Chat.css';  // 스타일 파일 연결

export default function Chat() {
  const [isTopicSelected, setIsTopicSelected] = useState(false); // 주제 선택 여부 상태
  const [selectedTopic, setSelectedTopic] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setIsTopicSelected(true);
    setMessages([...messages, `You selected: ${topic}`]); // 주제 선택 후 메시지 추가
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          {isTopicSelected ? `💬 롤플레이 주제: ${selectedTopic}` : '💬 롤플레이 주제 선택'}
        </div>

        {/* 롤플레이 주제 선택 화면 */}
        {!isTopicSelected && (
          <div className="topic-selection">
            <p>어떤 롤플레이를 할까요?</p>
            <button onClick={() => handleTopicSelect('병원에서 의사와 환자')}>🏥 병원</button>
            <button onClick={() => handleTopicSelect('레스토랑에서 주문하기')}>🍽️ 레스토랑</button>
            <button onClick={() => handleTopicSelect('공항에서 체크인하기')}>✈️ 공항</button>
            <button onClick={() => handleTopicSelect('호텔에서 체크인하기')}>🏨 호텔</button>
          </div>
        )}

        {/* 채팅 메시지 영역 */}
        {isTopicSelected && (
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="message">
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* 채팅 입력 영역 */}
        {isTopicSelected && (
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Type your message..."
            />
            <button className="send-button">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
