export default function Settings(){
    return(
        <div>
            <h3 className="font-bold text-gray-700">偏好设置</h3>
            <label className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                <input type="checkbox" /> 专注结束播放提示音
            </label>
        </div>
    );
}