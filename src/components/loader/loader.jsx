import { Dna } from 'react-loader-spinner'
import { LoaderWrapper } from './loader.styled'

export const Loader = () => {
    return(<LoaderWrapper><Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
        wrapperStyle={{
     }}
              wrapperClass="dna-wrapper"
        /></LoaderWrapper>)
}