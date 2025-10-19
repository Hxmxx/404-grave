import { TombstoneIcon, GhostIcon, PhoenixIcon, SkullIcon, CoffinIcon, StarIcon } from '@/components/ui/grave-icons'

export default function FeaturesSection() {
  return (
    <div id="features" className="mt-20 max-w-6xl w-full">
      <h2 className="text-4xl font-bold text-center mb-16 grave-text-gradient">왜 404 Grave인가요?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="grave-card rounded-xl p-8 text-center grave-fade-in">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 grave-glow">
            <TombstoneIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary">실패를 기록하세요</h3>
          <p className="text-muted-foreground leading-relaxed">
            실패한 프로젝트의 이야기를 기록하고, 다른 개발자들과 경험을 공유하세요. 
            <span className="text-accent font-medium">무덤은 기억의 장소입니다.</span>
          </p>
        </div>
        
        <div className="grave-card rounded-xl p-8 text-center grave-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 grave-glow">
            <GhostIcon className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-accent">커뮤니티</h3>
          <p className="text-muted-foreground leading-relaxed">
            같은 경험을 한 개발자들과 소통하고, 서로에게 도움이 되는 정보를 나누세요.
            <span className="text-accent font-medium">유령들은 서로를 이해합니다.</span>
          </p>
        </div>
        
        <div className="grave-card rounded-xl p-8 text-center grave-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 grave-glow">
            <PhoenixIcon className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-green-500">학습과 성장</h3>
          <p className="text-muted-foreground leading-relaxed">
            실패에서 배우고, 더 나은 개발자로 성장하는 과정을 기록하세요.
            <span className="text-green-500 font-medium">불사조는 재탄생합니다.</span>
          </p>
        </div>
      </div>
      
      {/* 추가 기능들 */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="grave-card rounded-xl p-6 text-center grave-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <SkullIcon className="h-6 w-6 text-yellow-500" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-yellow-500">사망 원인 분석</h4>
          <p className="text-muted-foreground text-sm">
            프로젝트가 실패한 이유를 체계적으로 분석하고 분류합니다.
          </p>
        </div>
        
        <div className="grave-card rounded-xl p-6 text-center grave-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <StarIcon className="h-6 w-6 text-purple-500" />
          </div>
          <h4 className="text-lg font-semibold mb-2 text-purple-500">명예의 전당</h4>
          <p className="text-muted-foreground text-sm">
            가장 인상적인 실패 스토리들을 선별하여 전시합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
