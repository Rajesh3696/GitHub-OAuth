import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchRepoData } from '../../Redux/reducer/auth'

const TrendingRepositories = () => {
  const [repositories, setRepositories] = useState([])
  const [languages, setLanguages] = useState([])
  const [filter, setFilter] = useState({
    dateRange: 'daily',
    language: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(filter)
  const getDateRange = (range) => {
    const currentDate = new Date()
    let startDate = new Date()

    switch (range) {
      case 'daily':
        startDate.setDate(currentDate.getDate() - 1)
        break
      case 'weekly':
        startDate.setDate(currentDate.getDate() - 7)
        break
      case 'monthly':
        startDate.setMonth(currentDate.getMonth() - 1)
        break
      default:
        startDate = null
        break
    }

    if (startDate) {
      return startDate.toISOString().split('T')[0]
    }
    return ''
  }
  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:%3E${getDateRange(
          filter.dateRange,
        )}&sort=stars&order=desc&language=${filter.language}`,
      )
      .then((data) => {
        if (data && data.status === 200) {
          setRepositories(data?.data?.items)
          const repositories = data?.data?.items
          const uniqueLanguages = [
            ...new Set(repositories.map((repo) => repo.language)),
          ]
          setLanguages(uniqueLanguages)
        }
      })
      .catch((error) => console.log(error))
  }, [filter])
  const handleRepoDetails = (owner, repo) => {
    axios
      .get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then((data) => {
        if (data && data.status === 200) {
          dispatch(fetchRepoData(data?.data))
        }
      })
      .catch((error) => console.log(error))
    navigate('/repo-details')
  }
  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }))
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Trending Repositories</h1>
      <div className="flex items-center space-x-4">
        <label htmlFor="dateRange" className="text-gray-600">
          Date Range:
        </label>
        <select
          id="dateRange"
          name="dateRange"
          value={filter.dateRange}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          name="language"
          value={filter.language}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {languages.map((language) => (
            <option value={language} key={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 ">
        {repositories.map((repo) => (
          <li key={repo.id} className="p-4 border rounded">
            <h4
              className="text-blue-500 hover:underline break-words"
              onClick={() => handleRepoDetails(repo?.owner?.login, repo.name)}
            >
              {repo.name}
            </h4>
            <p className="text-sm text-gray-500">{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrendingRepositories
