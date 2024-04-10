export type IChangeEvent = React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>

export interface IListPayload {
  page: number
  perPage: number
  search?: string
  filter?: string
}

export interface IMediaResponse {
  id: number
  title: {
    userPreferred: string
  }
  type: string
  status: string
  seasonYear: number
  episodes: number
  source: string
  coverImage: {
    large: string
    medium: string
  }
}

export type IMediaDetailResponse = IMediaResponse & {
  format: string
  description: string
  duration: number
  bannerImage: string
  tags: {
    name: string
  }[]
}
