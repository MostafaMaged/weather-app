console.log('Client Side javascript file is loaded.')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    document.querySelector('#message-1').textContent = 'Loading..'
    document.querySelector('#message-2').textContent = ''

    fetch(`http://localhost:3000/weather?address=${document.querySelector('input').value}`).then((response) => {

        response.json().then((data) => {
            if(data.error) {
                document.querySelector('#message-1').textContent = data.error
                document.querySelector('#message-2').textContent = ''
                return
            }
            
            document.querySelector('#message-1').textContent = data.location
            document.querySelector('#message-2').textContent = `${data.summary} It\'s ${data.temperature} out there! with ${data.precipProbability * 100}% chance of rain`
            
        })

    })

})