import { FormEvent, useState } from 'react'
import {
  FileDownIcon,
  SlidersIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Control, Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { Pagination } from '@/components/pagination'
import { TagResponse } from '@/types/tag'

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''

  const [filter, setFilter] = useState(urlFilter)

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const itemsPerPage = searchParams.get('per_page') ?? '10'

  const { data: tags, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags', urlFilter, page, itemsPerPage],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=${itemsPerPage}&title=${urlFilter}`,
      )
      const data = await response.json()

      // Delay 1s
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return data
    },
    placeholderData: keepPreviousData,
  })

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    if (!filter) {
      return
    }

    setSearchParams((params) => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="max-w-[1248px] mx-auto space-y-5 px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant="primary">
            <PlusIcon className="size-3" />
            Create tag
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <form onSubmit={handleFilter} className="flex items-center gap-2">
            <Input variant="filter">
              <SearchIcon className="size-4" />
              <Control
                placeholder="Search tags"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Input>

            <Button variant="secondary">
              <SlidersIcon className="size-4" /> Filter
            </Button>
          </form>

          <Button variant="secondary">
            <FileDownIcon className="size-4" /> Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="grid gap-0.5">
                      <span className="font-medium">{tag.title}</span>
                      <span className="text-sm text-zinc-500">{tag.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {tag.amountOfVideos} video(s)
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="icon">
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {tags && (
          <Pagination
            pages={tags.pages}
            items={tags.items}
            page={page}
            itemsPerPage={itemsPerPage}
            itemsOnPage={tags.data.length}
          />
        )}
      </main>
    </div>
  )
}
