import without_image from './without_image.png'


const SearchResult = ({ dataArray }) => {
    
    const withoutAuthor = 'Autor não informado'

    return (
        <div className='div-cards'>
            {dataArray.map((item) => (
                <figure className='cards-interno'>
                    <a href={item?.saleInfo?.buyLink}>
                        <img src={item?.volumeInfo?.imageLinks ? item?.volumeInfo?.imageLinks?.thumbnail : without_image} className="imagem"></img>
                    </a>
                    <p className='title'>{item?.volumeInfo?.title}</p>
                    <p className='author'>{(item?.volumeInfo?.authors) ? item?.volumeInfo?.authors[0] : withoutAuthor}</p>
                </figure>
            ))}
        </div>
    )
};
export default SearchResult;
