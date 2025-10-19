import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { 
  TombstoneIcon, 
  GhostIcon, 
  CoffinIcon, 
  SkullIcon,
  MoonIcon,
  StarIcon
} from '@/components/ui/grave-icons'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: 'tombstone' | 'ghost' | 'coffin' | 'skull' | 'moon' | 'star' | 'custom'
  customIcon?: ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'secondary'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'secondary'
  }
  className?: string
}

const iconComponents = {
  tombstone: TombstoneIcon,
  ghost: GhostIcon,
  coffin: CoffinIcon,
  skull: SkullIcon,
  moon: MoonIcon,
  star: StarIcon
}

export default function EmptyState({
  icon = 'tombstone',
  customIcon,
  title,
  description,
  action,
  secondaryAction,
  className = ''
}: EmptyStateProps) {
  const IconComponent = icon !== 'custom' ? iconComponents[icon] : null

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center py-12 px-6',
      className
    )}>
      <div className="mb-6">
        {customIcon ? (
          <div className="text-muted-foreground/50">
            {customIcon}
          </div>
        ) : IconComponent ? (
          <IconComponent className="h-16 w-16 text-muted-foreground/50" />
        ) : null}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {title}
      </h3>

      <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="flex gap-3">
          {action && (
            <Button 
              onClick={action.onClick}
              variant={action.variant || 'default'}
              className="gap-2"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              className="gap-2"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// 특정 상황별 EmptyState 컴포넌트들
export function EmptyProjects({ onCreateProject }: { onCreateProject: () => void }) {
  return (
    <EmptyState
      icon="tombstone"
      title="아직 무덤이 없습니다"
      description="첫 번째 실패한 프로젝트를 무덤에 안치해보세요. 모든 위대한 개발자들은 실패를 통해 성장했습니다."
      action={{
        label: '첫 무덤 만들기',
        onClick: onCreateProject
      }}
    />
  )
}

export function EmptySearch({ onClearSearch }: { onClearSearch: () => void }) {
  return (
    <EmptyState
      icon="ghost"
      title="검색 결과가 없습니다"
      description="다른 키워드로 검색하거나 필터를 조정해보세요. 유령들은 때로 숨어있을 수 있습니다."
      action={{
        label: '검색 초기화',
        onClick: onClearSearch,
        variant: 'outline'
      }}
    />
  )
}

export function EmptyFavorites({ onBrowseProjects }: { onBrowseProjects: () => void }) {
  return (
    <EmptyState
      icon="star"
      title="즐겨찾기한 무덤이 없습니다"
      description="마음에 드는 프로젝트를 즐겨찾기에 추가해보세요. 다른 개발자들의 실패 스토리에서 배울 수 있습니다."
      action={{
        label: '프로젝트 둘러보기',
        onClick: onBrowseProjects
      }}
    />
  )
}

export function EmptyCategories({ onCreateCategory }: { onCreateCategory: () => void }) {
  return (
    <EmptyState
      icon="coffin"
      title="카테고리가 없습니다"
      description="프로젝트를 분류할 카테고리를 만들어보세요. 체계적인 분류는 더 나은 학습을 도와줍니다."
      action={{
        label: '카테고리 만들기',
        onClick: onCreateCategory
      }}
    />
  )
}

export function EmptyMemorial({ onNominate }: { onNominate: () => void }) {
  return (
    <EmptyState
      icon="moon"
      title="명예의 전당이 비어있습니다"
      description="특별한 실패 스토리를 명예의 전당에 추천해보세요. 가장 인상적인 무덤들이 여기에 전시됩니다."
      action={{
        label: '추천하기',
        onClick: onNominate
      }}
    />
  )
}
