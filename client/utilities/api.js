class ApiError extends Error {
    constructor(message, details) {
      super(message);
      this.name = 'API ' + this.name
      this.details = details
    }
  }
  
  const headers = ({
    'Content-Type': 'application/json'
  })
  
  const request = async (method, url, body=null) => {
    
    const options = body ? { method, headers, body: JSON.stringify(body) } : { method }
    const response = await fetch(url, options)
    const data = await response.json()
  
    if (!response.ok) {
      throw new ApiError(data.error.message, data.error.details)
    }
  
    return data
  }
  
export {
    ApiError,
    request
}