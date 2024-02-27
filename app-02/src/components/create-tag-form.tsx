import { CheckIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CreateTagSchema, createTagSchema } from '@/schemas/tag'
import { getSlugFromString } from '@/utils/get-slug-from-string'

export function CreateTagForm() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      title: '',
    },
  })

  const slug = getSlugFromString(watch('title'))

  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: CreateTagSchema) => {
      // Delay 1s
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await fetch('http://localhost:3333/tags', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug,
          amountOfVideos: 0,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    },
  })

  async function handleCreateTag({ title }: CreateTagSchema) {
    await mutateAsync({ title })

    toast({
      title: 'Created tag successfully!',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateTag)} className="grid gap-6 mt-10">
      <div className="grid gap-2.5">
        <Label htmlFor="tag">Tag name</Label>
        <Input {...register('title')} id="tag" />
        {errors.title && (
          <span className="text-sm text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="grid gap-2.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={slug} readOnly />
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <CheckIcon className="size-4" />
          )}
          Save
        </Button>
      </SheetFooter>
    </form>
  )
}
