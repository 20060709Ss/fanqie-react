import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [second, setSecond] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('my-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let timer = null;
    if (isActive && second > 0) {
      timer = setInterval(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
    } else if (second === 0) {
      setIsActive(false);
      const audio = new Audio('/soundreality-ding-411634.mp3');
      audio.play().catch(error =>{
        console.log("自动播放被拦截，这是正常现象：",error);
      });
      navigate('/about');
    }
    return () => clearInterval(timer);
  }, [isActive, second, navigate]);

  useEffect(() => {
    localStorage.setItem('my-history', JSON.stringify(history));
  }, [history]);

  const handleHistory = () => {
    if (note.trim() === '') return;
    setHistory([`[${new Date().toLocaleDateString()}] ${note}`, ...history]);
    setNote('');
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecond(60);
  };

  // 计算圆环进度
  const progress = ((60 - second) / 60) * 100;

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">
              🍅 番茄钟
            </span>
          </h1>
          <p className="text-gray-600">专注当下，记录心情</p>
        </div>

        {/* 计时器卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-white/20">
          {/* 倒计时圆环 */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* 背景圆环 */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              {/* 进度圆环 */}
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 88}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>
            {/* 中间数字 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-5xl font-bold text-gray-800">{second}</span>
              <span className="block text-sm text-gray-500">秒</span>
            </div>
          </div>

          {/* 控制按钮组 */}
          <div className="flex justify-center gap-3">
            {!isActive ? (
              <button
                onClick={() => setIsActive(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                开始专注
              </button>
            ) : (
              <button
                onClick={() => setIsActive(false)}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                暂停
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              重置
            </button>
          </div>
        </div>

        {/* 心情记录卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            心情记录
          </h2>
          <div className="flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="写点当下的心情..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all bg-white/50"
            />
            <button
              onClick={handleHistory}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              记录
            </button>
          </div>
        </div>

        {/* 心情轨迹卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              我的心情轨迹
            </h2>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-sm text-gray-500 hover:text-rose-500 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                清空记录
              </button>
            )}
          </div>
          
          {history.length > 0 ? (
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="p-3 bg-white/50 rounded-xl border border-gray-100 text-gray-700 hover:shadow-md transition-shadow"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>还没有心情记录，开始记录第一条吧~</p>
            </div>
          )}
        </div>       
      </div>
    </div>
  );
}