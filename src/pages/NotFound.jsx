import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-orange-200">404</h1>
      <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl -mt-12 border border-white/50">
        <h2 className="text-2xl font-bold text-gray-800">哎呀，页面走丢了</h2>
        <p className="text-gray-500 mt-2 mb-6">地址栏里输入的路径似乎不存在...</p>
        <Link to="/" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl shadow-lg inline-block transition-transform hover:scale-105">
          带我回首页
        </Link>
      </div>
    </div>
  );
}