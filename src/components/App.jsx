import { useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import { Loader } from "./loader/loader";
import { GlobalStyle } from "./GlobalStyle";
import { ImageGallery } from "./imageGallery/imageGallery";
import { serviceGallery } from "./API/apiImageService";
import { Searchbar } from "./searchBar/searchBar";
import { ErrorMsg } from "./loader/loader.styled";
import { Button } from "./button/button";
import { BtnToTop } from "./button/bytton.styled";


export const App = () => {

  const [query, setQuery] = useState('')
  const [page,setPage] = useState(1) 
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const [initialQuery, setInitialQuery] = useState('')
  const [images,setImages] = useState([])
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true)
  const [searchFailed, setSearchFailed] = useState(false)


  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  
  useEffect(() => {
    if (!query) {
      return
    }
    
    const fetchImages = async () => {
      
      try { 
        setLoading(true)
        setError(false)
        

      const { hits, totalHits } = await serviceGallery(query, page)
      
      const filteredNeedsValues = () => {
         
           setImages( prevState => (
           [...prevState, ...hits.map((image) => ({
              id: image.id,
              largeImageURL: image.largeImageURL,
              webformatURL: image.webformatURL,
              tags: image.tags,  
            }))]
           ))
      }
      
      setShowLoadMoreButton(false)
      
        
        if (page === Math.ceil(totalHits / 12)) {
          toast.success('You have reached the end of the list of images found')
         filteredNeedsValues()
          return
        }

      if (hits.length === 0) {
          setSearchFailed(true)
      }   
       
     
        filteredNeedsValues()
        setShowLoadMoreButton(true)
      



    } catch (error) {

      console.log(error)

      setError(true)
    } finally {
        setLoading(false)
    }
  }

  fetchImages()

},[query,page])

  
  const handleSubmit = (query) => {
    setInitialQuery(initialQuery) 
    setQuery(query)
    setImages([])
    setPage(1)
    setError(false) 
  }
  
  
  const handleLoadMore = () => {

    setPage(prevPage => prevPage + 1)
    
 
     scroll.scrollToBottom(260 * 2, {
       duration: 250,
       smooth: 'easeInOutQuint',
    })
  }



  return (
    <div>
      <Searchbar onSubmit={handleSubmit}  /> 
      {loading && <Loader />}
      
      {images.length > 0 && (<ImageGallery hits={images} />)}
      
      {page === 41 && (toast.success('You have reached the last page'))}

      { searchFailed && images.length === 0 && !loading && (
        <ErrorMsg>Such images was not found, try find something else 😉</ErrorMsg>)}
      
      {error && !loading && <ErrorMsg>❌ Something went wrong,try reload page {toast.error('Ooops, something went wrong')}
        </ErrorMsg>}

      {images.length > 0 && showLoadMoreButton && !loading && (<Button loadMore={ handleLoadMore}/>)}
      <Toaster/>
      <GlobalStyle />

      {images.length > 0 && <BtnToTop type="button" onClick={scrollToTop}>To start</BtnToTop>}
    </div>
  );
};
