export interface Branch {
  id: string
  branchCode: string
  branchName: string
  description: string
  icon: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnailUrl: string
  price: number
  currency: string
  categoryId: string
  instructorId: string
  published: boolean
  isPreviewFree: boolean
  accessAllBranches: boolean
  totalLessons: number
  difficultyLevel: string
  language: string
  status: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface SearchQuery {
  q?: string
  categoryId?: string
  branchId?: string
  difficulty?: string
  language?: string
  published?: boolean
  page?: number
  pageSize?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
