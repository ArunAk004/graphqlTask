import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
body, *{
    font-family: 'Poppins', sans-serif;
}
.MuiDialog-paper {
    &::-webkit-scrollbar {
        width: 0px;
      }
}

table{
    width:100%;
    th{
        background:#f7f7f7;
        padding:10px;
        font-size:14px;
        font-weight:500;
    }
    td{
        padding:10px;
        border-bottom:1px solid #ddd;
        font-size:14px;
        text-align:center;
        img{
            width:75px;
            height:100px;
            display: block;
            object-position: center;
            object-fit: cover;
            border-radius:10px;
            margin:auto;
        }
        button:
    }
}
`

export const ShowPerPage = styled.div`
   select{
    border-radius:10px;
    padding:10px;
    border:1px solid #888888;
    margin:0px 10px;
   }
`

export const SearchBar = styled.div`
   input{
    border-radius:10px;
    padding:10px;
    border:1px solid #888888;
   }
`

export const DetailContainer = styled.div`
  padding: 10px;
`
export const BannerImg = styled.div`
  margin-bottom: 15px;
  img {
    width: 100%;
    display: block;
    object-position: center;
    object-fit: cover;
    height: 150px;
    border-radius: 10px;
  }
`
export const MediaCoverImg = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
  }
`
export const BasicDetails = styled.div`
  h1 {
    font-size: 22px;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  span {
    color: #888888;
    font-size: 14px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
  }
`
export const DetailsSection = styled.div``
export const AboutMedia = styled.div`
  margin-bottom: 25px;
  .MuiChip-root {
    margin-right: 10px;
    margin-bottom: 10px;
    text-transform: captilize;
  }
`
export const TagSection = styled.div`
  .MuiChip-root {
    margin-right: 10px;
    margin-bottom: 10px;
    text-transform: captilize;
  }
`
export const DetailsLoader = styled.div``
