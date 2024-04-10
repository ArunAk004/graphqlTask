import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_MEDIA_BY_ID } from "../api/query"
import { queryOptions } from "../resources"
import { IMediaDetailResponse } from "../interface"
import {
  AboutMedia,
  BannerImg,
  BasicDetails,
  DetailContainer,
  DetailsLoader,
  DetailsSection,
  MediaCoverImg,
  TagSection,
} from "../assets/style"
import { Chip, Grid } from "@mui/material"

interface IState {
  mediaDetails: IMediaDetailResponse
  loader: boolean
}

interface IViewMediaComponent {
  mediaId: number
}

const intialState = {
  mediaDetails: {
    id: 0,
    title: {
      userPreferred: "",
    },
    type: "",
    format: "",
    status: "",
    description: "",
    seasonYear: 0,
    episodes: 0,
    duration: 0,
    source: "",
    bannerImage: "",
    coverImage: {
      large: "",
      medium: "",
    },
    tags: [],
  },
  loader: true,
} as IState

export default function ViewMediaComponent(props: IViewMediaComponent) {
  const [getMediaById] = useLazyQuery(GET_MEDIA_BY_ID, queryOptions)
  const [state, setState] = useState<IState>(intialState)

  const { mediaDetails, loader } = state
  const { title, coverImage, description, format, type, source, tags, episodes, seasonYear, bannerImage } =
    mediaDetails

  const { mediaId } = props

  useEffect(() => {
    const fetchMediaDetails = async () => {
      setState(state => ({ ...state, loader: true }))
      const response = await getMediaById({
        variables: {
          id: mediaId,
        },
      })
      const { data } = response
      if (data) {
        setState(state => ({ ...state, mediaDetails: data.Page.media[0], loader: false }))
      }
    }

    fetchMediaDetails()
  }, [mediaId])

  return (
    <>
      <DetailContainer>
        {loader ? (
          <DetailsLoader>Loading...</DetailsLoader>
        ) : (
          <>
            <BannerImg>
              <img src={bannerImage} alt={title.userPreferred} />
            </BannerImg>

            <DetailsSection>
              <Grid container spacing={3}>
                <Grid item lg={5} xs={12}>
                  <MediaCoverImg>
                    <img src={coverImage.large} alt={title.userPreferred} />
                  </MediaCoverImg>
                </Grid>

                <Grid item lg={7}>
                  <BasicDetails>
                    <h1>{title.userPreferred}</h1>
                    <span>Year of release: {seasonYear}</span>
                    <p>{description}</p>
                  </BasicDetails>

                  <AboutMedia>
                    <Chip label={type} />
                    <Chip label={format} />
                    <Chip label={`Total no. eps : ${episodes}`} />
                    <Chip label={`Sources : ${source}`} />
                  </AboutMedia>

                  <h5>Search Tags:</h5>
                  <TagSection>
                    {tags.map((item: { name: string }, i: number) => {
                      return <Chip key={i} label={item.name} color="primary" variant="outlined" />
                    })}
                  </TagSection>
                </Grid>
              </Grid>
            </DetailsSection>
          </>
        )}
      </DetailContainer>
    </>
  )
}
