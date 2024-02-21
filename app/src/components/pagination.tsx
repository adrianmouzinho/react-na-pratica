import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PaginationProps {
  pages: number
  items: number
  page: number
}

export function Pagination({ items, page, pages }: PaginationProps) {
  const [, setSearchParams] = useSearchParams()

  const isFirstPage = page - 1 <= 0
  const isLastPage = page + 1 > pages

  function firstPage() {
    setSearchParams((params) => {
      params.set('page', '1')

      return params
    })
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set('page', String(pages))

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page + 1))

      return params
    })
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-500">
      <span>Showing 10 of {items} items</span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <Select defaultValue="10">
            <SelectTrigger className="w-16">
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>
          Page {page} of {pages}
        </span>
        <div className="space-x-1.5">
          <Button
            onClick={firstPage}
            variant="secondary"
            size="icon"
            disabled={isFirstPage}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            onClick={previousPage}
            variant="secondary"
            size="icon"
            disabled={isFirstPage}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            onClick={nextPage}
            variant="secondary"
            size="icon"
            disabled={isLastPage}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            onClick={lastPage}
            variant="secondary"
            size="icon"
            disabled={isLastPage}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
