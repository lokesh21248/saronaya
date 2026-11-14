import Link from 'next/link'
import { BookOpen, Clock, ChevronRight, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface CourseCardProps {
  title: string
  slug: string
  thumbnailUrl: string
  category: string
  difficulty: string
  price: number
  currency: string
  lessonCount: number
  durationMinutes: number
  instructor: string
  rating: number
  reviewCount: number
  isPreviewFree: boolean
  isPublished: boolean
  showAction?: boolean
}

export function CourseCard({
  title,
  slug,
  thumbnailUrl,
  category,
  difficulty,
  price,
  currency,
  lessonCount,
  durationMinutes,
  instructor,
  rating,
  reviewCount,
  isPreviewFree,
  isPublished,
}: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <Link href={`/learn/${slug}`}>
      <Card className="h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="relative overflow-hidden h-48 bg-navy-soft">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Free preview badge */}
          {isPreviewFree && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-gold text-navy-deep text-xs font-semibold">
              Free Preview
            </div>
          )}

          {/* Difficulty badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-navy-soft text-xs text-muted">
            {difficulty}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <BookOpen size={12} />
            <span>{category}</span>
          </div>

          <h3 className="heading-3 mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-muted mb-3">
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {lessonCount} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDuration(durationMinutes)}
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-sm">{rating}</span>
              <span className="text-xs text-muted">({reviewCount})</span>
            </div>

            <div className="text-right">
              {isPreviewFree ? (
                <span className="text-xs text-muted">Free preview</span>
              ) : (
                <>
                  <span className="font-bold text-gold">₹{price}</span>
                  <span className="text-xs text-muted">{currency}</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">{instructor}</span>
            <span className="text-sm font-semibold text-navy">
              Go to course →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
