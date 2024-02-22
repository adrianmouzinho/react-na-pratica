export interface Tag {
  id: string
  title: string
  amountOfVideos: number
}

export interface TagResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Tag[]
}
