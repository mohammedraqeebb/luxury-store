import axios from 'axios';
import { useState, useEffect } from 'react';
import Products from '../components/products/products.component';
import QueryFilter from '../components/query-filter/query-filter.component';
const INITIALFILTER = {
   gender: [],
   category: [],
   brand: [],
   price: 0,
   sortOrder: 'ASC',
};

import Searchbar from '../components/search-bar/search-bar.component';
import useRequest from '../hooks/use-request';

const App = ({ products }) => {
   console.log('app component', products);
   const [searchField, setSearchField] = useState('');
   const [filter, setFilter] = useState(INITIALFILTER);
   const [productsData, setProductsData] = useState(products);
   const [pageNumber, setPageNumber] = useState(1);
   const [file, setFile] = useState();
   const [hasMoreProducts, setHasMoreProducts] = useState(true);
   const { doRequest, errors } = useRequest({
      url: '/api/query',
      body: {
         searchField,
         query: filter,
         pageNumber
      },
      method: 'post',
      onSuccess: ((data) => {
         setProductsData(data.products);
         // if (typeof data.products === 'object' && data.products.length > 0) {
         //    setProductsData(productsData.push(...productsData));
         // }
         // else {
         //    setHasMoreProducts(false);
         // }
      })
   })

   useEffect(() => {
      doRequest();

   }, [filter]);
   console.log('products data', productsData);

   const handleFilterChange = (event) => {
      const { name, value } = event.target;
      if (name === "gender" || name === "price") {
         if (event.target.checked) {

            setFilter({ ...filter, [name]: [value] });
         }
         else {
            setFilter({ ...filter, [name]: [] });
         }
      }
      else if (event.target.checked) {
         setFilter({ ...filter, [name]: [...filter[name], value] });
      } else {
         const newFilterPropertyTags = filter[name].filter((tag) => tag !== value);
         setFilter({ ...filter, [name]: newFilterPropertyTags });
      }
   };
   const handleGenderChange = (genderValue) => {
      if (genderValue === '') {
         return setFilter({ ...filter, gender: [] });
      }
      setFilter({ ...filter, gender: [genderValue] });
   }
   const handleSortChange = (sortOrderValue) => {
      setFilter({ ...filter, sortOrder: sortOrderValue })
   }

   const handleSearchChange = async (e) => {
      setSearchField(e.target.value);
      await doRequest({ searchField });

   }
   const clearFilter = () => {
      setFilter(INITIALFILTER);
   }
   useEffect(() => {
      doRequest();
   }, [searchField, filter]);

   const onImageChange = (event) => {
      setFile(event.target.files[0]);
   }
   const handleImageSubmit = async (event) => {
      event.preventDefault()

      const formData = new FormData();
      formData.append("image", file);

      await axios.post("/api/products/imageupload", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
   }
   console.log('products data', productsData);
   console.log('has more products', hasMoreProducts);

   return <>
      {/* <div>
         <form onSubmit={handleImageSubmit} encType="multipart/formdata">
            <input type="file" accept="image/*" onChange={onImageChange} />
            <button>submit</button>
         </form>
      </div> */}
      <Searchbar searchChangeHandler={handleSearchChange} />
      <QueryFilter filter={filter} clearFilter={clearFilter} handleFilterChange={handleFilterChange} handleGenderChange={handleGenderChange} handleSortChange={handleSortChange} />
      {<Products pageNumber={pageNumber} setPageNumber={setPageNumber} products={productsData} />}

   </>
}

App.getInitialProps = async (appContext, client) => {
   const { data } = await client.post('/api/query', {
      searchField: "",
      query:
      {
         gender: [],
         category: [],
         brand: [],
         price: 0,
         sortOrder: 'ASC'
      }
   });

   return { products: data.products }
}

export default App;

