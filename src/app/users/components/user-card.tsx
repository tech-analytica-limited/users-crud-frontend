// import React, { useState } from 'react'




// const UserCard = () => {

//       const [currentPage, setCurrentPage] = useState(1)
//   const usersPerPage = 8

//   // Calculate pagination
//   const totalPages = Math.ceil(mockUsers.length / usersPerPage)
//   const startIndex = (currentPage - 1) * usersPerPage
//   const endIndex = startIndex + usersPerPage
//   const currentUsers = mockUsers.slice(startIndex, endIndex)

//   const handlePreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1))
//   }

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//   }



//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case "Admin":
//         return "bg-red-100 text-red-800 hover:bg-red-100"
//       case "Moderator":
//         return "bg-blue-100 text-blue-800 hover:bg-blue-100"
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-100"
//     }
//   }

//   const getStatusColor = (status: string) => {
//     return status === "Active"
//       ? "bg-green-100 text-green-800 hover:bg-green-100"
//       : "bg-gray-100 text-gray-800 hover:bg-gray-100"
//   }


//   return (
//     <div>user-card</div>
//   )
// }

// export default UserCard