import { ListVideo, Tags, Settings, Code2 } from 'lucide-react'

export function Tabs() {
  return (
    <div className="border-b py-4">
      <nav className="flex items-center gap-2 max-w-[1248px] mx-auto px-6">
        <a
          href=""
          className="py-1.5 px-3 bg-zinc-800 text-zinc-100 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent"
        >
          <ListVideo className="size-4" />
          Uploads
        </a>

        <a
          href=""
          className="py-1.5 px-3 text-zinc-500 dark:text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-border"
        >
          <Tags className="size-4" />
          Tags
        </a>

        <a
          href=""
          className="py-1.5 px-3 text-zinc-500 dark:text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-border"
        >
          <Settings className="size-4" />
          Settings
        </a>

        <a
          href=""
          className="py-1.5 px-3 text-zinc-500 dark:text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-border"
        >
          <Code2 className="size-4" />
          Developers
        </a>
      </nav>
    </div>
  )
}
