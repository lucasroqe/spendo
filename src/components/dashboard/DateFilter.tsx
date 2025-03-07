'use client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export function DateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentFilter = searchParams.get('filter') || 'total'

  const handleFilterChange = (filter: string) => {
    router.push(`/dashboard?filter=${filter}`)
  }

  return (
    <div className="mb-4 flex items-center space-x-2">
      <Button
        variant={currentFilter === 'total' ? 'ghost' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('total')}
        className="bg-emerald-500 text-white"
      >
        Total
      </Button>
      <Button
        variant={currentFilter === '3months' ? 'ghost' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('3months')}
        className="bg-emerald-500 text-white"
      >
        3 months
      </Button>
      <Button
        variant={currentFilter === '30days' ? 'ghost' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('30days')}
        className="bg-emerald-500 text-white"
      >
        30 days
      </Button>
    </div>
  )
}
