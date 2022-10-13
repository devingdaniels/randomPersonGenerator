'use strict'

function createPersonElement(data){
   const anchor = document.getElementById('data')
   // Save data 
   const fName = data.name.first
   const lName = data.name.last
   const cell = data.cell
   const email = data.email
   // Create element with data
   const element = document.createElement('p')
   element.classList.add('personItem')
   element.innerHTML = `First: ${fName}, Last: ${lName}, Cell: ${cell}, Email: ${email}`
   // Append element anchor
   anchor.append(element)   
}

async function getUserAPI(e){
   e.preventDefault()
   // Get the button ID
   const buttonID = e.target.id
   // Determine button type and create URL
   const url = buttonID === 'browserButton' ? 'https://randomuser.me/api/' : '/random-person'
   // Try to make API call
   // If failure, catch error 
   try{
      // Make call 
      const response = await fetch(url)
      // Parse response
      const data = await response.json()
      // Check if good status
      if (response.status === 200){
         console.log(data)
         // Good response, pass data to create person DOM element
         createPersonElement(data.results[0])
      }
      else if (response.status === 500){
         throw new Error(response.statusText)
      }
   }catch(error){
    console.error('Error:', 'Error thrown from the client-side')
   }
}

// Event lister on page load, then add event listeners to buttons
document.addEventListener('DOMContentLoaded', () =>{
   // Get and assign click event to browser button
   const browserButton = document.getElementById('browserButton')
   browserButton.addEventListener('click', getUserAPI)

   // Get and assign click event to server button
   const serverButton = document.getElementById('serverButton')
   serverButton.addEventListener('click', getUserAPI)
})