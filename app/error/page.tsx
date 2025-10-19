import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
        <p className="text-gray-600 mb-8">죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
        <Button onClick={() => window.location.href = '/'}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}