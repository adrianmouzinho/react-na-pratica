import { FileDown, MoreHorizontal, Plus, Search } from 'lucide-react'

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

export function App() {
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
            <Plus className="size-3" />
            Create tag
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant="filter">
            <Search className="size-4" />
            <Control placeholder="Search tags" />
          </Input>

          <Button variant="secondary">
            <FileDown className="size-4" /> Export
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
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="grid gap-0.5">
                      <span className="font-medium">React</span>
                      <span className="text-sm text-zinc-500">
                        lajdofajsdfaksdjflakdf
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">15 video(s)</TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
