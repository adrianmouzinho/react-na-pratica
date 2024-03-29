import { ChevronDown, Slash } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import nivoLogo from '@/assets/logo-nivo.svg'

export function Header() {
  return (
    <header className="max-w-[1248px] mx-auto flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <img src={nivoLogo} alt="nivo.video" />

          <Badge>BETA</Badge>
        </div>

        <Slash className="size-3 text-zinc-800 -rotate-[25deg]" />

        <div className="flex items-center gap-2.5">
          <img
            src="https://github.com/rocketseat.png"
            className="size-5 rounded-full"
            alt=""
          />

          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-100">
            Rocketseat
          </span>

          <Badge variant="primary">PRO</Badge>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>

        <Slash className="size-3 text-zinc-800 -rotate-[25deg]" />

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-100">
            Ignite
          </span>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-medium">Adrian Mouzinho</span>
          <span className="text-xs text-zinc-400">adrian@nivo.video</span>
        </div>
        <Avatar>
          <AvatarImage
            src="https://github.com/adrianmouzinho.png"
            alt="@adrianmouzinho"
          />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <ChevronDown className="size-4 text-zinc-600" />
      </div>
    </header>
  )
}
