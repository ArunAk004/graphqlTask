import { useCallback, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_ALL_MEDIA } from "./api/query"
import { queryOptions } from "./resources"
import { IListPayload, IMediaResponse } from "./interface"
import CustomTableComponent from "./components/customTableComponent"
import { mediaTableColumn } from "./resources/tableHeaders"
import { ListAltOutlined } from "@mui/icons-material"
import { Dialog, Grid, IconButton } from "@mui/material"
import ViewMediaComponent from "./components/viewMediaComponent"
import { GlobalStyle } from "./assets/style"

interface IState {
  allMedia: any[]
  total: number
  loader: boolean
  viewMedia: {
    mediaId: number
    visible: boolean
  }
}

function App() {
  const [getAllMedia] = useLazyQuery(GET_ALL_MEDIA, queryOptions)
  const [state, setState] = useState<IState>({
    allMedia: [],
    total: 0,
    loader: true,
    viewMedia: {
      mediaId: 0,
      visible: false,
    },
  })
  const { allMedia, total, loader, viewMedia } = state

  const fetchMedia = useCallback(async (payload: IListPayload) => {
    setState(state => ({ ...state, loader: true }))
    const reponse = await getAllMedia({ variables: payload })
    const { data } = reponse
    if (data) {
      const { media, pageInfo } = data?.Page
      const { total } = pageInfo
      const constructData = media.map((item: IMediaResponse) => {
        return {
          id: item.id,
          poster: item.coverImage.medium,
          title: item.title.userPreferred,
          type: item.type,
          episodes: item.episodes,
          seasonYear: item.seasonYear,
          status: item.status,
          action: item.status,
        }
      })
      setState(state => ({ ...state, allMedia: constructData, total, loader: false }))
    }
  }, [])

  const viewDetails = (mediaId: number) => {
    setState(state => ({ ...state, viewMedia: { ...state.viewMedia, mediaId, visible: true } }))
  }

  return (
    <>
      <GlobalStyle />

      <Grid container justifyContent="center">
        <Grid item lg={8} xs={12}>

          <CustomTableComponent
            columns={[
              {
                accessorKey: "poster",
                header: "Poster",
                cell: (info: any) => <img className="poster" src={info.row.original.poster} alt={info.row.original.title} />,
              },
              ,
              ...mediaTableColumn,
              {
                accessorKey: "action",
                header: "Action",
                cell: (info: any) => (
                  <IconButton onClick={() => viewDetails(info.row.original.id)}>
                    <ListAltOutlined />
                  </IconButton>
                ),
              },
            ]}
            data={allMedia}
            loadList={fetchMedia}
            loader={loader}
            totalItemCount={total}
          />
        </Grid>
      </Grid>

      <Dialog
        maxWidth="md"
        onClose={() => setState(state => ({ ...state, viewMedia: { ...state.viewMedia, visible: false } }))}
        open={viewMedia.visible}
      >
        <ViewMediaComponent mediaId={viewMedia.mediaId} />
      </Dialog>
    </>
  )
}

export default App
