export default function About() {
  return (
    <div className="py-16 px-4 max-w-2xl mx-auto text-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-white/20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">关于本站</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          这是我学习 React 期间开发的进阶作品。<br />
          集成了 <b>React Hooks、Tailwind CSS、React Router</b> 和 <b>LocalStorage</b>。<br />
          不仅外观精美，而且完全是一个功能完备的单页面应用 (SPA)！
        </p>
        <div className="text-5xl mb-4">🚀</div>
        <p className="text-gray-400 text-sm">继续保持专注，代码终将改变世界。</p>
      </div>
    </div>
  );
}