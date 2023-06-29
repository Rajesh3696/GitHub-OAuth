import React from 'react'
import { useSelector } from 'react-redux'
const RepositoryDetails = () => {
  const { repoData } = useSelector(({ auth }) => auth)
  return (
    <div className="container mx-auto py-8">
      {repoData ? (
        <div className="bg-sky-400  rounded shadow p-8">
          <div class="flex items-center space-x-4">
            <img
              src={repoData?.owner?.avatar_url}
              alt="Profile Image"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold mb-4">{repoData?.name}</h1>
              <p className="text-gray-600">Author: {repoData.owner?.login}</p>
              <p className="text-gray-600">Languages: {repoData?.language}</p>
              <p className="text-gray-600">
                Stars: {repoData?.stargazers_count}
              </p>
              <p className="text-gray-600">Forks: {repoData?.forks_count}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Not Found</p>
      )}
    </div>
  )
}

export default RepositoryDetails
