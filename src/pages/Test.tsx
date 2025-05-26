import { useState } from 'react';
import './Test.css';  // 스타일 파일 연결

// 음성 인식 관련 API
const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition) as any;
const recognition = new SpeechRecognition();

export default function Test() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userText, setUserText] = useState('');
  const [isRecording, setIsRecording] = useState(false); // 음성 인식 상태
  const [isSpeakingTest, setIsSpeakingTest] = useState(false); // 말하기 시험 상태

  const questions = [
    {
      question: 'What is the meaning of "improve"?',
      options: ['Make better', 'Make worse', 'Stay the same'],
      answer: 'Make better',
    },
    {
      question: 'What is the opposite of "happy"?',
      options: ['Sad', 'Excited', 'Joyful'],
      answer: 'Sad',
    },
    {
      question: 'Which word means "conversation"?',
      options: ['Talk', 'Walk', 'Run'],
      answer: 'Talk',
    },
  ];

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Test completed! Your score is: ${score + 1}`);
    }
  };

  // 음성 인식 시작
  const startRecording = () => {
    setIsRecording(true);
    recognition.start();
  };

  // 음성 인식 중지
  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  // 음성 인식 결과 처리
  recognition.onresult = (event: any) => {
    const speechToText = event.results[0][0].transcript;
    setUserText(speechToText);
    console.log('Recognized text:', speechToText);
    // 예시로, 인식된 텍스트와 퀴즈 정답 비교
    if (speechToText.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore(score + 1);
    }
  };

  // 말하기 시험 시작
  const startSpeakingTest = () => {
    setIsSpeakingTest(true); // 말하기 시험으로 전환
  };

  return (
    <div className="test-container">
      <div className="test-card">
        <h2>📝 Test</h2>

        {/* 문법 퀴즈 화면 */}
        {!isSpeakingTest && (
          <>
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} className="option-btn">
                  {option}
                </button>
              ))}
            </div>
            <div className="score">
              <p>Current Score: {score}</p>
            </div>

            {/* 말하기 시험 시작 버튼 */}
            <button onClick={startSpeakingTest} className="start-speaking-test-btn">
              🎤 Start Speaking Test
            </button>
          </>
        )}

        {/* 말하기 시험 화면 */}
        {isSpeakingTest && (
          <div className="speech-test">
            <h3>🎤 말하기 테스트</h3>
            <button onClick={startRecording} disabled={isRecording} className="record-btn">
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
            <button onClick={stopRecording} disabled={!isRecording} className="stop-btn">
              Stop Recording
            </button>
            <p>Recognized Speech: {userText}</p>
            <div className="score">
              <p>Current Score: {score}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
