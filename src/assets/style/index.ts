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

.table_loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table_min_height_section {
  min-height: 440px;
  height: 440px;
}

.loader_content {
  text-align: center;
  .empty_image{
    width:150px;
    height: auto;
    display: block;
    object-fit:contain;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 0px;
  }
}

table{
    width:100%;
    th{
        background:#f7f7f7;
        padding:10px;
        font-size:14px;
        font-weight:500;
        .header_text_style{
          display:flex;
          align-items: center;
          justify-content: center;
          .columnSort{
            .arrows{
              margin-left:10px;
              display:flex;
              flex-direction: column;
              &.two{
                opacity:0.5;
                img{
                  &:first-child{
                    margin-bottom:3px;
                  }
                }
              }
              img{
                width: 8px;
              }
            }
          }
        }
    }
    td{
        padding:10px;
        border-bottom:1px solid #ddd;
        font-size:14px;
        text-align:center;
        .poster{
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
input, select{
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid #888888;
  margin: 0px 10px;
}
`
export const Loader = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #037aac;
  box-shadow: 24px 0 #037aac, -24px 0 #037aac;
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
  @keyframes flash {
    0% {
      background-color: rgba(3, 122, 172, 0.2);
      box-shadow: 24px 0 rgba(3, 122, 172, 0.2), -24px 0 #037aac;
    }
    50% {
      background-color: #037aac;
      box-shadow: 24px 0 rgba(3, 122, 172, 0.2), -24px 0 rgba(3, 122, 172, 0.2);
    }
    100% {
      background-color: rgba(3, 122, 172, 0.2);
      box-shadow: 24px 0 #037aac, -24px 0 rgba(3, 122, 172, 0.2);
    }
  }
`
export const ShowPerPage = styled.div`
  font-size: 14px;
  padding-bottom: 15px;
`

export const SearchBar = styled.div`
  @media screen and (max-width: 480px) {
    display: flex;
    width: 300px;
    input {
      width: 100%;
    }
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

export const TableStyle = styled.div`
  width: 100%;
  overflow-x: auto;
`
export const Filters = styled.div`
  display: flex;
  align-items: center;
  .general_filters {
    display: flex;
    align-items: flex-start;
    .MuiButtonBase-root {
      text-transform: capitalize;
      white-space: nowrap;
      min-width: 90px;
    }
  }
  select,
  input {
    margin-bottom: 15px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    flex-direction: column-reverse;
    .general_filters {
      width: 100%;
      overflow-x: auto;
    }
  }
`
