import { AlertCircle, Users, Code } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <div id="features" className="mt-20 max-w-4xl w-full">
      <h2 className="text-3xl font-bold text-center mb-12">왜 404 Grave인가요?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">실패를 기록하세요</h3>
          <p className="text-gray-600">
            실패한 프로젝트의 이야기를 기록하고, 다른 개발자들과 경험을 공유하세요.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">커뮤니티</h3>
          <p className="text-gray-600">
            같은 경험을 한 개발자들과 소통하고, 서로에게 도움이 되는 정보를 나누세요.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">학습과 성장</h3>
          <p className="text-gray-600">
            실패에서 배우고, 더 나은 개발자로 성장하는 과정을 기록하세요.
          </p>
        </div>
      </div>
    </div>
  )
}
