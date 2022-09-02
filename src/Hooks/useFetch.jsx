import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import qs from 'qs'

export const useFetch = () => {
  const { id } = useParams()
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [filterProducts, setFilterProducts] = useState('')
  const [filterCategories, setFilterCategories] = useState('')
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(6000)

  const filtersProducts = qs.stringify(
    {
      filters: {
        title: {
          $containsi: `${filterProducts}`,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const filtersCategories = qs.stringify(
    {
      filters: {
        categories: {
          name: {
            $containsi: `${filterCategories}`,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const filtersPrice = qs.stringify(
    {
      filters: {
        price: {
          $gte: `${minPrice}`,
          $lte: `${maxPrice}`,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
  const pages = qs.stringify(
    {
      pagination: {
        start: `${page}`,
        limit: 6,
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `http://localhost:1337/api/products?populate=image&populate=categories&${pages}&${filtersProducts}&${filtersCategories}&${filtersPrice}`
      )
      const data = await res.json()
      if (!data.data) {
        setError('error')
      }
      setData(data)
      setPage(page)
    }
    getData()
  }, [page, filterProducts, filterCategories, filtersPrice])

  return {
    data,
    error,
    page,
    setPage,
    id,
    setFilterProducts,
    setFilterCategories,
    setMinPrice,
    setMaxPrice,
  }
}
