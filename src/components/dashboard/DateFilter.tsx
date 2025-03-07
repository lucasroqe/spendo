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
        variant={currentFilter === 'total' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('total')}
      >
        Total
      </Button>
      <Button
        variant={currentFilter === '3months' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('3months')}
      >
        3 months
      </Button>
      <Button
        variant={currentFilter === '30days' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFilterChange('30days')}
      >
        30 days
      </Button>
    </div>
  )
}
