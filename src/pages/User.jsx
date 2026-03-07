import { useParams,Link,Outlet} from "react-router-dom";

export default function User(){
    const {name} = useParams();

    return(
        <div className="py-16 px-4 max-w-2xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-white/20">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">欢迎回来，<span className="text-orange-500">{name}</span></h1>
                
                <div className="flex justify-center items-center gap-5 mb-6 border-b pb-2 ">
                    <Link to="profile" className="text-orange-500 hover:underline">基本资料</Link>
                    <Link to="settings" className="text-orange-500 hover:underline">偏好设置</Link>
                </div>

                <div className="bg-orange-50/50 p-4 rounded-xl border border-dashed border-orange-200">
                    <Outlet />
                </div>

                
            </div>
        </div>
    );
};